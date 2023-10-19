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
  const date = new Date();
  const today = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    day: date.getDay(),
  };

  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);
  const [monthData, setMonthData] = useState({});

  const toPrevMonth = () => {
    // 달이 바뀔 때마다 설기 잔상이 남아서 초기화해주기 위한 코드
    setMonthData({});

    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const toNextMonth = () => {
    // 달이 바뀔 때마다 설기 잔상이 남아서 초기화해주기 위한 코드
    setMonthData({});

    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // 선택된 달의 시작일과 종료일을 정의
  const monthStart = new Date(selectedYear, selectedMonth - 1, 1);
  const monthEnd = new Date(selectedYear, selectedMonth, 0);

  // 비어있는 날짜도 Day 컴포넌트로 표시해줘야하므로 0으로 채워넣기
  const dates = [];
  for (let i = 0; i < monthStart.getDay(); i++) {
    dates.push(0);
  }
  for (let i = 1; i <= monthEnd.getDate(); i++) {
    dates.push(i);
  }
  while (dates.length % 7 !== 0) {
    dates.push(0);
  }

  // 날짜에 스탬프 정보 대입
  // 일단 monthData 유무로 조건문을 짜놨지만 수정 필요..
  if (monthData && monthData.attendance) {
    monthData.attendance.forEach((date) => {
      if (dates.findIndex((el) => el === date.id)) {
        dates[dates.findIndex((el) => el === date.id)] = date;
      }
    });
  }

  useEffect(() => {
    fetch("/api/dummy")
      .then((res) => res.json())
      .then((res) =>
        setMonthData(
          res.data.find(
            (el) => el.year === selectedYear && el.month === selectedMonth,
          ),
        ),
      );
  }, [selectedMonth, selectedYear]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col items-center justify-between">
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
        dates={dates}
        monthData={monthData}
        toPrevMonth={toPrevMonth}
        toNextMonth={toNextMonth}
      />
      <ObjectiveProgressBar count={30} />
      <TabBar type={"desktop"}></TabBar>
    </div>
  );
}
