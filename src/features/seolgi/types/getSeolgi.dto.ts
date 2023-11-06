import { Seolgi } from "@prisma/client";
import { DefaultResDTO } from "@/types/dto";

export interface GetSeolgiParams extends GetSeolgiReqDTO {}

export interface GetSeolgiReqDTO {
  seolgiName: string;
}

export type GetSeolgiResDTO = DefaultResDTO<Seolgi[]>;
