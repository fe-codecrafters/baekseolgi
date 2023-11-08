import SeolgiIcon from "@/icons/SeolgiIcon";

export default function LoadingIndicator() {
  return (
    <div className="flex h-full w-[340px] flex-col items-center justify-center gap-[15px] pb-[250px] md:w-[600px] md:gap-[20px]">
      <div className="flex w-[150px] justify-between pt-[30px] md:w-[220px] md:pt-[40px]">
        <div className="h-[30px] w-[30px] animate-[seolgiJump_1s_ease-in-out_infinite] md:h-[40px] md:w-[40px]">
          <SeolgiIcon width={"auto"} height={"auto"} />
        </div>
        <div className="h-[30px] w-[30px] animate-[seolgiJump_1s_0.2s_ease-in-out_infinite] md:h-[40px] md:w-[40px]">
          <SeolgiIcon width={"auto"} height={"auto"} />
        </div>
        <div className="h-[30px] w-[30px] animate-[seolgiJump_1s_0.4s_ease-in-out_infinite] md:h-[40px] md:w-[40px]">
          <SeolgiIcon width={"auto"} height={"auto"} />
        </div>
      </div>
      <div className="h-[20px] w-full rounded-full bg-primary-gray p-[3px] md:h-[30px] md:p-[5px]">
        <div className="h-full w-full animate-loadingIndicatorBar rounded-full bg-seolgi-pink"></div>
      </div>
    </div>
  );
}
