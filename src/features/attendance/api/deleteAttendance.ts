import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { AttendanceKeysValue } from "../key";
import {
  DeleteAttendanceParams,
  DeleteAttendanceResDTO,
} from "../types/deleteAttendance.dto";
import { toast } from "react-toastify";

export const deleteAttendance = async ({
  attendanceId,
}: DeleteAttendanceParams) => {
  // TODO: 에러 리스폰스 타입을 정해야 ..
  return await axios.delete<DeleteAttendanceResDTO>(
    `/api/attendance/${attendanceId}`,
  );
};

export const useDeleteAttendance = (queryKey: AttendanceKeysValue) => {
  const queryClient = useQueryClient();
  // TODO: notification https://github.com/alan2207/bulletproof-react/blob/11d9149c9bb2af0def640d3b690b52db36028428/src/features/discussions/api/updateDiscussion.ts#L29
  // TODO: optimistic cache

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("출석 기록을 삭제했어요.");
    },
    mutationFn: deleteAttendance,
  });
};
