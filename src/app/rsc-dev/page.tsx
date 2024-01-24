import {
  getMonthlyAttendances,
  useMonthlyAttendances,
} from "@/features/attendance/api/getAttendances";
import { attendanceKeys } from "@/features/attendance/key";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import Home from "../page";

export default async function RscDev() {
  // TIL: next-auth의 클라이언트 메서드, Redux, React-Query는 심플하게 - 서버 컴포넌트에서 사용하지 못한다!
  // 서버 컴포트트에서 React-Query는 쓰는 방법이 있긴 하다. https://tanstack.com/query/latest/docs/react/guides/advanced-ssr

  // const { data: session, status } = useSession();
  // Next - Auth는 다른 메서드가 있음

  // const dateState = useSelector((state: RootState) => state.date);

  // const RQKey = attendanceKeys.month({
  //   year: 2024,
  //   month: 1,
  //   userId: 1,
  // });

  // const { isLoading, data, isSuccess } = useMonthlyAttendances(RQKey);

  // return <div>{data.toString()}</div>;

  await queryClient.prefetchQuery({
    queryKey: attendanceKeys.month({ year: 2024, month: 1, userId: 1 }),
    queryFn: () => getMonthlyAttendances({ year: 2024, month: 1, userId: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home></Home>
    </HydrationBoundary>
  );
}
