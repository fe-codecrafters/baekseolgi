import { axios } from "@/lib/axios";
import { UpdateUserParams, UpdateUserResDTO } from "../types/updateUser.dto";
import { OneUserKeys, OneUserKeysValue } from "../key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@prisma/client";
import { toast } from "react-toastify";

export const updateUser = async (data: UpdateUserParams) => {
  const res = await axios.put<UpdateUserResDTO>(`/api/user/${data.id}`, data);
  return res.data.data;
};

export const useUpdateUser = (queryKey: OneUserKeysValue) => {
  const queryClient = useQueryClient();

  return useMutation({
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const prevUser = queryClient.getQueryData<User>([...queryKey]);
      queryClient.setQueryData<User>(queryKey, {
        ...data,
      });

      return { prevUser };
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey,
      });
      toast.success("닉네임을 변경했어요.");
    },
    onError: (_, __, context) => {
      if (context?.prevUser) {
        queryClient.setQueryData(queryKey, context.prevUser);
      }
      toast.error("닉네임 변경에 실패했어요. 😢");
    },
    mutationFn: updateUser,
  });
};
