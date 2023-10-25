import ArrowIcon from "@/icons/ArrowIcon";

export function CalendarHeader({
  toPrevMonth,
  toNextMonth,
  selectedYear,
  selectedMonth,
}) {
  return (
    <div className="flex text-[24px] font-semibold md:text-[32px]">
      <button
        onClick={toPrevMonth}
        className="mr-[34px] fill-primary-gray active:fill-primary-black md:mr-[48px]"
      >
        <ArrowIcon direction="left" />
      </button>
      <div className="font-semibold">{`${selectedYear}년 ${selectedMonth}월`}</div>
      <button
        onClick={toNextMonth}
        className="ml-[34px] fill-primary-gray active:fill-primary-black md:ml-[48px]"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}
