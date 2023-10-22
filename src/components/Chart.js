export default function Chart () {
    //데이터가 이런 느낌으로 들어온다고 하자...
    const monthDatas = [0, 5, 23, 30, 21, 25, 31, 28, 16, 17, 27, 14]
    const monthDatasToChartPoints = monthDatas.map((num, idx) => `${40 * idx},${136 - (num / 31) * 136}`).reduce((acc,cur) => acc + ' ' + cur)
    console.log(monthDatasToChartPoints)

    const months = [1,2,3,4,5,6,7,8,9,10,11,12]
    return (
        <>
            <div className="w-[340px] text-[16px] md:w-[600px] md:text-[24px] text-left">월별 달성 분포</div>
            <div className="w-[340px] h-[200px] flex justify-center items-center md:w-[600px] md:h-[240px] rounded-[20px] border border-primary-gray">
                <div className="w-[276px] h-[136px] md:w-[456px] md:h-[164px] flex justify-between">
                    {months.map(month => (
                        <div key={`month-${month}`} className="flex flex-col items-center w-[16px]">
                            <div className="w-[4px] h-[118px] md:h-[142px] bg-primary-gray rounded-full">
                                <div className="h-[112px] md:h-[136px] mt-[-4px]">
                                <div className="relative z-10 bg-primary-white h-[8px] w-[8px] md:h-[10px] md:w-[10px] border-primary-darkGray border-[2px] rounded-full ml-[-2px] md:ml-[-3px]" style={{bottom: `${monthDatas[month-1]/31 * 100 - 100}%`}} ></div>
                                </div>
                            </div>
                            <div>{month}</div>
                        </div>
                    ))}
            </div>
            </div>
            <div className="scale-x-[0.59] scale-y-[0.82] md:scale-100 w-[440px] h-[136px] relative top-[-180px] md:top-[-200px]">
                <svg className='fill-none stroke-primary-darkGray stroke-[2px]' width='auto' height='auto'>
                    <polyline points={monthDatasToChartPoints} />
                </svg> 
            </div>
        </>

    )
}