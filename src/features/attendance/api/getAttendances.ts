import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import {
  attendanceKeys,
  DailyAttendanceKeysParam,
  MonthlyAttendanceKeysParam,
  OneAttendanceKeysParam,
} from "../key";
import {
  DailyAttendanceResponse,
  MonthlyAttendance,
  MonthlyAttendanceResponse,
  OneAttendanceResponse,
} from "../types";

export const getOneAttendance = ({ id }: OneAttendanceKeysParam) => {
  return axios.get<OneAttendanceResponse>(`/api/attendance/${id}`);
};

export const useOneAttendance = ({ id }: OneAttendanceKeysParam) => {
  return useQuery({
    queryKey: attendanceKeys.id({ id }),
    queryFn: () => getOneAttendance({ id }),
  });
};

export const getDailyAttendances = async ({
  date,
  userId,
  objectiveId,
}: DailyAttendanceKeysParam) => {
  const res = await axios.get<DailyAttendanceResponse>(
    `/api/attendance/day/${date}`,
    {
      params: {
        userId,
        objectiveId,
      },
    },
  );
  return res.data.data;
};

export const useDailyAttendances = ({
  date,
  userId,
  objectiveId,
}: DailyAttendanceKeysParam) => {
  return useQuery({
    queryKey: attendanceKeys.day({ date, userId, objectiveId }),
    queryFn: () => getDailyAttendances({ date, userId, objectiveId }),
  });
};

// TODO
export const getWeeklyAttendances = ({}) => {};
// TODO
export const useWeeklyAttendances = ({}) => {};

export const getMonthlyAttendances = async ({
  year,
  month,
  userId,
  objectiveId,
}: MonthlyAttendanceKeysParam) => {
  const res = await axios.get<MonthlyAttendanceResponse>(
    `/api/attendance/month/${year}/${month}`,
    {
      params: {
        userId,
        objectiveId,
      },
    },
  );
  return res.data.data;
};

export const useMonthlyAttendances = (
  { year, month, userId, objectiveId }: MonthlyAttendanceKeysParam,
  config?: { placeholderData: MonthlyAttendance },
) => {
  return useQuery({
    queryKey: attendanceKeys.month({ year, month, userId, objectiveId }),
    queryFn: () => getMonthlyAttendances({ year, month, userId, objectiveId }),
    placeholderData: config?.placeholderData,
  });
};

// TODO
export const getYearlyAttendances = () => {};
// TODO
export const useYearlyAttendances = () => {};

// TODO
export const getYearlyAttendancesStat = () => {};
