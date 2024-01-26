"use client";

import Chart from "@/components/Chart";
import { MonthlyProgressBar } from "@/components/MonthlyProgressBar";
import SeolgiIconL from "@/icons/AttendanceInput/SeolgiIconL";
import DevBlogIcon from "@/icons/DevBlogIcon";
import DonaSeolgiIcon from "@/icons/DonaSeolgiIcon";
import EditIcon from "@/icons/EditIcon";
import FeedbackIcon from "@/icons/FeedbackIcon";
import SeolgiFigure from "@/icons/SeolgiFigure";
import { useState } from "react";
const DEV = process.env.NODE_ENV === "development";
import { useSession } from "next-auth/react";
import MyPageInput from "@/components/MyPage/MyPageInput";
import { useUpdateUser } from "@/features/user/api/updateUser";
import { userKeys } from "@/features/user/key";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

export default function MyPage() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    return redirect("/404");
  }

  const date = new Date();
  const today = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    day: date.getDay(),
  };

  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);

  const RQKey = userKeys.id({
    id: Number(session?.user.id),
  });

  const { data, isSuccess, mutate } = useUpdateUser(RQKey);

  const editNickname = ({ id, username }: User) => {
    mutate({ data: { id, username } });
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col items-center gap-[24px] py-[30px] md:gap-[40px] md:py-[60px]">
      <div>
        <SeolgiFigure />
      </div>
      <div>
        <div className="mb-[16px] text-[16px] md:text-[24px]">내 정보</div>
        <div className="flex w-[340px] flex-col justify-center rounded-[20px] border px-[20px] md:w-[600px] md:px-[40px]">
          <MyPageInput
            label="닉네임"
            id="MyPageNicknameInput"
            name="MyPageNicknameInput"
            placeholder="변경할 닉네임을 적고 오른쪽 변경 아이콘을 누르세요."
            required={true}
            userId={session?.user.id}
            value={session?.user.name}
            editNickname={editNickname}
          ></MyPageInput>
          <div className="text-[14px] text-primary-darkGray md:text-[20px]">
            닉네임
          </div>
          <div className="mb-[20px] flex items-center gap-[16px] text-[16px] md:text-[24px]">
            {status === "authenticated" ? session.user.name : "null"}
            <EditIcon />
          </div>
          <div className="text-[14px] text-primary-darkGray md:text-[20px]">
            연결된 계정
          </div>
          <div className="flex items-center gap-[16px] text-[16px] md:text-[24px]">
            {status === "authenticated" ? session.user.email : "null"}
            <EditIcon />
          </div>
        </div>
      </div>
      <div>
        <div className="mb-[16px] text-[16px] md:text-[24px]">내 기록</div>
        <div className="flex w-[340px] justify-between md:w-[600px]">
          <div className="h-[100px] w-[110px] rounded-[20px] border p-[12px] md:h-[146px] md:w-[182px] md:p-[16px]">
            <div className="mb-[10px] text-[14px] text-primary-darkGray md:text-[20px]">
              찍은 설기
            </div>
            <div className="flex gap-[12px] text-[16px] md:gap-[30px] md:text-[24px]">
              15개
              <SeolgiIconL />
            </div>
          </div>
          <div className="h-[100px] w-[110px] rounded-[20px] border p-[16px] md:h-[146px] md:w-[182px]">
            <div className="mb-[10px] text-[14px] text-primary-darkGray md:text-[20px]">
              완료한 목표
            </div>
            <div className="text-[16px] md:text-[24px]">0개</div>
          </div>
          <div className="h-[100px] w-[110px] rounded-[20px] border p-[16px] md:h-[146px] md:w-[182px]">
            <div className="mb-[10px] text-[14px] text-primary-darkGray md:text-[20px]">
              모은 포인트
            </div>
            <div className="text-[16px] md:text-[24px]">100,000</div>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-[16px] text-[16px] md:text-[24px]">
          {selectedMonth}월 달성 분포
        </div>
        <div className="flex h-[120px] w-[340px] flex-col justify-center rounded-[20px] border md:h-[140px] md:w-[600px]">
          <MonthlyProgressBar />
        </div>
      </div>
      <Chart />
      <div className="w-[340px] border md:w-[700px]"></div>
      <div className="pb-[50px]">
        <div className="mb-[16px] text-[16px] md:text-[24px]">고객 센터</div>
        <button className="mb-[16px] flex h-[45px] w-[340px] items-center gap-[10px] rounded-[20px] border px-[40px] md:h-[60px] md:w-[600px] md:gap-[18px]">
          <FeedbackIcon />
          <div className="flex items-center text-[16px] md:text-[24px]">
            피드백 보내기
          </div>
        </button>
        <button className="mb-[16px] flex h-[45px] w-[340px] items-center gap-[10px] rounded-[20px] border px-[40px] md:h-[60px] md:w-[600px] md:gap-[18px]">
          <DonaSeolgiIcon />
          <div className="flex items-center text-[16px] md:text-[24px]">
            개발자에게 응원 보내기
          </div>
        </button>
        <button className="mb-[50px] flex h-[45px] w-[340px] items-center gap-[10px] rounded-[20px] border px-[40px] md:mb-[30px] md:h-[60px] md:w-[600px] md:gap-[18px]">
          <DevBlogIcon />
          <div className="flex items-center text-[16px] md:text-[24px]">
            릴리즈 노트 / 기술 블로그
          </div>
        </button>
      </div>
    </div>
  );
}
