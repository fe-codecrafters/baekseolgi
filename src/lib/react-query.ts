import { QueryClient } from "@tanstack/react-query";
const DEV = process.env.NODE_ENV === "development";

export const queryClient = (() => {
  DEV && console.log("query client mounted");
  return new QueryClient();
})();
