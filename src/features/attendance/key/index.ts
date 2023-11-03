// REF: https://tkdodo.eu/blog/effective-react-query-keys
export interface AttendanceKeyParam {
  userId: number;
  objectiveId: number;
}

export interface OneAttendanceKeyParam {
  id: number;
}

export interface DailyAttendanceKeyParam extends AttendanceKeyParam {
  date: number;
}

export interface MonthlyAttendanceKeyParam extends AttendanceKeyParam {
  year: number;
  month: number;
}

export interface YearlyAttendanceKeyParam extends AttendanceKeyParam {
  year: number;
}

// TODO: key가 undefined면 알아서 작동을 안하면 좋겠는데 확인 필요
export const attendanceKeys = {
  all: () => ["attendance"] as const,
  id: ({ id }: OneAttendanceKeyParam) => ["attendance", "id", { id }] as const,
  day: ({ date, userId, objectiveId }: DailyAttendanceKeyParam) =>
    ["attendance", "day", { date, userId, objectiveId }] as const,
  // weekly: ["attendance"] as const,
  month: ({ year, month, userId, objectiveId }: MonthlyAttendanceKeyParam) =>
    ["attendance", "month", { year, month, userId, objectiveId }] as const,
  year: ({ year, userId, objectiveId }: YearlyAttendanceKeyParam) =>
    ["attendance", "year", { year, userId, objectiveId }] as const,
};

// attendanceKeys의 속성값 타입
export type AttendanceKeysValue = ReturnType<
  (typeof attendanceKeys)[keyof typeof attendanceKeys]
>;

export type AllAttendanceKey = ReturnType<(typeof attendanceKeys)["all"]>;
export type OneAttendanceKey = ReturnType<(typeof attendanceKeys)["id"]>;
export type DailyAttendanceKey = ReturnType<(typeof attendanceKeys)["day"]>;
export type MonthlyAttendanceKey = ReturnType<(typeof attendanceKeys)["month"]>;
export type YearlyAttendanceKey = ReturnType<(typeof attendanceKeys)["year"]>;
