import SeolgiIcon from "@/icons/SeolgiIcon";

export default function LoadingIndicator () {
    return (
        <div className="w-[340px] md:w-[600px] flex flex-col items-center gap-[15px] md:gap-[20px] py-[10px]">
            <div className="flex justify-between w-[150px] md:w-[220px] pt-[30px] md:pt-[40px]">
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] animate-[seolgiJump_1s_ease-in-out_infinite]">
                    <SeolgiIcon width={'auto'} height={'auto'}/>
                </div>
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] animate-[seolgiJump_1s_0.2s_ease-in-out_infinite]">
                    <SeolgiIcon width={'auto'} height={'auto'}/>
                </div>
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] animate-[seolgiJump_1s_0.4s_ease-in-out_infinite]">
                    <SeolgiIcon width={'auto'} height={'auto'}/>
                </div>
            </div>
            <div className="w-full h-[20px] md:h-[30px] bg-primary-gray rounded-full p-[3px] md:p-[5px]">
                <div className="w-full h-full bg-seolgi-pink rounded-full animate-loadingIndicatorBar"></div>
            </div>
        </div>
    )
}