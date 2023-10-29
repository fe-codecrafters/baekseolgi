// REF: https://tkdodo.eu/blog/effective-react-query-keys
export const attendanceKeys = {
  all: ["attendances"] as const,
  // lists: () => [...attendanceKeys.all, "list"] as const,
  // list: (filters: string) => [...attendanceKeys.lists(), { filters }] as const,
  // details: () => [...attendanceKeys.all, "detail"] as const,
  // detail: (id: number) => [...attendanceKeys.details(), id] as const,
};
