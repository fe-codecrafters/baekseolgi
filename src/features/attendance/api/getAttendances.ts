import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import {
  attendanceKeys,
  DailyAttendanceKey,
  MonthlyAttendanceKey,
  OneAttendanceKey,
} from "../key";
import {
  GetDailyAttendanceParams,
  GetDailyAttendanceResDTO,
  GetMonthlyAttendanceParams,
  GetMonthlyAttendanceResDTO,
  GetOneAttendanceParams,
  GetOneAttendanceResDTO,
} from "../types/getAttendance.dto";

export const getOneAttendance = async ({ id }: GetOneAttendanceParams) => {
  return (await axios.get<GetOneAttendanceResDTO>(`/api/attendance/${id}`)).data
    .data;
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
}: GetDailyAttendanceParams) => {
  const res = await axios.get<GetDailyAttendanceResDTO>(
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
  sort,
  direction,
}: GetMonthlyAttendanceParams) => {
  const res = await axios.get<GetMonthlyAttendanceResDTO>(
    `/api/attendance/month/${year}/${month}`,
    {
      params: {
        userId,
        objectiveId,
        sort,
        direction,
      },
    },
  );
  return res.data.data;
};

export const useMonthlyAttendances = ([
  ,
  ,
  { year, month, userId, objectiveId, sort, direction },
]: MonthlyAttendanceKey) => {
  return useQuery({
    queryKey: attendanceKeys.month({
      year,
      month,
      userId,
      objectiveId,
      sort,
      direction,
    }),
    queryFn: () =>
      getMonthlyAttendances({
        year,
        month,
        userId,
        objectiveId,
        sort,
        direction,
      }),
  });
};

// TODO
export const getYearlyAttendances = () => {};
// TODO
export const useYearlyAttendances = () => {};

// TODO
export const getYearlyAttendancesStat = () => {};
