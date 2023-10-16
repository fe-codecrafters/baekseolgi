import SeolgiIcon from "@/icons/SeolgiIcon"
import UserIcon from "@/icons/UserIcon"

export const Header = () => {
    return (
        <header className="flex justify-between w-[100%] border-b border-primary-darkGray px-[30px] py-[16px] mb-[60px]">
            <SeolgiIcon width={30} height={30} bgFill='white' />
            <div className="flex justify-center items-center overflow-hidden w-[28px] h-[28px] pt-[6px] bg-primary-lightGray rounded-full">
                <UserIcon width={18} height={18}/>
            </div>
        </header>
    )
}