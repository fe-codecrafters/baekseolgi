import SeolgiIcon from "@/icons/SeolgiIcon";
import UserIcon from "@/icons/UserIcon";
import Link from "next/link";
//fixed bottom-0 bg-primary-white mt-[68px] flex w-full flex-row border-t-[1px] border-primary-darkGray py-1.5
export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary-darkGray bg-primary-white md:mb-[20px]">
      <div className="flex w-full justify-between px-[30px] py-[16px]">
        <SeolgiIcon width={30} height={30} bgFill="white" />
        <div className="flex h-[28px] w-[28px] items-center justify-center overflow-hidden rounded-full bg-primary-lightGray pt-[6px] md:hidden">
          <Link
            href="/my-page"
            className="group flex grow flex-col items-center justify-center"
          >
            <UserIcon width={18} height={18} />
          </Link>
        </div>
      </div>
      <nav className="hidden h-[64px] w-full border-t border-primary-darkGray md:flex md:items-center md:justify-center md:gap-[80px]">
        <Link href="/">홈</Link>
        <Link href="/calendar">캘린더</Link>
        <Link href="/feed">피드</Link>
      </nav>
    </header>
  );
};
