"use client";
import TabBar from "@/components/TabBar";
import { Header } from "@/components/Header";
import { CalendarHeader } from "@/components/CalendarHeader";
import { useEffect, useState } from "react";
import { Objective } from "@/components/Objective";
import { Calendar } from "@/components/Calendar";
import SeolgiIcon from "@/icons/SeolgiIcon";
const DEV = process.env.NODE_ENV === "development";

import { AttendanceWithSeolgi, DummyResponse } from "@/types/response";

export default function Home() {
  //이 부분은 calendar.tsx 로직과 동일.
  //따로 빼내서 customhook으로 만들거나 help 함수로 만들어도 괜찮을 것 같습니다.
  const date = new Date();
  const today = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    day: date.getDay(),
  };

  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);
  const [monthData, setMonthData] = useState({
    year: "",
    month: "",
    objective: "",
    attendance: [],
  });

  const toPrevMonth = () => {
    // 달이 바뀔 때마다 설기 잔상이 남아서 초기화해주기 위한 코드
    setMonthData({
      year: "",
      month: "",
      objective: "",
      attendance: [],
    });

    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const toNextMonth = () => {
    // 달이 바뀔 때마다 설기 잔상이 남아서 초기화해주기 위한 코드
    setMonthData({
      year: "",
      month: "",
      objective: "",
      attendance: [],
    });

    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const monthStart = new Date(selectedYear, selectedMonth - 1, 1);
  const monthEnd = new Date(selectedYear, selectedMonth, 0);

  const dates: (number | AttendanceWithSeolgi)[] = [];

  for (let i = 0; i < monthStart.getDay(); i++) {
    dates.push(0);
  }
  for (let i = 1; i <= monthEnd.getDate(); i++) {
    dates.push(i);
  }
  while (dates.length % 7 !== 0) {
    dates.push(0);
  }

  if (monthData && monthData.attendance) {
    monthData.attendance.forEach((date: AttendanceWithSeolgi) => {
      const { id } = date;
      if (dates.findIndex((el) => el === id)) {
        dates[dates.findIndex((el) => el === id)] = date;
      }
    });
  }

  useEffect(() => {
    fetch("/api/dummy")
      .then((res) => res.json())
      .then((res) => {
        setMonthData(
          res.data.find(
            (el: DummyResponse) =>
              el.year === selectedYear && el.month === selectedMonth,
          ),
        );
      });
  }, [selectedMonth, selectedYear]);

  return (
    <div className="mx-auto flex gap-[20px] md:gap-[40px] w-full h-screen flex-col items-center justify-between">
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
        type={"week"}
      />
      <div className="relative flex h-[120px] w-[400px] items-center justify-center rounded-2xl border-[1px] bg-primary-white p-4 text-primary-black shadow-lg">
        <div className="absolute bottom-[-9px] left-1/2 h-4 w-4 -translate-x-1/2 -rotate-45 border-b-[1px] border-l-[1px] bg-primary-white"></div>
        {monthData && monthData.attendance.length > 0 ? (
          <p className="text-2xl font-bold">
            {monthData.month}월의 설기 개수는 {monthData.attendance.length}
            개입니다!
          </p>
        ) : (
          <p className="text-2xl font-bold">이 달에는 설기가 없어요!</p>
        )}
      </div>
      <SeolgiIcon width={250} height={250} />
      <TabBar />
    </div>
  );
}
