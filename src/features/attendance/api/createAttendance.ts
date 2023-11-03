import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { AttendanceKeysValue } from "../key";
import {
  CreateAttendanceParams,
  CreateAttendanceResDTO,
} from "../types/createAttendance.dto";

export const createAttendance = async (
  createAttendanceParams: CreateAttendanceParams,
) => {
  return await axios.post<CreateAttendanceResDTO>(
    `/api/attendance`,
    createAttendanceParams,
  );
};

export const useCreateAttendance = (queryKey: AttendanceKeysValue) => {
  const queryClient = useQueryClient();
  // TODO: notification https://github.com/alan2207/bulletproof-react/blob/11d9149c9bb2af0def640d3b690b52db36028428/src/features/discussions/api/updateDiscussion.ts#L29
  // TODO: optimistic cache
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      // TODO: add notification
    },
    mutationFn: createAttendance,
  });
};
