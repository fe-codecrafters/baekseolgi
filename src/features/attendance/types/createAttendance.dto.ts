import { DailyAttendance } from "@prisma/client";
import { DefaultResDTO } from "@/types/dto";

export interface CreateAttendanceParams extends CreateAttendanceReqDTO {}

export interface CreateAttendanceReqDTO {
  userId: number;
  objectiveId: number;
  seolgiId: number;
  title: string;
  createdAt: string;
}

export type CreateAttendanceResDTO = DefaultResDTO<DailyAttendance>;
