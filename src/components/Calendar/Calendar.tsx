"use client";
import { AttendanceWithSeolgi } from "@/types/dto";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Week from "./Week";
import WeekHeader from "./WeekHeader";
import { currentWeek, foundWeekIndex } from "@/util/dayHelper";
import WeekIndex from "./WeekIndex";
const DEV = process.env.NODE_ENV === "development";

type DateList = (number | AttendanceWithSeolgi)[];

interface CalendarProps {
  monthData?: AttendanceWithSeolgi[];
  type: string;
}

// 한 달을 표시하는 컴포넌트 - type에 따라 weekly, monthly로 구분
export const Calendar = ({ monthData, type }: CalendarProps) => {
  DEV && console.log(monthData);
  const { year, month } = useSelector((state: RootState) => state.date);

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

  const lastDayIndex = dates.length - 1;

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
    for (let i = lastDayIndex + 1; i < dates.length; i++) {
      if (dates[i] !== 0) dates[i] = 0;
    }
  }

  // 날짜들을 7개로 끊어 주 단위로 나누기
  const weeks: DateList[] = [];
  const datesCopy = [...dates];
  while (datesCopy.length > 0) {
    weeks.push(datesCopy.splice(0, 7));
  }

  const weekView = type === "week" ? currentWeek(weeks) : weeks;

  return (
    <div>
      <div className="flex flex-col items-center justify-start gap-[18px] md:gap-[20px]">
        <WeekHeader />
        {weekView.map((week, idx) => (
          <Week key={`${year}Y-${month}M-${idx}W`} week={week} />
        ))}
      </div>
      {type === "week" && <WeekIndex found={foundWeekIndex(weeks)} />}
    </div>
  );
};
