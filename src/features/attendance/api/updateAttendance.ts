import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import { AttendanceWithSeolgi } from "@/types/response";

// TVariable
interface UpdateAttendanceDTO {
  data: {
    title: string;
  };
  attendanceId: number;
}

// TContext
interface UpdateAttendanceContext {
  optimisticAttendance: AttendanceWithSeolgi;
}

export const updateAttendance = async ({
  data,
  attendanceId,
}: UpdateAttendanceDTO) => {
  return (
    await axios.put<AttendanceWithSeolgi>(
      `/api/attendance/${attendanceId}`,
      data,
    )
  ).data;
};

export const useUpdateAttendance = (
  config?: UseMutationOptions<
    AttendanceWithSeolgi,
    DefaultError,
    UpdateAttendanceDTO,
    UpdateAttendanceContext
  >,
) => {
  // TODO: notification https://github.com/alan2207/bulletproof-react/blob/11d9149c9bb2af0def640d3b690b52db36028428/src/features/discussions/api/updateDiscussion.ts#L29
  // update 전 데이터를 보여줄 수 있기 떄문에 만약 GET /api/attendance/{attendanceId}가 있다면 cancel

  return useMutation<
    AttendanceWithSeolgi,
    DefaultError,
    UpdateAttendanceDTO,
    UpdateAttendanceContext
  >({
    onMutate: async ({ data, attendanceId }) => {
      // REF: https://tanstack.com/query/v5/docs/react/guides/mutations#persist-mutations
      // WHY?: GET /{id}은 cancel 하는데 GET / 은 하지 않는 이유가 있을까?
      await queryClient.cancelQueries({
        queryKey: [`api/attendance`, attendanceId],
      });

      const optimisticAttendance =
        queryClient.getQueryData<AttendanceWithSeolgi>([
          `api/attendance`,
          attendanceId,
        ]);

      if (optimisticAttendance && data.title) {
        optimisticAttendance.title = data.title;
      }

      if (optimisticAttendance) {
        queryClient.setQueryData<AttendanceWithSeolgi>(
          [`api/attendance`, attendanceId],
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
          ["api/attendance", context.optimisticAttendance.id],
          context.optimisticAttendance,
        );
      }
    },
    onSuccess: (updated: AttendanceWithSeolgi) => {
      queryClient.refetchQueries({
        queryKey: ["api/attendance", updated.id],
      });
      // TODO: add notification
    },
    ...config,
    mutationFn: updateAttendance,
  });
};
