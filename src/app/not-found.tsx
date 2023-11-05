import Seolgi404 from "@/icons/Seolgi404";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center justify-center gap-[18px]">
      <div className="flex h-fit w-fit items-center gap-[8px] md:gap-[16px]">
        <span className="text-6xl md:text-8xl">4</span>
        <Seolgi404 className={"h-[50px] w-[50px] md:h-[100px] md:w-[100px]"} />
        <span className="text-6xl md:text-8xl">4</span>
      </div>
      <p className="text-center text-base md:text-4xl">
        페이지를 찾을 수 없어요
      </p>
    </div>
  );
}
