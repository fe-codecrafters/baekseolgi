import { DefaultResDTO } from "@/types/dto";

export interface DeleteObjectiveParams extends DeleteObjectiveReqDTO {}

export interface DeleteObjectiveReqDTO {
  id: number;
}

export type DeleteObjectiveResDTO = DefaultResDTO<{ id: number }>;
