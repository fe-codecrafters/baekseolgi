import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import { attendanceKeys } from "../key";

interface createAttendanceDTO {
  userId: number;
  objectiveId: number;
  seolgiId: number;
  title: string;
  createdAt: string;
}

export const createAttendance = async (
  createAttendanceDTO: createAttendanceDTO,
) => {
  return await axios.post(`/api/attendance`, createAttendanceDTO);
};

export const useCreateAttendance = () => {
  // TODO: notification https://github.com/alan2207/bulletproof-react/blob/11d9149c9bb2af0def640d3b690b52db36028428/src/features/discussions/api/updateDiscussion.ts#L29
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: attendanceKeys.all,
      });
      // TODO: add notification
    },
    mutationFn: createAttendance,
  });
};
