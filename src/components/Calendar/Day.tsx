import SeolgiIcon from "@/icons/SeolgiIcon";
import { initialDate, settedDate } from "@/redux/reducer/dateSlice";
import { openModal } from "@/redux/reducer/modalSlice";
import { RootState } from "@/redux/store";
import { AttendanceWithSeolgi } from "@/types/dto";
import { dateNum, getDayLabel, isAttendance } from "@/util/dayHelper";
import { useSelector, useDispatch } from "react-redux";

interface DayProps {
  day: number | AttendanceWithSeolgi;
}

// 달력에서 각 날짜를 표시하는 컴포넌트
// props-day는 일, 월 혹은 12, 13 같이 요일이나 날짜 정보가 들어옴
// props-type은 day로 들어온 정보가 무엇인지 표시. day라면 요일을, date라면 날짜를 표시
export default function Day({ day }: DayProps) {
  const dispatch = useDispatch();
  const { year, month } = useSelector((state: RootState) => state.date);
  const isThisMonth = year === initialDate.year && month === initialDate.month;

  const openModalHandler = () => {
    dispatch(openModal());
    dispatch(settedDate({ date: day }));
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`mb-[6px] h-[20px] w-[40px] text-center text-[14px] md:w-[70px] md:text-[16px]${
          isThisMonth && dateNum(day) === initialDate.date
            ? " font-medium text-black"
            : " text-primary-darkGray"
        }`}
      >
        {getDayLabel(day)}
      </div>
      <button
        className={`h-[40px] w-[100%] rounded-[10px] bg-primary-gray md:h-[70px]`}
        onClick={openModalHandler}
        disabled={!getDayLabel(day)}
      >
        {isAttendance(day) ? (
          <SeolgiIcon
            bgFill={day.Seolgi.bgFill || undefined}
            blushFill={day.Seolgi.blushFill || undefined}
          ></SeolgiIcon>
        ) : (
          ""
        )}
      </button>
    </div>
  );
}
