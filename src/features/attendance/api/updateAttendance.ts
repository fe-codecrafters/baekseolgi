import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import { OneAttendance, OneAttendanceResponse } from "../types";
import { attendanceKeys } from "../key";

interface UpdateAttendanceDTO {
  data: {
    title: string;
  };
  attendanceId: number;
}

interface UpdateAttendanceContext {
  optimisticAttendance: OneAttendance;
}

export const updateAttendance = async ({
  data,
  attendanceId,
}: UpdateAttendanceDTO) => {
  const res = await axios.put<OneAttendanceResponse>(
    `/api/attendance/${attendanceId}`,
    data,
  );
  return res.data.data;
};

export const useUpdateAttendance = () => {
  // TODO: notification https://github.com/alan2207/bulletproof-react/blob/11d9149c9bb2af0def640d3b690b52db36028428/src/features/discussions/api/updateDiscussion.ts#L29
  // update 전 데이터를 보여줄 수 있기 떄문에 만약 GET /api/attendance/{attendanceId}가 있다면 cancel

  return useMutation({
    onMutate: async ({ data, attendanceId }) => {
      // REF: https://tanstack.com/query/v5/docs/react/guides/mutations#persist-mutations
      // WHY?: GET /{id}은 cancel 하는데 GET / 은 하지 않는 이유가 있을까?
      if (!data.title) return;

      await queryClient.cancelQueries({
        queryKey: attendanceKeys.all,
      });

      const optimisticAttendance = queryClient.getQueryData<OneAttendance>([
        attendanceKeys.id({ id: attendanceId }),
      ]);

      if (optimisticAttendance) {
        optimisticAttendance.title = data.title;

        queryClient.setQueryData<OneAttendance>(
          attendanceKeys.id({ id: attendanceId }),
          optimisticAttendance,
        );
      } else {
        return;
      }

      return { optimisticAttendance };
    },
    onError: (_, __, context: UpdateAttendanceContext | undefined) => {
      if (context?.optimisticAttendance) {
        queryClient.setQueryData(
          attendanceKeys.id({ id: context.optimisticAttendance.id }),
          context.optimisticAttendance,
        );
      }
    },
    onSuccess: (updated: OneAttendance) => {
      queryClient.refetchQueries({
        queryKey: attendanceKeys.id({ id: updated.id }),
      });
      // TODO: add notification
    },
    mutationFn: updateAttendance,
  });
};
