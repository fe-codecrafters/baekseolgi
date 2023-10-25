"use client";
import AttendanceInput from "@/components/AttendanceInput";
import { CalendarHeader } from "@/components/CalendarHeader";
import { Header } from "@/components/Header";
import TabBar from "@/components/TabBar";
import { MonthlyAttendanceResponse } from "@/types/response";
import { useEffect, useState } from "react";

export default function FeedPage() {
  const date = new Date();

  const today = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    day: date.getDay(),
  };

  const initialMonthData: MonthlyAttendanceResponse = {
    year: 2000,
    month: 1,
    objective: "",
    attendance: [],
  };

  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);
  const [monthData, setMonthData] = useState(initialMonthData);
  // TODO: userId, objectiveId도 데이터 확인할 수 있어야
  const userId = 1;
  const objectiveId = 1;

  const toPrevMonth = () => {
    // 달이 바뀔 때마다 설기 잔상이 남아서 초기화해주기 위한 코드
    setMonthData(initialMonthData);

    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const toNextMonth = () => {
    // 달이 바뀔 때마다 설기 잔상이 남아서 초기화해주기 위한 코드
    setMonthData(initialMonthData);

    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const getAttendance = (
    year: number,
    month: number,
    userId: number,
    objectiveId: number,
  ) => {
    fetch(
      `/api/attendance/month/${year}/${month}?userId=${userId}&objectiveId=${objectiveId}`,
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMonthData(res.data);
      });
  };

  const editAttendance = (id: number, title: string) => {
    fetch(`/api/attendance/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        getAttendance(selectedYear, selectedMonth, userId, objectiveId);
      })
      .catch((e) => console.log("TODO: 에러 헨들링", e));
  };

  const deleteAttendance = (id: number) => {
    fetch(`/api/attendance/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        getAttendance(selectedYear, selectedMonth, userId, objectiveId);
      })
      .catch((e) => console.log("TODO: 에러 헨들링", e));
  };

  useEffect(() => {
    getAttendance(selectedYear, selectedMonth, userId, objectiveId);
  }, [selectedMonth, selectedYear]);

  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center justify-between gap-[20px] md:gap-[40px]">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <CalendarHeader
          toPrevMonth={toPrevMonth}
          toNextMonth={toNextMonth}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
        <div className="mt-[40px] w-[600px]">
          {monthData && monthData.attendance.length > 0 ? (
            monthData.attendance.map((el) => {
              return (
                <div className="mb-[24px]" key={el.id}>
                  {/* onchange 추가해서 데이터 변경하는 기능 추가 예정 */}
                  <AttendanceInput
                    label="출석"
                    id={`attendance-${el.id}`}
                    name={`attendance-${el.id}`}
                    attendanceId={el.id}
                    onChange={() => {}}
                    placeholder="Calendar 페이지 placeholder"
                    required
                    date={new Date(monthData.year, monthData.month - 1, el.id)}
                    defaultValue={el.title}
                    editAttendance={editAttendance}
                    deleteAttendance={deleteAttendance}
                    type="calendar"
                  ></AttendanceInput>
                </div>
              );
            })
          ) : (
            <div className="mt-[40px] flex h-[600px] items-center justify-center md:h-[800px]">
              <p className="text-xl md:text-2xl">이 달에는 기록이 없어요!</p>
            </div>
          )}
        </div>
      </div>
      <TabBar />
    </div>
  );
}
