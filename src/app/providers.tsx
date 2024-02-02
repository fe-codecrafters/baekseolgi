// In Next.js, this file would be called: app/providers.jsx
"use client";

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import { useState, ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/react-query";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { addDays } from "date-fns";
import { Provider } from "react-redux";
import store from "@/app/redux/store";

export function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default function Providers({ children }: { children: ReactNode }) {
  const [newQueryClient] = useState(() => queryClient);
  const session: Session = {
    user: {
      id: 1,
      activeObjectiveId: 1,
      name: null,
      email: null,
      image: null,
    },
    // TODO: 이거 왜 꼭 설정해야 하는지 정확히 모르겠음
    expires: addDays(new Date(), 1).toISOString(),
  };

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={newQueryClient}>
        <ReduxProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ReduxProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
