// REF: https://tkdodo.eu/blog/effective-react-query-keys
export interface AttendanceKeysParam {
  userId: number;
  objectiveId: number;
}

export interface OneAttendanceKeysParam {
  id: number;
}

export interface DailyAttendanceKeysParam extends AttendanceKeysParam {
  date: number;
}

export interface MonthlyAttendanceKeysParam extends AttendanceKeysParam {
  year: number;
  month: number;
}

export interface YearlyAttendanceKeysParam extends AttendanceKeysParam {
  year: number;
}

// TODO: key가 undefined면 알아서 작동을 안하면 좋겠는데 확인 필요
export const attendanceKeys = {
  all: ["attendance"] as const,
  id: ({ id }: OneAttendanceKeysParam) => ["attendance", "id", { id }] as const,
  day: ({ date, userId, objectiveId }: DailyAttendanceKeysParam) =>
    ["attendance", "day", { date, userId, objectiveId }] as const,
  // weekly: ["attendance"] as const,
  month: ({ year, month, userId, objectiveId }: MonthlyAttendanceKeysParam) =>
    ["attendance", "month", { year, month, userId, objectiveId }] as const,
  year: ({ year, userId, objectiveId }: YearlyAttendanceKeysParam) =>
    ["attendance", "year", { year, userId, objectiveId }] as const,
};
