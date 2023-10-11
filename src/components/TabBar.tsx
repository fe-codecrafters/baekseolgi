import CalendarIcon from "@/icons/CalendarIcon";
import HomeIcon from "@/icons/HomeIcon";
import SeolgiIcon from "@/icons/SeolgiIcon";

export default function TabBar() {
  return <>
    <div className="flex flex-row w-full py-1.5 border-t-[2px] border-primary-darkGray">
      <div className="flex grow flex-col justify-center items-center">
        <CalendarIcon></CalendarIcon>
        <span className="text-primary-darkGray">캘린더</span>
      </div>

      <div className="flex grow flex-col justify-center items-center">
        <HomeIcon></HomeIcon>
        <span className="text-primary-darkGray">홈</span>
      </div>

      <div className="flex grow flex-col justify-center items-center">
        <SeolgiIcon></SeolgiIcon>
        <span className="text-primary-darkGray">펫</span>
      </div>
    </div>
  </>
}