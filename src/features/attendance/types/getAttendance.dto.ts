import { DailyAttendance } from "@prisma/client";
import { AttendanceWithSeolgi, DefaultResDTO } from "@/types/dto";
import { AttendanceKeyDirection, AttendanceKeySort } from "../key";

export interface GetOneAttendanceParams {
  id: number;
}

export type GetOneAttendanceResDTO = DefaultResDTO<AttendanceWithSeolgi>;

export interface GetDailyAttendanceParams {
  userId: number;
  objectiveId?: number;
  date: string; // yyyy-MM-dd
}

export type GetDailyAttendanceResDTO = DefaultResDTO<DailyAttendance[]>;

// userId는 필수지만, objectiveId는 필수가 아니다. 해당 UI에서 새로 생성할 수 있는게 자연스러울 것
export interface GetMonthlyAttendanceParams {
  userId: number;
  objectiveId?: number;
  sort?: AttendanceKeySort;
  direction?: AttendanceKeyDirection;
  year: number;
  month: number;
}

export type MonthlyAttendance = {
  year: number;
  month: number;
  objective?: string;
  attendance: AttendanceWithSeolgi[];
};

export type GetMonthlyAttendanceResDTO = DefaultResDTO<MonthlyAttendance>;
