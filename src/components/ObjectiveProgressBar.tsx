import SeolgiIcon from "@/icons/SeolgiIcon";

export const ObjectiveProgressBar = ({ count }) => {
  const countArr = Array(count).fill(0);
  return (
    <div className="w-[586px]">
      <div className="mr-[20px] flex items-center justify-end">
        <div className="mr-[20px] text-[24px]">현재까지 {count} / 100 설기</div>
        <SeolgiIcon width={30} height={30} />
      </div>
      <div className="mt-[10px] flex h-[28px] w-[100%] overflow-hidden rounded-full bg-primary-gray">
        {countArr.map((el, idx) => (
          <div key={idx} className="h-[100%] w-[1%] bg-seolgi-pink"></div>
        ))}
      </div>
    </div>
  );
};
