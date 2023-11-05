import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { AttendanceKeysValue } from "../key";
import {
  CreateAttendanceParams,
  CreateAttendanceResDTO,
} from "../types/createAttendance.dto";
import { MonthlyAttendance } from "../types/getAttendance.dto";

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
    onMutate: async (createAttendanceParams) => {
      // REF: https://tanstack.com/query/v5/docs/react/guides/mutations#persist-mutations
      // WHY?: GET /{id}은 cancel 하는데 GET / 은 하지 않는 이유가 있을까?
      await queryClient.cancelQueries({
        queryKey,
      });

      const previousAttendance = queryClient.getQueryData<MonthlyAttendance>([
        ...queryKey,
      ]);

      if (previousAttendance) {
        const prevCopy = previousAttendance.attendance;
        const optimistic = {
          ...createAttendanceParams,
          ...prevCopy[0],
          id: parseInt(String(Math.random() * 10000000)),
        };

        queryClient.setQueryData<MonthlyAttendance>(queryKey, {
          ...previousAttendance,
          attendance: [...prevCopy, optimistic],
        });
      } else {
        return;
      }

      return { previousAttendance };
    },
    onSettled: () => {
      console.log("here", queryKey);
      queryClient.invalidateQueries({ queryKey });
      // TODO: add notification
    },
    mutationFn: createAttendance,
  });
};
