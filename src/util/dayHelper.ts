import { AttendanceWithSeolgi } from "@/types/dto";

interface DayProps {
  day: number | AttendanceWithSeolgi;
}

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
