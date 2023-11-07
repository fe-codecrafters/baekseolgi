import EditIcon from "@/icons/EditIcon";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export function Objective() {
  const dataState = useSelector((state: RootState) => state.data);
  return (
    <div className="flex h-[80px] w-[340px] flex-col items-center rounded-[20px] border border-primary-gray text-[16px] md:h-[120px] md:w-[600px] md:text-[24px]">
      <div className="flex h-[48px] w-[100%] items-center justify-end pr-[36px] md:h-[68px]">
        <div className="mr-[110px] md:mr-[222px]">목표</div>
        <EditIcon />
      </div>
      <div>{dataState.objective}</div>
    </div>
  );
}
