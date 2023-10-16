import EditIcon from "@/icons/EditIcon";

export function Objective() {
  return (
    <div className="my-[40px] flex h-[120px] w-[600px] flex-col items-center rounded-[20px] border border-primary-gray text-[24px]">
      <div className="flex h-[68px] w-[100%] items-center justify-end pr-[36px]">
        <div className="mr-[222px]">목표</div>
        <EditIcon />
      </div>
      <div>100설기 매일 들어오기</div>
    </div>
  );
}
