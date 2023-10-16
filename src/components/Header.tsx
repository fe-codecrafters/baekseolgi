import SeolgiIcon from "@/icons/SeolgiIcon";
import UserIcon from "@/icons/UserIcon";

export const Header = () => {
  return (
    <header className="mb-[60px] flex w-[100%] justify-between border-b border-primary-darkGray px-[30px] py-[16px]">
      <SeolgiIcon width={30} height={30} bgFill="white" />
      <div className="flex h-[28px] w-[28px] items-center justify-center overflow-hidden rounded-full bg-primary-lightGray pt-[6px]">
        <UserIcon width={18} height={18} />
      </div>
    </header>
  );
};
