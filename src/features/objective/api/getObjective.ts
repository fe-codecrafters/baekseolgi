import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { OneObjectiveKey, objectiveKeys } from "../key";
import {
  GetObjectiveParams,
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
