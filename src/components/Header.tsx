"use client";

import LogInIcon from "@/icons/LogInIcon";
import LogOutIcon from "@/icons/LogOutIcon";
import SeolgiHeaderIcon from "@/icons/SeolgiHeaderIcon";
import UserIcon from "@/icons/UserIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

// TODO : Warning: Expected server HTML to contain a matching <div> in <div>. 해결 필요
export const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const headerDefaultCN = `sticky top-0 z-40 mb-5 w-full border-b border-primary-darkGray bg-primary-white`;
  const headerCN =
    pathname === "/login" ? headerDefaultCN + " hidden" : headerDefaultCN;

  return (
    <header className={headerCN}>
      <div className="flex w-full items-center justify-between px-[30px] py-[16px]">
        <Link href="/">
          <SeolgiHeaderIcon />
        </Link>
        {status === "authenticated" ? (
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
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    width={24}
                    height={24}
                    alt="user profile"
                  />
                ) : (
                  <UserIcon />
                )}
              </Link>
            </div>
            <button onClick={() => signOut()}>
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
