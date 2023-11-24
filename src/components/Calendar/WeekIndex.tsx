import SeolgiHeaderIcon from "@/icons/SeolgiHeaderIcon";

interface WeekIndexProps {
  found: number;
}

// 달력에서 한 주를 표시하는 컴포넌트 - 7개의 Day 컴포넌트를 묶어주는 역할
export default function WeekIndex({ found }: WeekIndexProps) {
  return (
    <div className="mt-4 flex items-center justify-end gap-[12px] md:gap-[14px]">
      <SeolgiHeaderIcon />{" "}
      <span className="text-xs md:text-sm">{`${found + 1}번째 주`}</span>
    </div>
  );
}
