"use client";
import Modal from "../Modal";
import { AttendanceWithSeolgi } from "@/types/dto";
import { DayNameType } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { initialDate } from "@/redux/reducer/dateSlice";
import Week from "./Week";

type DateList = (DayNameType | number | AttendanceWithSeolgi)[];

interface CalendarProps {
  monthData?: AttendanceWithSeolgi[];
  type: string;
}

// 한 달을 표시하는 컴포넌트 - type에 따라 weekly, monthly로 구분
export const Calendar = ({ monthData, type }: CalendarProps) => {
  const { year, month } = useSelector((state: RootState) => state.data);
  const modalState = useSelector((state: RootState) => state.modal.isOpen);

  const days: DayNameType[] = ["일", "월", "화", "수", "목", "금", "토"];

  const monthStart = new Date(year, month - 1, 1);
  const monthEnd = new Date(year, month, 0);

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
    weeks = weeks.filter((week) => week.includes(initialDate.date));
  }

  return (
    <div className="flex flex-col items-center justify-start gap-[18px] md:gap-[20px]">
      <Week week={days} type={"day"} />
      {weeks.map((week, idx) => (
        <Week key={`${year}Y-${month}M-${idx}W`} week={week} type={"date"} />
      ))}
      {modalState === true ? <Modal /> : ""}
    </div>
  );
};
