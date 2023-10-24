import SeolgiIcon from "@/icons/SeolgiIcon";
import UserIcon from "@/icons/UserIcon";
//fixed bottom-0 bg-primary-white mt-[68px] flex w-full flex-row border-t-[1px] border-primary-darkGray py-1.5
export const Header = () => {
  return (
    <header className="z-40 sticky top-0  bg-primary-white md:mb-[20px] flex w-full justify-between border-b border-primary-darkGray px-[30px] py-[16px]">
      <SeolgiIcon width={30} height={30} bgFill="white" />
      <div className="flex md:hidden h-[28px] w-[28px] items-center justify-center overflow-hidden rounded-full bg-primary-lightGray pt-[6px]">
        <UserIcon width={18} height={18} />
      </div>
    </header>
  );
};
