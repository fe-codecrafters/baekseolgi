"use client";

import LogInIcon from "@/icons/LogInIcon";
import LogOutIcon from "@/icons/LogOutIcon";
import SeolgiHeaderIcon from "@/icons/SeolgiHeaderIcon";
import UserIcon from "@/icons/UserIcon";
import { settedUser } from "@/redux/reducer/userSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

export const Header = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const { userId } = useSelector((state: RootState) => state.user);

  //redux의 userId를 null로 비우고 login 페이지로 redirect
  const handleGoLogin = () => {
    dispatch(settedUser({ userId: null }));
    localStorage.removeItem("reduxState");
    router.push("/login");
  };

  return (
    <header
      className={`sticky top-0 z-40 mb-5 w-full border-b border-primary-darkGray bg-primary-white ${
        pathname === "/login" && "hidden"
      }`}
    >
      <div className="flex w-full items-center justify-between px-[30px] py-[16px]">
        <Link href="/">
          <SeolgiHeaderIcon />
        </Link>
        {userId !== null ? (
          <div className="flex items-end gap-[10px]">
            <div
              className={`flex h-[24px] w-[24px] items-center justify-center overflow-hidden rounded-full bg-primary-lightGray pt-[4px]`}
            >
              <Link
                href="/my-page"
                className={`group flex grow flex-col items-center justify-center ${
                  pathname === "/my-page" ? "stroke-primary-darkGray" : ""
                }`}
              >
                <UserIcon />
              </Link>
            </div>
            <button onClick={handleGoLogin}>
              <LogOutIcon />
            </button>
          </div>
        ) : (
          <div className={`flex items-center justify-center overflow-hidden`}>
            <Link href="/login">
              <LogInIcon />
            </Link>
          </div>
        )}
      </div>
      {/* 모바일에서는 display: hidden, 데스크탑에서는 display:flex */}
      <nav className="hidden h-[64px] w-full border-t border-primary-darkGray md:flex md:items-center md:justify-center md:gap-[80px]">
        <Link
          href="/"
          className={`${pathname === "/" ? "font-extrabold" : ""}`}
        >
          홈
        </Link>
        <Link
          href="/calendar"
          className={`${pathname === "/calendar" ? "font-extrabold" : ""}`}
        >
          캘린더
        </Link>
        <Link
          href="/feed"
          className={`${pathname === "/feed" ? "font-extrabold" : ""}`}
        >
          피드
        </Link>
      </nav>
    </header>
  );
};
