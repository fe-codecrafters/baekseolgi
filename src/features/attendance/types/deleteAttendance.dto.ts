import { DailyAttendanceStatus } from "@prisma/client";
import { DefaultResDTO } from "@/types/dto";

export interface DeleteAttendanceParams {
  attendanceId: number;
}

export interface DeleteAttendanceReqDTO {
  seolgiId?: number;
  title: string;
  status?: DailyAttendanceStatus;
  createdAt?: string;
}

export type DeleteAttendanceResDTO = DefaultResDTO<{ id: number }>;
