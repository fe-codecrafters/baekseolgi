"use client"
import TabBar from "@/components/TabBar";
import { Header } from "@/components/Header";
import { CalendarHeader } from "@/components/CalendarHeader";
import { useEffect, useState } from "react";
import { Objective } from "@/components/Objective";
import { Calendar } from "@/components/Calendar";
import SeolgiIcon from "@/icons/SeolgiIcon";
const DEV = process.env.NODE_ENV === "development";

interface dateProps {
  id: number;
  title: string;
  status: string,
  createdAt: Date;
  updatedAt: Date;
  objectiveId: number;
  Seolgi: {
    id: number;
    name: string;
    createdAt: Date;
    color: string;
  };
  userId: number;
  seolgiId: number;
}

interface dummyProps {
  year: number;
  month: number;
  objective: string;
  attendance: dateProps[]
}

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
    attendance: []
  });

  const toPrevMonth = () => {
    // 달이 바뀔 때마다 설기 잔상이 남아서 초기화해주기 위한 코드
    setMonthData({
      year: "",
      month: "",
      objective: "",
      attendance: []
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
      attendance: []
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

  const dates: (number | dateProps)[] = [];

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
    monthData.attendance.forEach((date: dateProps) => {
      const {id} = date;
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
            (el: dummyProps) => el.year === selectedYear && el.month === selectedMonth,
          ),
        )
      });
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
        type={"week"}
      />
      <div className="flex items-center justify-center p-4 w-[400px] h-[120px] shadow-lg bg-primary-white border-[1px] text-primary-black rounded-2xl relative">
        <div className="absolute bottom-[-9px] w-4 h-4 bg-primary-white transform border-l-[1px] border-b-[1px] -rotate-45 left-1/2 -translate-x-1/2"></div>
        <p className="text-2xl font-bold">{monthData.month}월의 설기 개수는 {monthData.attendance.length}개입니다!</p>
      </div>
      <SeolgiIcon width={250} height={250} />
      <TabBar type="desktop"></TabBar>
    </div>
  );
}
