export interface OneUserKeyParam {
  id: number;
}

export const userKeys = {
  id: ({ id }: OneUserKeyParam) => ["user", "id", { id }] as const,
};

export type OneUserKeysValue = ReturnType<
  (typeof userKeys)[keyof typeof userKeys]
>;

export type OneUserKeys = ReturnType<(typeof userKeys)["id"]>;
