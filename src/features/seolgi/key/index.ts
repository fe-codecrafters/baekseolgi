export interface SeolgiKeyParam {
  seolgiName: string;
}

export const seolgiKeys = {
  name: ({ seolgiName }: SeolgiKeyParam) =>
    ["seolgi", "name", { seolgiName }] as const,
};
