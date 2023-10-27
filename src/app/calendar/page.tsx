"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/Calendar";
import TabBar from "@/components/TabBar";
import { ObjectiveProgressBar } from "@/components/ObjectiveProgressBar";
import { Header } from "@/components/Header";
import { CalendarHeader } from "@/components/CalendarHeader";
import { Objective } from "@/components/Objective";

const DEV = process.env.NODE_ENV === "development";

export default function CalendarPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [monthData, setMonthData] = useState([]);
  const userId = 1;
  const objectiveId = 1;

  const toPrevMonth = () => {
    // 달이 바뀔 때마다 설기 잔상이 남아서 초기화해주기 위한 코드
    setMonthData([]);

    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const toNextMonth = () => {
    // 달이 바뀔 때마다 설기 잔상이 남아서 초기화해주기 위한 코드
    setMonthData([]);

    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  useEffect(() => {
    fetch(
      `/api/attendance/month/${selectedYear}/${selectedMonth}?userId=${userId}&objectiveId=${objectiveId}`,
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMonthData(res.data.attendance);
      });
  }, [selectedMonth, selectedYear]);

  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center justify-between gap-[20px] md:gap-[40px]">
      <Header />
      <CalendarHeader
        toPrevMonth={toPrevMonth}
        toNextMonth={toNextMonth}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
      />
      <Objective />
      <Calendar
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        monthData={monthData}
        type={"month"}
      />
      <ObjectiveProgressBar count={monthData.length} />
      <TabBar type={"desktop"}></TabBar>
    </div>
  );
}
