import { initialDate } from "@/app/redux/reducer/dateSlice";
import { AttendanceWithSeolgi } from "@/types/dto";

interface DayProps {
  day: number | AttendanceWithSeolgi;
}

type DateList = (number | AttendanceWithSeolgi)[];

export const dateNum = (day: number | AttendanceWithSeolgi) => {
  return typeof day === "number" ? day : new Date(day.createdAt).getDate();
};

export const isValidDate = (
  day: number | AttendanceWithSeolgi,
): day is number => typeof day === "number";

export const isAttendance = (
  day: number | AttendanceWithSeolgi,
): day is AttendanceWithSeolgi => {
  return !isValidDate(day);
};

export const getDayLabel = (day: DayProps["day"]) => {
  if (isValidDate(day) && day === 0) return null;
  if (isAttendance(day)) return new Date(day.createdAt).getDate();
  if (typeof day !== "number") return null;
  return day;
};

// 배열을 순회하면서 찾고자 하는 날짜의 인덱스 찾기
export const foundWeekIndex = (weeks: DateList[]) => {
  let found = 0;

  for (let i = 0; i < weeks.length; i++) {
    const row = weeks[i];
    if (row.includes(initialDate.date)) {
      found = i;
      break;
    }
  }

  return found;
};

// Weekly Calendar라면 오늘 날짜가 포함된 주만 남기기
export const currentWeek = (weeks: DateList[]) => {
  return weeks.filter((week) => {
    return week.some((day) => {
      return dateNum(day) === initialDate.date;
    });
  });
};
