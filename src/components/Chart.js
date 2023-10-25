"use client";

import { useEffect, useState } from "react";

export default function Chart() {
  //데이터가 이런 느낌으로 들어온다고 하자...
  const [monthDatas, setMonthDatas] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  useEffect(() => {
    fetch("api/attendance/stat/year/2023?userId=1&objectiveId=1")
      .then((res) => res.json())
      .then((json) => {
        setMonthDatas(json.data.counts);
      });
  }, []);

  // const monthDatas = [0, 5, 23, 30, 21, 25, 31, 28, 16, 17, 27, 14];
  const monthDatasToChartPoints = monthDatas
    .map((num, idx) => `${40 * idx},${136 - (num / 31) * 136}`)
    .reduce((acc, cur) => acc + " " + cur);
  console.log(monthDatasToChartPoints);

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <>
      <div className="w-[340px] text-left text-[16px] md:w-[600px] md:text-[24px]">
        월별 달성 분포
      </div>
      <div className="flex h-[200px] w-[340px] items-center justify-center rounded-[20px] border border-primary-gray md:h-[240px] md:w-[600px]">
        <div className="flex h-[136px] w-[276px] justify-between md:h-[164px] md:w-[456px]">
          {months.map((month) => (
            <div
              key={`month-${month}`}
              className="flex w-[16px] flex-col items-center"
            >
              <div className="h-[118px] w-[4px] rounded-full bg-primary-gray md:h-[142px]">
                <div className="mt-[-4px] h-[112px] md:h-[136px]">
                  <div
                    className="relative z-10 ml-[-2px] h-[8px] w-[8px] rounded-full border-[2px] border-primary-darkGray bg-primary-white md:ml-[-3px] md:h-[10px] md:w-[10px]"
                    style={{
                      bottom: `${(monthDatas[month - 1] / 31) * 100 - 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>{month}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative top-[-180px] h-[136px] w-[440px] scale-x-[0.59] scale-y-[0.82] md:top-[-200px] md:scale-100">
        <svg
          className="fill-none stroke-primary-darkGray stroke-[2px]"
          width="auto"
          height="auto"
        >
          <polyline points={monthDatasToChartPoints} />
        </svg>
      </div>
    </>
  );
}
