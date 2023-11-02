import Link from "next/link";

import CalendarIcon from "@/icons/TabBar/CalendarIcon";
import HomeIcon from "@/icons/TabBar/HomeIcon";
import FeedIcon from "@/icons/TabBar/FeedIcon";

/**
 * 페이지 전환을 위한 Tab Bar 컴포넌트
 *
 */
export default function TabBar() {
  return (
    <>
      <nav className="fixed bottom-0 z-40 mt-[68px] flex w-full flex-row border-t-[1px] border-primary-darkGray bg-primary-white py-1.5 md:hidden">
        <Link
          href="/calendar"
          className="group flex grow flex-col items-center justify-center"
        >
          <CalendarIcon></CalendarIcon>
          <span className="text-sm text-primary-darkGray group-active:text-primary-black md:text-base">
            캘린더
          </span>
        </Link>

        <Link
          href="/"
          className="group flex grow flex-col items-center justify-center"
        >
          <HomeIcon></HomeIcon>
          <span className="text-sm text-primary-darkGray group-active:text-primary-black md:text-base">
            홈
          </span>
        </Link>

        <Link
          href="/feed"
          className="group flex grow flex-col items-center justify-center"
        >
          <FeedIcon></FeedIcon>
          <span className="text-sm text-primary-darkGray group-active:text-primary-black md:text-base">
            피드
          </span>
        </Link>
      </nav>
    </>
  );
}
