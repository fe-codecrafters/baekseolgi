import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { ObjectiveKeysValue } from "../key";
import { toast } from "react-toastify";
import {
  DeleteObjectiveParams,
  DeleteObjectiveReqDTO,
} from "../types/deleteObjective.dto";

export const deleteObjective = async ({ id }: DeleteObjectiveParams) => {
  return await axios.delete<DeleteObjectiveReqDTO>(`/api/objective/${id}`);
};

export const useDeleteObjective = (queryKey: ObjectiveKeysValue) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("목표를 삭제했어요.");
    },
    onError: () => toast.error("목표 삭제에 실패했어요."),
    mutationFn: deleteObjective,
  });
};
