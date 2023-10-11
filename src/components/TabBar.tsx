import CalendarIcon from "@/icons/CalendarIcon";
import HomeIcon from "@/icons/HomeIcon";
import SeolgiIcon from "@/icons/SeolgiIcon";
import Link from 'next/link'

export default function TabBar() {
  return <>
    <div className="flex flex-row w-full py-1.5 border-t-[2px] border-primary-darkGray">
      <Link href="/calendar">
        <div className="flex grow flex-col justify-center items-center">
          <CalendarIcon></CalendarIcon>
          <span className="text-primary-darkGray">캘린더</span>
        </div>
      </Link>

      <Link href="/">
        <div className="flex grow flex-col justify-center items-center">
          <HomeIcon></HomeIcon>
          <span className="text-primary-darkGray">홈</span>
        </div>
      </Link>

      <Link href="/my-page">
        <div className="flex grow flex-col justify-center items-center">
          <SeolgiIcon></SeolgiIcon>
          <span className="text-primary-darkGray">펫</span>
        </div>
      </Link>
    </div>
  </>
}