import { DailyAttendanceStatus } from "@prisma/client";
import { DailyAttendance } from "@prisma/client";
import { DefaultResDTO } from "@/types/dto";

export interface UpdateAttendanceParams {
  data: UpdateAttendanceReqDTO;
  attendanceId: number;
}

export interface UpdateAttendanceReqDTO {
  seolgiId?: number;
  title: string;
  status?: DailyAttendanceStatus;
  createdAt?: string;
}

export type UpdateAttendanceResDTO = DefaultResDTO<DailyAttendance>;
