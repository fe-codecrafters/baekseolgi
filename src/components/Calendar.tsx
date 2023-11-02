"use client";

import SeolgiIcon from "@/icons/SeolgiIcon";
import { useState } from "react";
import Modal from "./Modal";

// 요일 및 현재 날짜 정보 상수로 정의
const days = ["일", "월", "화", "수", "목", "금", "토"];
const date = new Date();
const today = {
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  date: date.getDate(),
  day: date.getDay(),
};

// 달력에서 요일 및 각 날짜를 표시하는 컴포넌트
// props-day는 일, 월 혹은 12, 13 같이 요일이나 날짜 정보가 들어옴
// props-type은 day로 들어온 정보가 무엇인지 표시. day라면 요일을, date라면 날짜를 표시
const Day = ({ day, type, isThisMonth }) => {
  const isToday =
    (isThisMonth && type === "date" && day === today.date) ||
    (isThisMonth && type === "day" && days.indexOf(day) === today.day);

  let bgColor = "bg-primary-gray";
  if (day.id) {
    if (day.seolgiId === 1) bgColor = "bg-seolgi-default";
    if (day.seolgiId === 2) bgColor = "bg-seolgi-green";
    if (day.seolgiId === 3) bgColor = "bg-seolgi-pink";
    if (day.seolgiId === "yellow") bgColor = "bg-seolgi-yellow";
  }

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const openModalHandler = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-[40px] text-center md:w-[70px] ${
          type === "day"
            ? " mb-[-6px] text-[16px] md:text-[24px]"
            : " mb-[6px] h-[20px] text-[14px] md:text-[16px]"
        }${isToday ? " font-medium text-black" : " text-primary-darkGray"}`}
      >
        {day.id ? new Date(day.createdAt).getDate() : day !== 0 ? day : null}
      </div>
      {type === "date" ? (
        <button
          className={`h-[40px] w-[100%] rounded-[10px] md:h-[70px] ${bgColor}`}
          onClick={openModalHandler}
        >
          {day.id ? (
            <SeolgiIcon bgFill="transparent" width={"auto"} height={"auto"} />
          ) : null}
        </button>
      ) : null}
      {isOpened && <Modal />}
    </div>
  );
};

interface WeekProps {
  week: [number, { id: number; createdAt: string; seolgiId: number }];
  type: string;
  isThisMonth: boolean;
}

// 달력에서 한 주를 표시하는 컴포넌트 - 7개의 Day 컴포넌트를 묶어주는 역할
const Week = ({ week, type, isThisMonth }: WeekProps) => {
  return (
    <div className="mt-1 flex w-auto flex-row justify-start gap-[10px] md:gap-[16px]">
      {week.map((day, idx) => (
        <Day
          key={`day-${idx + 1}`}
          day={day}
          type={type}
          isThisMonth={isThisMonth}
        />
      ))}
    </div>
  );
};

interface CalendarProps {
  selectedYear: number;
  selectedMonth: number;
  monthData: [{ id: number; createdAt: string; seolgiId: number }];
  type: string;
}

// 한 달을 표시하는 컴포넌트 - type에 따라 weekly, monthly로 구분
export const Calendar = ({
  selectedYear,
  selectedMonth,
  monthData,
  type,
}: CalendarProps) => {
  const isThisMonth =
    selectedYear === today.year && selectedMonth === today.month;

  const monthStart = new Date(selectedYear, selectedMonth - 1, 1);
  const monthEnd = new Date(selectedYear, selectedMonth, 0);

  // 비어있는 날짜도 Day 컴포넌트로 표시해줘야하므로 0으로 채워넣기
  const dates = [];
  for (let i = 0; i < monthStart.getDay(); i++) {
    dates.push(0);
  }
  for (let i = 1; i <= monthEnd.getDate(); i++) {
    dates.push(i);
  }
  while (dates.length % 7 !== 0) {
    dates.push(0);
  }

  if (monthData && monthData[0]) {
    monthData.forEach((attendance) => {
      const attendanceDate = new Date(attendance.createdAt).getDate();
      if (dates.findIndex((el) => el === attendanceDate)) {
        dates[dates.findIndex((el) => el === attendanceDate)] = attendance;
      }
    });
  }

  // 날짜들을 7개로 끊어 주 단위로 나누기
  let weeks = [];
  const datesCopy = [...dates];
  while (datesCopy.length > 0) {
    weeks.push(datesCopy.splice(0, 7));
  }

  // Weekly Calendar라면 오늘 날짜가 포함된 주만 남기기
  if (type === "week") {
    weeks = weeks.filter((week) => week.includes(today.date));
  }

  return (
    <div className="flex flex-col items-center justify-start gap-[18px] md:gap-[20px]">
      <Week week={days} type={"day"} isThisMonth={isThisMonth} />
      {weeks.map((week, idx) => (
        <Week
          key={`${selectedYear}Y-${selectedMonth}M-${idx}W`}
          week={week}
          type={"date"}
          isThisMonth={isThisMonth}
        />
      ))}
    </div>
  );
};
