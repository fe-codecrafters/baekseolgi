import { Objective } from "@prisma/client";
import { DefaultResDTO } from "@/types/dto";

export interface UpdateObjectiveParams {
  data: UpdateObjectiveReqDTO;
  id: number;
}

export interface UpdateObjectiveReqDTO {
  title: string;
  description?: string;
  createdAt?: string;
  finishedAt?: string;
  failedAt?: string;
}

export type UpdateObjectiveResDTO = DefaultResDTO<Objective>;
