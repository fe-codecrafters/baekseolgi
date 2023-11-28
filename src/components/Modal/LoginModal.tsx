"use client";
import LoginLogo from "@/icons/LoginLogo";
import Google from "@/icons/SocialLogo/Google";
import Kakao from "@/icons/SocialLogo/Kakao";
import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import { signIn, signOut } from "next-auth/react";

const DEV = process.env.NODE_ENV === "development";

export default function LoginModal() {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleIdChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserId(e.target.value);
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const handleKakaoSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    signIn("kakao", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  const handleGuestClick: MouseEventHandler = async (e) => {
    e.preventDefault();
    signIn("credentials", {
      username: "testUser",
      password: "testPassword",
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-fit flex-col items-center justify-center gap-7 rounded-xl border-[1px] p-8 md:gap-9">
        <LoginLogo />
        {DEV && (
          <div className="flex flex-col items-center space-y-3 md:space-y-4">
            <form className="space-y-3 md:space-y-4">
              <input
                id="username"
                name="username"
                type="text"
                placeholder="username"
                value={userId}
                onChange={handleIdChange}
                required
                className="block h-[35px] w-[300px] rounded-md p-5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-gray-300 md:h-[40px] md:w-[350px] md:text-base"
              />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="block h-[35px] w-[300px] rounded-md p-5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-gray-300 md:h-[40px] md:w-[350px] md:text-base"
              />
              <button
                type="submit"
                className="flex h-[35px] w-[300px] items-center justify-center rounded-md bg-primary-darkGray p-5 text-sm leading-6 text-white shadow-sm focus:bg-gray-600 focus:outline-none md:h-[40px] md:w-[350px] md:text-base"
              >
                로그인
              </button>
            </form>
            <div className="text-xs text-primary-darkGray md:text-sm">
              <span>회원가입</span> | <span>정보찾기</span>
            </div>
          </div>
        )}
        <button
          type="button"
          name="guest-submit"
          onClick={handleGuestClick}
          className="flex h-[35px] w-[300px] items-center rounded-md border-[1px] px-6 text-sm focus:bg-slate-50 md:h-[40px] md:w-[350px] md:text-base"
        >
          <span className="flex-1">구경하기</span>
        </button>
        <div className="w-full border-b border-gray-300 text-center text-sm leading-[0.1em]">
          <span className="bg-primary-white px-3 text-primary-darkGray">
            또는
          </span>
        </div>
        <div className="text-sm text-primary-darkGray">
          SNS 계정으로 로그인 하기
        </div>
        {DEV && (
          <button
            type="button"
            name="guest-submit"
            onClick={handleGuestClick}
            className="flex h-[35px] w-[300px] items-center rounded-md border-[1px] px-6 text-sm focus:bg-slate-50 md:h-[40px] md:w-[350px] md:text-base"
          >
            <span className="flex-1">구경하기</span>
          </button>
        )}
        <form className="flex flex-col space-y-4" onSubmit={handleKakaoSubmit}>
          <button
            type="submit"
            name="kakao-submit"
            className="flex h-[35px] w-[300px] items-center rounded-md bg-amber-300 px-6 text-sm focus:bg-amber-400 md:h-[40px] md:w-[350px] md:text-base"
          >
            <Kakao />
            <span className="flex-1">카카오 로그인</span>
          </button>

          {DEV && (
            <button
              type="button"
              name="google-submit"
              className="flex h-[35px] w-[300px] items-center rounded-md border-[1px] px-6 text-sm focus:bg-slate-50 md:h-[40px] md:w-[350px] md:text-base"
            >
              <Google />
              <span className="flex-1">Google 로그인</span>
            </button>
          )}

          {DEV && (
            <button
              type="button"
              name="guest-submit"
              onClick={() => {
                console.log("signOut Client");
                signOut();
              }}
            >
              sign out
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
