export interface OneObjectiveKeyParam {
  id: number;
}

export const objectiveKeys = {
  all: () => ["objective"] as const,
  id: ({ id }: OneObjectiveKeyParam) => ["objective", "id", { id }] as const,
};

// attendanceKeys의 속성값 타입
export type ObjectiveKeysValue = ReturnType<
  (typeof objectiveKeys)[keyof typeof objectiveKeys]
>;

export type AllObjectiveKey = ReturnType<(typeof objectiveKeys)["all"]>;
export type OneObjectiveKey = ReturnType<(typeof objectiveKeys)["id"]>;
