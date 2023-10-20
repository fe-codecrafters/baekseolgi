import EditIcon from "@/icons/EditIcon";

export function Objective() {
  return (
    <div className="flex h-[80px] w-[340px] md:h-[120px] md:w-[600px] flex-col items-center rounded-[20px] border border-primary-gray text-[16px] md:text-[24px]">
      <div className="flex h-[48px] md:h-[68px] w-[100%] items-center justify-end pr-[36px]">
        <div className="mr-[110px] md:mr-[222px]">목표</div>
        <EditIcon />
      </div>
      <div>100설기 매일 들어오기</div>
    </div>
  );
}
