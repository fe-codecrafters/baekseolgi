import ArrowIcon from "@/icons/ArrowIcon";

export function CalendarHeader({
  toPrevMonth,
  toNextMonth,
  selectedYear,
  selectedMonth,
}) {
  return (
    <div className="flex text-[24px] md:text-[32px] font-semibold">
      <button
        onClick={toPrevMonth}
        className="mr-[34px] md:mr-[48px] fill-primary-gray active:fill-primary-black"
      >
        <ArrowIcon direction="left" />
      </button>
      <div className="font-semibold">{`${selectedYear}년 ${selectedMonth}월`}</div>
      <button
        onClick={toNextMonth}
        className="ml-[34px] md:ml-[48px] fill-primary-gray active:fill-primary-black"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}
