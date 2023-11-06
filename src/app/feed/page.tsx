"use client";
import AttendanceInput from "@/components/AttendanceInput";
import { CalendarHeader } from "@/components/CalendarHeader";
import { useDeleteAttendance } from "@/features/attendance/api/deleteAttendance";
import { useMonthlyAttendances } from "@/features/attendance/api/getAttendances";
import { useUpdateAttendance } from "@/features/attendance/api/updateAttendance";
import { attendanceKeys } from "@/features/attendance/key";
import { useState } from "react";

export default function FeedPage() {
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
  const { isLoading, data, isSuccess } = useMonthlyAttendances(RQKey);
  const updateAttendanceMutation = useUpdateAttendance(RQKey);
  const deleteAttendanceMutation = useDeleteAttendance(RQKey);

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

  const editAttendance = (attendanceId: number, title: string) => {
    updateAttendanceMutation.mutate({
      data: {
        title,
      },
      attendanceId,
    });
  };

  const deleteAttendance = (attendanceId: number) => {
    deleteAttendanceMutation.mutate({
      attendanceId,
    });
  };

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center">
          <CalendarHeader
            toPrevMonth={toPrevMonth}
            toNextMonth={toNextMonth}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
          />
          <div className="mt-[40px] flex h-[600px] items-center justify-center md:h-[800px]">
            <p className="text-xl md:text-2xl">이 달에는 기록이 없어요!</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <CalendarHeader
          toPrevMonth={toPrevMonth}
          toNextMonth={toNextMonth}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
        <div className="mt-[40px] w-[600px]">
          {isSuccess && data && data?.attendance?.length > 0 ? (
            data.attendance.map((el) => {
              return (
                <div className="mb-[24px]" key={el.id}>
                  {/* onchange 추가해서 데이터 변경하는 기능 추가 예정 */}
                  <AttendanceInput
                    label="출석"
                    id={`attendance-${el.id}`}
                    name={`attendance-${el.id}`}
                    attendanceId={el.id}
                    onChange={() => {}}
                    seolgi={el.Seolgi}
                    placeholder="Calendar 페이지 placeholder"
                    required
                    date={new Date(data.year, data.month - 1, el.id)}
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
    </>
  );
}
