import { AttendanceWithSeolgi } from "@/types/response";

export interface DefaultSuccessResponse<ActualData> {
  data: ActualData;
}

export interface DefaultErrorResponse<E> {
  Error: E;
}

export type OneAttendance = AttendanceWithSeolgi;
export type OneAttendanceResponse = DefaultSuccessResponse<OneAttendance>;
export type DailyAttendance = AttendanceWithSeolgi;
export type DailyAttendanceResponse = DefaultSuccessResponse<DailyAttendance>;

export type MonthlyAttendance = {
  year: number;
  month: number;
  objective: string;
  attendance: AttendanceWithSeolgi[];
};

export type MonthlyAttendanceResponse =
  DefaultSuccessResponse<MonthlyAttendance>;
