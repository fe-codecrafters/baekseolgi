import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { ObjectiveKeysValue } from "../key";
import { Objective } from "@prisma/client";
import { toast } from "react-toastify";
import {
  UpdateObjectiveParams,
  UpdateObjectiveResDTO,
} from "../types/updateObjective.dto";

export const updateObjective = async ({ data, id }: UpdateObjectiveParams) => {
  const res = await axios.put<UpdateObjectiveResDTO>(
    `/api/objective/${id}`,
    data,
  );
  return res.data.data;
};

export const useUpdateObjective = (queryKey: ObjectiveKeysValue) => {
  const queryClient = useQueryClient();

  return useMutation({
    onMutate: async ({ data }) => {
      // REF: https://tanstack.com/query/v5/docs/react/guides/mutations#persist-mutations
      if (!data.title) return;
      await queryClient.cancelQueries({
        queryKey,
      });

      const prev = queryClient.getQueryData<Objective>(queryKey);

      if (prev) {
        queryClient.setQueryData<Objective>(queryKey, prev);
      } else {
        return;
      }

      return { prev };
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey,
      });
      toast.success("목표를 변경했어요.");
    },
    onError: (_, __, context) => {
      if (context?.prev) {
        queryClient.setQueryData(queryKey, context.prev);
      }
      toast.error("목표 변경이 실패했어요. 😢");
    },
    mutationFn: updateObjective,
  });
};
