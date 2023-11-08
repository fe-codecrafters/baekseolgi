import ArrowIcon from "@/icons/ArrowIcon";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { settedYear, settedMonth } from "@/redux/reducer/dateSlice";

export function CalendarHeader() {
  const dispatch = useDispatch();
  const dateState = useSelector((state: RootState) => state.date);

  const toPrevMonth = () => {
    if (dateState.month === 1) {
      dispatch(settedMonth({ month: 12 }));
      dispatch(settedYear({ year: dateState.year - 1 }));
    } else {
      dispatch(settedMonth({ month: dateState.month - 1 }));
    }
  };

  const toNextMonth = () => {
    if (dateState.month === 12) {
      dispatch(settedMonth({ month: 1 }));
      dispatch(settedYear({ year: dateState.year + 1 }));
    } else {
      dispatch(settedMonth({ month: dateState.month + 1 }));
    }
  };

  return (
    <div className="flex text-[24px] font-semibold md:text-[32px]">
      <button
        onClick={toPrevMonth}
        className="mr-[34px] fill-primary-gray active:fill-primary-black md:mr-[48px]"
      >
        <ArrowIcon direction="left" />
      </button>
      <div className="font-semibold">{`${dateState.year}년 ${dateState.month}월`}</div>
      <button
        onClick={toNextMonth}
        className="ml-[34px] fill-primary-gray active:fill-primary-black md:ml-[48px]"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}
