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

export default function CalendarPage() {
  const dateState = useSelector((state: RootState) => state.date);

  const RQKey = attendanceKeys.month({
    year: dateState.year,
    month: dateState.month,
    // TODO: userId, objectiveId도 데이터 확인할 수 있어야
    userId: 1,
    objectiveId: 1,
  });
  const { isLoading, data, isSuccess } = useMonthlyAttendances(RQKey);

  if (isLoading) return <LoadingIndicator></LoadingIndicator>;

  return (
    <>
      <CalendarHeader />
      <Objective id={1} />
      {isSuccess ? (
        <>
          <Calendar monthData={data.attendance} type={"month"} />

          <ObjectiveProgressBar count={data.attendance.length} />
        </>
      ) : (
        // 데이터 없을 때는 전부다 회색으로 보이게 처리
        <Calendar monthData={[]} type={"month"} />
      )}
    </>
  );
}
