import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { ObjectiveKeysValue, OneObjectiveKey, objectiveKeys } from "../key";
import { toast } from "react-toastify";
import {
  GetObjectiveParams,
  GetObjectiveReqDTO,
  GetObjectiveResDTO,
} from "../types/getObjective.dto";

export const getObjective = async ({ id }: GetObjectiveParams) => {
  return (await axios.get<GetObjectiveResDTO>(`/api/objective/${id}`)).data
    .data;
};

export const useGetObjective = ([, , { id }]: OneObjectiveKey) => {
  return useQuery({
    queryKey: objectiveKeys.id({ id }),
    queryFn: () => getObjective({ id }),
  });
};
