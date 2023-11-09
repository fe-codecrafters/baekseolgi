import { AttendanceWithSeolgi } from "@/types/dto";
import Day from "./Day";

interface WeekProps {
  week: (number | AttendanceWithSeolgi)[];
}

// 달력에서 한 주를 표시하는 컴포넌트 - 7개의 Day 컴포넌트를 묶어주는 역할
export default function Week({ week }: WeekProps) {
  return (
    <div className="mt-1 flex w-auto flex-row justify-start gap-[10px] md:gap-[16px]">
      {week.map((day, idx) => {
        return <Day key={`day-${idx + 1}`} day={day} />;
      })}
    </div>
  );
}
