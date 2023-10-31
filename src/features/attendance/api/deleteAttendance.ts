import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";

// TVariable
interface DeleteAttendanceDTO {
  attendanceId: number;
}

export const deleteAttendance = async ({
  attendanceId,
}: DeleteAttendanceDTO) => {
  // TODO: 에러 리스폰스 타입을 정해야 ..
  return await axios.delete<null>(`/api/attendance/${attendanceId}`);
};

export const useDeleteAttendance = () => {
  // TODO: notification https://github.com/alan2207/bulletproof-react/blob/11d9149c9bb2af0def640d3b690b52db36028428/src/features/discussions/api/updateDiscussion.ts#L29

  return useMutation({
    onSuccess: (_) => {
      queryClient.invalidateQueries({
        queryKey: ["api/attendances"],
      });
      // TODO: add notification
    },
    mutationFn: deleteAttendance,
  });
};
