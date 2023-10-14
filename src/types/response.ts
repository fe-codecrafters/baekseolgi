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
