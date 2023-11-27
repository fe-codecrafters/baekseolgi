"use client";
import { CalendarHeader } from "@/components/Calendar/CalendarHeader";
import { useState } from "react";
import { Objective } from "@/components/Objective";
import { Calendar } from "@/components/Calendar/Calendar";
import SeolgiIcon from "@/icons/SeolgiIcon";
import { useMonthlyAttendances } from "@/features/attendance/api/getAttendances";
import { attendanceKeys } from "@/features/attendance/key";
import LoadingIndicator from "@/components/LoadingIndicator";
import { initialDate } from "@/app/redux/reducer/dateSlice";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { TutorialButton } from "@/components/TutorialButton";

export default function Home() {
  const { data: session, status } = useSession();
  const userId = session?.user.id;

  if (status === "loading") return <LoadingIndicator />;

  const seolgiSize = {
    objective: "w-[100px] h-[100px] md:w-[250px] md:h-[250px]",
    month: "w-[70px] h-[70px] mb-[20px] md:w-[140px] md:h-[140px] md:mb-[50px]",
    week: "w-[30px] h-[30px] mb-[50px] md:w-[50px] md:h-[50px] md:mb-[100px]",
  };

  type SeolgiSizeKey = keyof typeof seolgiSize;
  const [seolgiSay, setSeolgiSay] = useState<SeolgiSizeKey>("objective");
  const [effect, setEffect] = useState(false);

  const RQKey = attendanceKeys.month({
    year: initialDate.year,
    month: initialDate.month,
    userId: userId!,
  });

  const { isLoading, data } = useMonthlyAttendances(RQKey);

  const activeObjectiveId = data?.objectiveId;
  console.log("activeObjectiveId ? ", activeObjectiveId);

  if (!userId) {
    return <LoadingIndicator></LoadingIndicator>;
  }
  if (isLoading || !data) return <LoadingIndicator></LoadingIndicator>;

  return (
    <>
      <CalendarHeader type="main" />
      {activeObjectiveId ? (
        <Objective id={activeObjectiveId} />
      ) : (
        <TutorialButton />
      )}
      {activeObjectiveId ? (
        <>
          <Calendar monthData={data.attendance} type={"week"} />
          <div className="mt-[40px] flex h-[250px] flex-col items-center justify-between gap-[30px] md:h-[400px]">
            <div className="relative flex h-[90px] w-[280px] items-center justify-center rounded-2xl border-[1px] bg-primary-white p-4 text-primary-black shadow-lg md:h-[120px] md:w-[400px]">
              <div className="absolute bottom-[-9px] left-1/2 h-4 w-4 -translate-x-1/2 -rotate-45 border-b-[1px] border-l-[1px] bg-primary-white"></div>
              {data && data?.attendance.length > 0 ? (
                <p className="text-[16px] font-bold md:text-2xl">
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
                <p className="text-[16px] font-bold md:text-2xl">
                  이 달에는 설기가 없어요!
                </p>
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
      ) : null}
    </>
  );
}
