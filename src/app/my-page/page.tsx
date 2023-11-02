'use client'

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

export default function MyPage() {
  const date = new Date();
  const today = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    day: date.getDay(),
  };

  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col items-center gap-[24px] md:gap-[40px] py-[30px] md:py-[60px]">
      <div>
        <SeolgiFigure />
      </div>
      <div>
        <div className="text-[16px] md:text-[24px] mb-[16px]">내 정보</div>
        <div className="flex flex-col justify-center border rounded-[20px] w-[340px] md:w-[600px] h-[150px] md:h-[200px] px-[20px] md:px-[40px]">
          <div className="text-[14px] md:text-[20px] text-primary-darkGray">닉네임</div>
          <div className="text-[16px] md:text-[24px] flex items-center gap-[16px] mb-[20px]">설기#2546
            <EditIcon />
          </div>
          <div className="text-[14px] md:text-[20px] text-primary-darkGray">연결된 계정</div>
          <div className="text-[16px] md:text-[24px] flex items-center gap-[16px]">seolgi2566@gmail.com
            <EditIcon />
          </div>
        </div>
      </div>
      <div>
        <div className="text-[16px] md:text-[24px] mb-[16px]">내 기록</div>
        <div className="flex w-[340px] md:w-[600px] justify-between">
          <div className="border rounded-[20px] w-[110px] md:w-[182px] h-[100px] md:h-[146px] p-[12px] md:p-[16px]">
            <div className="text-[14px] md:text-[20px] text-primary-darkGray mb-[10px]">찍은 설기</div>
            <div className="text-[16px] md:text-[24px] flex gap-[12px] md:gap-[30px]">15개
              <SeolgiIconL />
            </div>
          </div>
          <div className="border rounded-[20px] w-[110px] md:w-[182px] h-[100px] md:h-[146px] p-[16px]">
            <div className="text-[14px] md:text-[20px] text-primary-darkGray mb-[10px]">완료한 목표</div>
            <div className="text-[16px] md:text-[24px]">0개</div>
          </div>
          <div className="border rounded-[20px] w-[110px] md:w-[182px] h-[100px] md:h-[146px] p-[16px]">
            <div className="text-[14px] md:text-[20px] text-primary-darkGray mb-[10px]">모은 포인트</div>
            <div className="text-[16px] md:text-[24px]">100,000</div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-[16px] md:text-[24px] mb-[16px]">{selectedMonth}월 달성 분포</div>
        <div className="flex flex-col justify-center border rounded-[20px] w-[340px] md:w-[600px] h-[120px] md:h-[140px]">
          <MonthlyProgressBar />
        </div>
      </div>
      <Chart />
      <div className="w-[340px] md:w-[700px] border"></div>
      <div className="pb-[50px]">
        <div className="text-[16px] md:text-[24px] mb-[16px]">고객 센터</div>
        <button className="flex items-center gap-[10px] md:gap-[18px] border rounded-[20px] w-[340px] md:w-[600px] h-[45px] md:h-[60px] px-[40px] mb-[16px]">
          <FeedbackIcon />
          <div className="text-[16px] md:text-[24px] flex items-center">피드백 보내기</div>
        </button>
        <button className="flex items-center gap-[10px] md:gap-[18px] border rounded-[20px] w-[340px] md:w-[600px] h-[45px] md:h-[60px] px-[40px] mb-[16px]">
          <DonaSeolgiIcon />
          <div className="text-[16px] md:text-[24px] flex items-center">개발자에게 응원 보내기</div>
        </button>
        <button className="flex items-center gap-[10px] md:gap-[18px] border rounded-[20px] w-[340px] md:w-[600px] h-[45px] md:h-[60px] px-[40px] mb-[50px] md:mb-[30px]">
          <DevBlogIcon />
          <div className="text-[16px] md:text-[24px] flex items-center">릴리즈 노트 / 기술 블로그</div>
        </button>
      </div>
    </div>
  );
}
