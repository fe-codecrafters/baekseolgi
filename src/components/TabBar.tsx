import Link from 'next/link'

import CalendarIcon from "@/icons/TabBar/CalendarIcon";
import HomeIcon from "@/icons/TabBar/HomeIcon";
import SeolgiTabBarIcon from "@/icons/TabBar/SeolgiTabBarIcon";
import { IconType } from "@/types";

interface Props {
  type: IconType;
}

/**
 * 페이지 전환을 위한 Tab Bar 컴포넌트
 * @param {IconType} type 'desktop' | 'mobile'
 * 
 */
export default function TabBar({ type = 'desktop' }: Props) {
  const desktopTextCN = "text-base text-primary-darkGray group-hover:text-primary-black"
  const mobileTextCN = "text-sm text-primary-darkGray group-hover:text-primary-black"
  const textCN = type === 'desktop' ? desktopTextCN : mobileTextCN

  return <>
    <div className="flex flex-row w-full py-1.5 border-t-[1px] border-primary-darkGray mt-[68px]">
      <Link href="/calendar" className="group flex grow flex-col justify-center items-center">
        <CalendarIcon type={type}></CalendarIcon>
        <span className={textCN}>캘린더</span>
      </Link>

      <Link href="/" className="group flex grow flex-col justify-center items-center">
        <HomeIcon type={type}></HomeIcon>
        <span className={textCN}>홈</span>
      </Link>

      <Link href="/my-page" className="group flex grow flex-col justify-center items-center">
        <SeolgiTabBarIcon type={type}></SeolgiTabBarIcon>
        <span className={textCN}>펫</span>
      </Link>
    </div>
  </>
}