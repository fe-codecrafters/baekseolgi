import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { ObjectiveKeysValue } from "../key";
import { toast } from "react-toastify";
import {
  GetObjectiveParams,
  GetObjectiveReqDTO,
} from "../types/getObjective.dto";

export const getObjective = async ({ id }: GetObjectiveParams) => {
  return await axios.get<GetObjectiveReqDTO>(`/api/objective/${id}`);
};

export const useGetObjective = (queryKey: ObjectiveKeysValue) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("목표를 삭제했어요.");
    },
    onError: () => toast.error("목표 삭제에 실패했어요."),
    mutationFn: getObjective,
  });
};
