// DTO 제작을 위해 공통으로 필요한 타입 모음
import { Prisma } from "@prisma/client";

export interface DefaultResDTO<ActualData> {
  data: ActualData;
}

export interface ErrorResDTO<E> {
  error: E;
}

const attendanceWithSeolgi =
  Prisma.validator<Prisma.DailyAttendanceDefaultArgs>()({
    include: { Seolgi: true },
  });

/**
 * /attendance/{id} Response Body
 */
export type AttendanceWithSeolgi = Prisma.DailyAttendanceGetPayload<
  typeof attendanceWithSeolgi
>;

export type YearlyAttendanceStat = {
  year: number;
  month: number;
  objective: string;
  counts: number[];
};

export type DummyResponse = {
  year: number;
  month: number;
  objective: string;
  attendance: AttendanceWithSeolgi[];
};
