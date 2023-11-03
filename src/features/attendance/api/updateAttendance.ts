import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { AttendanceKeysValue } from "../key";
import {
  UpdateAttendanceParams,
  UpdateAttendanceResDTO,
} from "../types/updateAttendance.dto";
import { DailyAttendance } from "@prisma/client";
import { MonthlyAttendance } from "../types/getAttendance.dto";

export const updateAttendance = async ({
  data,
  attendanceId,
}: UpdateAttendanceParams) => {
  const res = await axios.put<UpdateAttendanceResDTO>(
    `/api/attendance/${attendanceId}`,
    data,
  );
  return res.data.data;
};

export const useUpdateAttendance = (queryKey: AttendanceKeysValue) => {
  const queryClient = useQueryClient();
  // TODO: notification https://github.com/alan2207/bulletproof-react/blob/11d9149c9bb2af0def640d3b690b52db36028428/src/features/discussions/api/updateDiscussion.ts#L29
  // update 전 데이터를 보여줄 수 있기 떄문에 만약 GET /api/attendance/{attendanceId}가 있다면 cancel

  return useMutation({
    onMutate: async ({ data, attendanceId }) => {
      // REF: https://tanstack.com/query/v5/docs/react/guides/mutations#persist-mutations
      // WHY?: GET /{id}은 cancel 하는데 GET / 은 하지 않는 이유가 있을까?
      if (!data.title) return;

      await queryClient.cancelQueries({
        queryKey,
      });

      const previousAttendance = queryClient.getQueryData<MonthlyAttendance>([
        ...queryKey,
      ]);

      if (previousAttendance) {
        const prevs = previousAttendance.attendance;
        const idx = prevs.findIndex((el) => el.id === attendanceId);
        if (idx === -1) return;

        const prevCopy = previousAttendance.attendance[idx];
        const optimistic = { ...prevCopy, title: data.title };

        queryClient.setQueryData<MonthlyAttendance>(queryKey, {
          ...previousAttendance,
          attendance: [
            ...prevs.slice(0, idx),
            optimistic,
            ...prevs.slice(idx + 1),
          ],
        });
      } else {
        return;
      }

      return { previousAttendance };
    },
    onError: (_, __, context) => {
      if (context?.previousAttendance) {
        queryClient.setQueryData(queryKey, context.previousAttendance);
      }
    },
    onSuccess: (_: DailyAttendance) => {
      queryClient.refetchQueries({
        queryKey,
      });
      // TODO: add notification
    },
    mutationFn: updateAttendance,
  });
};
