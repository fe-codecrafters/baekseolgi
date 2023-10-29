import { Prisma } from "@prisma/client";

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

export type MonthlyAttendanceResponse = {
  year: number;
  month: number;
  objective: string;
  attendance: AttendanceWithSeolgi[];
};

export type YearlyAttendanceStat = {
  year: number;
  month: number;
  objective: string;
  counts: number[];
};

export type DummyResponse = MonthlyAttendanceResponse;
