"use client";
import { CalendarHeader } from "@/components/Calendar/CalendarHeader";
import { useState } from "react";
import { Objective } from "@/components/Objective";
import { Calendar } from "@/components/Calendar/Calendar";
import SeolgiIcon from "@/icons/SeolgiIcon";
import { useSelector } from "react-redux";
import { useMonthlyAttendances } from "@/features/attendance/api/getAttendances";
import { attendanceKeys } from "@/features/attendance/key";
import LoadingIndicator from "@/components/LoadingIndicator";
import { RootState } from "@/redux/store";

export default function Home() {
  const dateState = useSelector((state: RootState) => state.date);

  const RQKey = attendanceKeys.month({
    year: dateState.year,
    month: dateState.month,
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

  if (isLoading) return <LoadingIndicator></LoadingIndicator>;

  return (
    <>
      <CalendarHeader />
      <Objective />
      {!isLoading && data && (
        <Calendar monthData={data.attendance} type={"week"} />
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
    </>
  );
}
