import { initialDate } from "@/app/redux/reducer/dateSlice";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

// 달력에서 요일을 표시하는 컴포넌트 - 7개의 Day 컴포넌트를 묶어주는 역할
// 해당하는 달의 요일만 검은색으로 처리
export default function WeekHeader() {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const { year, month } = useSelector((state: RootState) => state.date);
  const isThisMonth = year === initialDate.year && month === initialDate.month;
  const toDay = new Date(year, month - 1, initialDate.date).getDay();

  return (
    <div className="mt-1 flex w-auto flex-row justify-start gap-[10px] md:gap-[16px]">
      {week.map((day, idx) => {
        return (
          <div
            key={day}
            className={`mb-[-6px] w-[40px] text-center text-[16px] md:w-[70px] md:text-[24px]
                ${
                  isThisMonth && idx === toDay
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
