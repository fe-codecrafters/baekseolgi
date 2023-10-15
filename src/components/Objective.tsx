import AttendanceEditIcon from "@/icons/AttendanceEditIcon";

export function Objective () {
    return (
        <div className='flex flex-col items-center w-[600px] h-[120px] my-[40px] text-[24px] rounded-[20px] border border-primary-gray'>
            <div className="flex justify-end items-center w-[100%] h-[68px] pr-[36px]">
                <div className="mr-[222px]">목표</div>
                <AttendanceEditIcon />
            </div>
            <div>100설기 매일 들어오기</div>
        </div>
    )
}