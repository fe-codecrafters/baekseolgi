import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { toast } from "react-toastify";

import {
  CreateObjectiveParams,
  CreateObjectiveResDTO,
} from "../types/createObjective.dto";
import { ObjectiveKeysValue } from "../key";

export const createObjective = async (
  createObjectiveParams: CreateObjectiveParams,
) => {
  return await axios.post<CreateObjectiveResDTO>(
    `/api/objective`,
    createObjectiveParams,
  );
};

export const useCreateObjective = (queryKey: ObjectiveKeysValue) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("목표 등록이 성공했어요!");
    },
    onError: () => {
      toast.error("목표 등록에 실패했어요 😢");
    },
    mutationFn: createObjective,
  });
};
