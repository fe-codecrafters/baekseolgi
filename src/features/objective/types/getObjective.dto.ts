import { Objective } from "@prisma/client";
import { DefaultResDTO } from "@/types/dto";

export interface GetObjectiveParams extends GetObjectiveReqDTO {}

export interface GetObjectiveReqDTO {
  id: number;
}

export type GetObjectiveResDTO = DefaultResDTO<Objective>;
