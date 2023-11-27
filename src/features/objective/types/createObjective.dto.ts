import { Objective } from "@prisma/client";
import { DefaultResDTO } from "@/types/dto";

export interface CreateObjectiveParams extends CreateObjectiveReqDTO {}

export interface CreateObjectiveReqDTO {
  userId: number;
  title: string;
  createdAt: string;
  description?: string;
  finishedAt?: string;
  failedAt?: string;
}

export type CreateObjectiveResDTO = DefaultResDTO<Objective>;
