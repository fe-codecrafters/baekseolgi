import SeolgiIcon from "@/icons/SeolgiIcon"

export const ObjectiveProgressBar = ({count}) => {
    const countArr = Array(count).fill(0)
    return (
        <div className='w-[586px]'>
            <div className='flex justify-end mr-[20px] items-center'>
                <div className='mr-[20px] text-[24px]'>현재까지 {count} / 100 설기</div>
                <SeolgiIcon width={30} height={30} />
            </div>
            <div className='flex overflow-hidden w-[100%] h-[28px] rounded-full bg-primary-gray mt-[10px]'>
                {countArr.map((el, idx) => <div key={idx} className="bg-seolgi-pink h-[100%] w-[1%]"></div>)}
            </div>
        </div>
    )
}