import { initialDate } from "@/redux/reducer/dateSlice";
import { RootState } from "@/redux/store";
import { DayNameType } from "@/types";
import { useSelector } from "react-redux";

interface WeekProps {
  days: DayNameType[];
}

export default function WeekHeader({ days }: WeekProps) {
  const { year, month } = useSelector((state: RootState) => state.date);
  const toDay = new Date(year, month - 1, initialDate.date).getDay();

  return (
    <div className="mt-1 flex w-auto flex-row justify-start gap-[10px] md:gap-[16px]">
      {days.map((day, idx) => {
        return (
          <div
            key={day}
            className={`mb-[-6px] w-[40px] text-center text-[16px] md:w-[70px] md:text-[24px]
                ${
                  idx === toDay
                    ? " font-medium text-black"
                    : " text-primary-darkGray"
                }`}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}
