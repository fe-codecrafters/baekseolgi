"use client";
import AttendanceInput from "@/components/AttendanceInput";
import { CalendarHeader } from "@/components/CalendarHeader";
import { Header } from "@/components/Header";
import TabBar from "@/components/TabBar";
import { useEffect, useState } from "react";
const DEV = process.env.NODE_ENV === "development";

//TODO : map 메소드 사용하기 위해서는 타입 지정 되어 있어야 함
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
type dummyProps = {
    year: number;
    month: number;
    objective: string;
    attendance: dateProps[]
}

export default function FeedPage() {
    const date = new Date();

    const today = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        day: date.getDay(),
    };

    const initialMonthData: dummyProps = {
        year: 2000,
        month: 1,
        objective: "",
        attendance: [],
    };

    const [selectedYear, setSelectedYear] = useState(today.year);
    const [selectedMonth, setSelectedMonth] = useState(today.month);
    const [monthData, setMonthData] = useState(initialMonthData);

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

    useEffect(() => {
        fetch("/api/dummy")
        .then((res) => res.json())
        .then((res) => {
            setMonthData(
            res.data.find(
                (el: dummyProps) =>
                el.year === selectedYear && el.month === selectedMonth,
            ),
            );
        });
    }, [selectedMonth, selectedYear]);


  return (
    <div className="mx-auto flex gap-[20px] md:gap-[40px] w-full h-screen flex-col items-center justify-between">
        <Header />
        <div className="flex flex-col items-center justify-center" >
            <CalendarHeader
                toPrevMonth={toPrevMonth}
                toNextMonth={toNextMonth}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
            />
            <div className="mt-[40px] w-[600px]">
                {monthData && monthData.attendance.length > 0 ?
                    monthData.attendance.map((el) => {
                        return (
                            <div className="mb-[24px]" key={el.id}>
                                {/* onchange 추가해서 데이터 변경하는 기능 추가 예정 */}
                                <AttendanceInput
                                label="출석"
                                id={`attendance-${el.id}`}
                                name={`attendance-${el.id}`}
                                onChange={() => {}}
                                placeholder="Calendar 페이지 placeholder"
                                required
                                date={new Date(monthData.year, monthData.month -1, el.id)}
                                defaultValue={el.title}
                                type="calendar"
                                ></AttendanceInput>
                            </div>
                        )
                    }):
                    <div className="mt-[40px] w-[600px] h-[800px] flex justify-center items-center">
                        <p className="text-2xl">이 달에는 기록이 없어요!</p>
                    </div>
                }
            </div>
        </div>
        <TabBar />
    </div>
  );
}