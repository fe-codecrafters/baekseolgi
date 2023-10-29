import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

interface getMonthlyAttendanceKeys {
  year: number;
  month: number;
  userId: number;
  objectiveId: number;
}

export const getMonthlyAttendance = ({
  year,
  month,
  userId,
  objectiveId,
}: getMonthlyAttendanceKeys) => {
  return axios.get(`/api/attendance/month/${year}/${month}`, {
    params: {
      userId,
      objectiveId,
    },
  });
};

export const useAttendance = (
  { year, month, userId, objectiveId }: getMonthlyAttendanceKeys,
  config?: UseQueryOptions,
) => {
  return useQuery({
    queryKey: ["api/attendance/month", year, month, userId, objectiveId],
    queryFn: () => getMonthlyAttendance({ year, month, userId, objectiveId }),
    ...config,
  });
};
