import Link from "next/link";

export const TutorialButton = () => (
  <Link href={"/tutorial"}>
    <button className="flex w-[300px] flex-col items-center rounded-md border-[1px] px-6 py-10 text-sm focus:bg-slate-50 md:my-14 md:w-[350px] md:text-base">
      <div>아직 목표를 설정하지 않으셨어요.</div>
      <div>목표를 새롭게 설정하세요!</div>
    </button>
  </Link>
);
