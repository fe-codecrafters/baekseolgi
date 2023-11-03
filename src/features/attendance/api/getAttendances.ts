import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import {
  attendanceKeys,
  DailyAttendanceKey,
  DailyAttendanceKeyParam,
  MonthlyAttendanceKey,
  MonthlyAttendanceKeyParam,
  OneAttendanceKey,
  OneAttendanceKeyParam,
} from "../key";
import {
  DailyAttendanceResponse,
  MonthlyAttendance,
  MonthlyAttendanceResponse,
  OneAttendanceResponse,
} from "../types";

export const getOneAttendance = ({ id }: OneAttendanceKeyParam) => {
  return axios.get<OneAttendanceResponse>(`/api/attendance/${id}`);
};

export const useOneAttendance = ([, , { id }]: OneAttendanceKey) => {
  return useQuery({
    queryKey: attendanceKeys.id({ id }),
    queryFn: () => getOneAttendance({ id }),
  });
};

export const getDailyAttendances = async ({
  date,
  userId,
  objectiveId,
}: DailyAttendanceKeyParam) => {
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

export const useDailyAttendances = ([
  ,
  ,
  { date, userId, objectiveId },
]: DailyAttendanceKey) => {
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
}: MonthlyAttendanceKeyParam) => {
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
  [, , { year, month, userId, objectiveId }]: MonthlyAttendanceKey,
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
