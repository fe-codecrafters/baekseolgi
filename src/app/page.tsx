"use client";
import { CalendarHeader } from "@/components/CalendarHeader";
import { useState } from "react";
import { Objective } from "@/components/Objective";
import { Calendar } from "@/components/Calendar";
import SeolgiIcon from "@/icons/SeolgiIcon";

import { AttendanceWithSeolgi } from "@/types/response";
import { useMonthlyAttendances } from "@/features/attendance/api/getAttendances";
import { attendanceKeys } from "@/features/attendance/key";

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
  const RQKey = attendanceKeys.month({
    year: selectedYear,
    month: selectedMonth,
    // TODO: userId, objectiveId도 데이터 확인할 수 있어야
    userId: 1,
    objectiveId: 1,
  });

  const { isLoading, data } = useMonthlyAttendances(RQKey);

  const seolgiSize = {
    objective: "w-[250px] h-[250px]",
    month: "w-[140px] h-[140px] mb-[50px]",
    week: "w-[50px] h-[50px] mb-[100px]",
  };

  type SeolgiSizeKey = keyof typeof seolgiSize;
  const [seolgiSay, setSeolgiSay] = useState<SeolgiSizeKey>("objective");
  const [effect, setEffect] = useState(false);

  const toPrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(12);
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

  if (data && data.attendance) {
    data.attendance.forEach((date: AttendanceWithSeolgi) => {
      const { id } = date;
      if (dates.findIndex((el) => el === id)) {
        dates[dates.findIndex((el) => el === id)] = date;
      }
    });
  }

  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center gap-[20px] md:gap-[40px]">
      <CalendarHeader
        toPrevMonth={toPrevMonth}
        toNextMonth={toNextMonth}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
      />
      <Objective />
      {!isLoading && data && (
        <Calendar
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          monthData={data?.attendance}
          type={"week"}
        />
      )}
      <div className="flex h-[400px] flex-col items-center justify-between gap-[30px]">
        <div className="relative flex h-[120px] w-[400px] items-center justify-center rounded-2xl border-[1px] bg-primary-white p-4 text-primary-black shadow-lg">
          <div className="absolute bottom-[-9px] left-1/2 h-4 w-4 -translate-x-1/2 -rotate-45 border-b-[1px] border-l-[1px] bg-primary-white"></div>
          {data && data.attendance.length > 0 ? (
            <p className="text-2xl font-bold">
              {seolgiSay === "month"
                ? `${data.month}월의 설기 개수는 ${data.attendance.length}
              개입니다!`
                : seolgiSay === "week"
                ? `이번 주의 설기 개수는 0개 입니다!`
                : seolgiSay === "objective"
                ? `이번 목표의 설기 개수는 10개 입니다!`
                : null}
            </p>
          ) : (
            <p className="text-2xl font-bold">이 달에는 설기가 없어요!</p>
          )}
        </div>
        <button
          className={`${seolgiSize[seolgiSay]} transition-all ${
            effect && "animate-seolgiClick"
          }`}
          onClick={() => {
            seolgiSay === "objective"
              ? setSeolgiSay("month")
              : seolgiSay === "month"
              ? setSeolgiSay("week")
              : seolgiSay === "week"
              ? setSeolgiSay("objective")
              : null;
            setEffect(true);
          }}
          onAnimationEnd={() => setEffect(false)}
        >
          <SeolgiIcon width="auto" height="auto" />
        </button>
      </div>
    </div>
  );
}
