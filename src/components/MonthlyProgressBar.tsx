import SeolgiIcon from "@/icons/SeolgiIcon";
import { attendanceKeys } from "@/features/attendance/key";
import { useMonthlyAttendances } from "@/features/attendance/api/getAttendances";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const MonthlyProgressBar = () => {
  const bgColors = {
    1: "bg-seolgi-default",
    2: "bg-seolgi-blue",
    3: "bg-seolgi-pink",
    blank: "bg-primary-gray",
  };

  const dateState = useSelector((state: RootState) => state.date);

  const RQKey = attendanceKeys.month({
    year: dateState.year,
    month: dateState.month,
    // TODO: userId, objectiveId도 데이터 확인할 수 있어야
    userId: 1,
    objectiveId: 1,
  });

  const { isLoading, data, isSuccess } = useMonthlyAttendances(RQKey);

  type monthDataType = { dayCount: number, 1?: number, 2?: number, 3?: number }
  const monthData:monthDataType = { dayCount : new Date(dateState.year, dateState.month, 0).getDate() }
  data?.attendance.forEach(el => monthData[el.seolgiId] ? monthData[el.seolgiId] += 1 : monthData[el.seolgiId] = 1)

  const colors = [];
  if (monthData) {
    let seolgiCount = 0;
    for (const key in monthData) {
      seolgiCount += Number(key);
      for (let i = 0; i < monthData[key]; i++) colors.push(key);
    }
    for (let i = 0; i < monthData.dayCount - seolgiCount; i++) {
      colors.push("transparent");
    }
  }

  const colorSet = [...new Set(colors)].slice(0, -1);
  while (colorSet.length < 4) {
    colorSet.push("blank");
  }

  return (
    <>
      <div className="mx-[24px] mb-[24px] flex h-[24px] w-[280px] overflow-hidden rounded-full bg-primary-gray md:h-[28px] md:w-[540px]">
        {data
          ? colors.map((color, idx) => (
              <div key={idx} className={bgColors[color] + " grow"}></div>
            ))
          : null}
      </div>
      <div className="mx-auto flex w-[228px] justify-around md:w-[340px]">
        {colorSet.map((color, idx) => (
          <div
            className={
              bgColors[color] + " w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
            }
            key={"MPB-" + color + idx}
          >
            <SeolgiIcon bgFill="transparent" />
          </div>
        ))}
      </div>
    </>
  );
};
