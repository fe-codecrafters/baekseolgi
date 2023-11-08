import { Objective } from "@prisma/client";
import { DefaultResDTO } from "@/types/dto";

export interface CreateObjectiveParams extends CreateObjectiveReqDTO {}

export interface CreateObjectiveReqDTO {
  userId: number;
  objectiveId: number;
  title: string;
  description?: string;
  createdAt: string;
  finishedAt?: string;
  failedAt?: string;
}

export type CreateObjectiveResDTO = DefaultResDTO<Objective>;
