"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/Calendar";
import { ObjectiveProgressBar } from "@/components/ObjectiveProgressBar";
import { CalendarHeader } from "@/components/CalendarHeader";
import { Objective } from "@/components/Objective";
import { attendanceKeys } from "@/features/attendance/key";
import { useMonthlyAttendances } from "@/features/attendance/api/getAttendances";

export default function CalendarPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const RQKey = attendanceKeys.month({
    year: selectedYear,
    month: selectedMonth,
    // TODO: userId, objectiveId도 데이터 확인할 수 있어야
    userId: 1,
    objectiveId: 1,
  });
  const { isLoading, data, isSuccess } = useMonthlyAttendances(RQKey);

  const toPrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const toNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center gap-[20px] md:gap-[40px]">
      <CalendarHeader
        toPrevMonth={toPrevMonth}
        toNextMonth={toNextMonth}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
      />
      <Objective />
      {isSuccess ? (
        <>
          <Calendar
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            monthData={data.attendance}
            type={"month"}
          />

          <ObjectiveProgressBar count={data.attendance.length} />
        </>
      ) : (
        "로딩중"
      )}
    </div>
  );
}
