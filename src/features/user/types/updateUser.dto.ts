import { User } from "@prisma/client";
import { DefaultResDTO } from "@/types/dto";

export interface UpdateUserParams extends UpdateUserReqDTO {}
export interface UpdateUserReqDTO extends User {}

export type UpdateUserResDTO = DefaultResDTO<User>;
