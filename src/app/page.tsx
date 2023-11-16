"use client";
import { CalendarHeader } from "@/components/Calendar/CalendarHeader";
import { useEffect, useState } from "react";
import { Objective } from "@/components/Objective";
import { Calendar } from "@/components/Calendar/Calendar";
import SeolgiIcon from "@/icons/SeolgiIcon";
import { useMonthlyAttendances } from "@/features/attendance/api/getAttendances";
import { attendanceKeys } from "@/features/attendance/key";
import LoadingIndicator from "@/components/LoadingIndicator";
import { initialDate } from "@/app/redux/reducer/dateSlice";
import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log("root page", session, status);

  const RQKey = attendanceKeys.month({
    year: initialDate.year,
    month: initialDate.month,
    // TODO: userId, objectiveId도 데이터 확인할 수 있어야
    userId: 1,
    objectiveId: 1,
  });

  const { isLoading, data } = useMonthlyAttendances(RQKey);

  const seolgiSize = {
    objective: "w-[100px] h-[100px] md:w-[250px] md:h-[250px]",
    month: "w-[70px] h-[70px] mb-[20px] md:w-[140px] md:h-[140px] md:mb-[50px]",
    week: "w-[30px] h-[30px] mb-[50px] md:w-[50px] md:h-[50px] md:mb-[100px]",
  };

  type SeolgiSizeKey = keyof typeof seolgiSize;
  const [seolgiSay, setSeolgiSay] = useState<SeolgiSizeKey>("objective");
  const [effect, setEffect] = useState(false);

  if (isLoading) return <LoadingIndicator></LoadingIndicator>;
  if (status === "unauthenticated") {
    console.log("unauthenticated");
    router.push("/login");
  }

  return (
    <>
      <CalendarHeader />
      <Objective id={1} />
      {!isLoading && data && (
        <Calendar monthData={data.attendance} type={"week"} />
      )}
      <div className="flex h-[250px] md:h-[400px] flex-col items-center justify-between gap-[30px] mt-[40px]">
        <div className="relative flex h-[90px] md:h-[120px] w-[280px] md:w-[400px] items-center justify-center rounded-2xl border-[1px] bg-primary-white p-4 text-primary-black shadow-lg">
          <div className="absolute bottom-[-9px] left-1/2 h-4 w-4 -translate-x-1/2 -rotate-45 border-b-[1px] border-l-[1px] bg-primary-white"></div>
          {data && data.attendance.length > 0 ? (
            <p className="text-[16px] md:text-2xl font-bold">
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
            <p className="text-[16px] md:text-2xl font-bold">이 달에는 설기가 없어요!</p>
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
          <SeolgiIcon />
        </button>
      </div>
    </>
  );
}
