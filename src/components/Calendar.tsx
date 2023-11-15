"use client";
import SeolgiIcon from "@/icons/SeolgiIcon";
import { useState } from "react";
import Modal from "./Modal";
import { AttendanceWithSeolgi } from "@/types/dto";
import { DayNameType, DayOrDate } from "@/types";

const isDayNameType = (day: any): day is DayNameType =>
  ["일", "월", "화", "수", "목", "금", "토"].includes(day);
const isValidDate = (day: any): day is number => typeof day === "number";
const isAttendance = (day: any): day is AttendanceWithSeolgi =>
  !isDayNameType(day) && !isValidDate(day);

type DateList = (DayNameType | number | AttendanceWithSeolgi)[];

const days: DayNameType[] = ["일", "월", "화", "수", "목", "금", "토"];
const date = new Date();
const today = {
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  date: date.getDate(),
  // 일요일: 0 ... 토요일: 6
  day: date.getDay(),
};

interface DayProps {
  day: DayNameType | number | AttendanceWithSeolgi;
  type: DayOrDate;
  isThisMonth: boolean;
  year?: number;
  month?: number;
}

// 달력에서 요일 및 각 날짜를 표시하는 컴포넌트
// props-day는 일, 월 혹은 12, 13 같이 요일이나 날짜 정보가 들어옴
// props-type은 day로 들어온 정보가 무엇인지 표시. day라면 요일을, date라면 날짜를 표시
const Day = ({ day, type, year, month, isThisMonth }: DayProps) => {
  const isToday =
    (isThisMonth && type === "date" && day === today.date) ||
    (isThisMonth &&
      type === "day" &&
      isDayNameType(day) &&
      days.indexOf(day) === today.day);

  const getDayLabel = (day: DayProps["day"]) => {
    if (isValidDate(day) && day === 0) return null;
    if (isAttendance(day)) return new Date(day.createdAt).getDate();
    if (typeof day !== "number") return null;
    return day;
  };

  const dayLabel = getDayLabel(day);

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const isOkayToModal = type === "date" && dayLabel && year && month;
  const modalOn = isOpened && isOkayToModal;

  const openModalHandler = () => {
    if (isOkayToModal && !isOpened) {
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  };

  // TODO: 서버에서 가져오는 로직으로 변경 필요
  let bgColor = "bg-primary-gray";
  if (isAttendance(day)) {
    if (day.seolgiId === 1) bgColor = "bg-seolgi-default";
    if (day.seolgiId === 2) bgColor = "bg-seolgi-green";
    if (day.seolgiId === 3) bgColor = "bg-seolgi-pink";
    if (day.seolgiId === 4) bgColor = "bg-seolgi-yellow";
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-[40px] text-center md:w-[70px] ${
          type === "day"
            ? " mb-[-6px] text-[16px] md:text-[24px]"
            : " mb-[6px] h-[20px] text-[14px] md:text-[16px]"
        }${isToday ? " font-medium text-black" : " text-primary-darkGray"}`}
      >
        {dayLabel}
      </div>
      {type === "date" && (
        <button
          className={`h-[40px] w-[100%] rounded-[10px] md:h-[70px] ${bgColor}`}
          onClick={openModalHandler}
          disabled={!dayLabel}
        >
          {isAttendance(day) && (
            <SeolgiIcon bgFill="transparent" width={"100%"} height={"100%"} />
          )}
        </button>
      )}
      {modalOn && (
        <Modal
          opened={openModalHandler}
          year={year}
          month={month}
          day={dayLabel}
        />
      )}
    </div>
  );
};

interface WeekProps {
  week: DateList;
  type: DayOrDate;
  isThisMonth: boolean;
  year?: number;
  month?: number;
}

// 달력에서 한 주를 표시하는 컴포넌트 - 7개의 Day 컴포넌트를 묶어주는 역할
const Week = ({ week, type, isThisMonth, year, month }: WeekProps) => {
  console.log(week);
  return (
    <div className="mt-1 flex w-auto flex-row justify-start gap-[10px] md:gap-[16px]">
      {week.map((day, idx) => {
        return (
          <Day
            key={`day-${idx + 1}`}
            day={day}
            type={type}
            year={year}
            month={month}
            isThisMonth={isThisMonth}
          />
        );
      })}
    </div>
  );
};

interface CalendarProps {
  selectedYear: number;
  selectedMonth: number;
  monthData: AttendanceWithSeolgi[];
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
  const dates: DateList = [];
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
      const idx = dates.findIndex((el) => el === attendanceDate);
      if (idx) {
        dates.splice(idx, 1, attendance);
        dates[idx] = attendance;
      }
    });
  }

  // 날짜들을 7개로 끊어 주 단위로 나누기
  let weeks: DateList[] = [];
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
          year={selectedYear}
          month={selectedMonth}
        />
      ))}
    </div>
  );
};
