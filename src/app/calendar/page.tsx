"use client";

import { Calendar } from "@/components/Calendar/Calendar";
import { ObjectiveProgressBar } from "@/components/ObjectiveProgressBar";
import { CalendarHeader } from "@/components/Calendar/CalendarHeader";
import { Objective } from "@/components/Objective";
import { attendanceKeys } from "@/features/attendance/key";
import { useMonthlyAttendances } from "@/features/attendance/api/getAttendances";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useSession } from "next-auth/react";
import { TutorialButton } from "@/components/TutorialButton";

export default function CalendarPage() {
  const { data: session, status } = useSession();
  if (status === "loading") return <LoadingIndicator />;

  const userId = session?.user.id;

  const dateState = useSelector((state: RootState) => state.date);

  const RQKey = attendanceKeys.month({
    year: dateState.year,
    month: dateState.month,
    // 로그인이 되어있지 않으면 미들웨어에서 라우팅을 시키기 때문에 falsy가 아니라고 확신할 수 있다.
    userId: userId!,
  });
  const { isLoading, data, isSuccess } = useMonthlyAttendances(RQKey);

  if (isLoading) return <LoadingIndicator></LoadingIndicator>;

  return (
    <>
      <CalendarHeader />
      {data?.objectiveId ? (
        <Objective id={data.objectiveId} />
      ) : (
        <TutorialButton />
      )}
      {isSuccess ? (
        <>
          <Calendar monthData={data.attendance} type={"month"} />

          <ObjectiveProgressBar monthData={data.attendance} />
        </>
      ) : (
        // 데이터 없을 때는 전부다 회색으로 보이게 처리
        <Calendar monthData={[]} type={"month"} />
      )}
    </>
  );
}
