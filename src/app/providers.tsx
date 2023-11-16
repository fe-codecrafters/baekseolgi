// In Next.js, this file would be called: app/providers.jsx
"use client";

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import { useState, ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/react-query";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { addDays } from "date-fns";
import { Provider } from "react-redux";
import store from "@/app/redux/store";

interface MySession extends Session {}

export function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default function Providers({ children }: { children: ReactNode }) {
  const [newQueryClient] = useState(() => queryClient);
  const session: MySession = {
    user: {
      name: null,
      email: null,
      image: null,
    },
    expires: addDays(new Date(), 1).toISOString(),
  };

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={newQueryClient}>
        <ReduxProvider>
          <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReduxProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
