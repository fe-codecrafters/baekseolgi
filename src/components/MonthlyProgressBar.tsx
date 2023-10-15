import SeolgiIcon from "@/icons/SeolgiIcon"

export const MonthlyProgressBar = ({data}) => {
    let colors
    const bgColors = {
        white: 'bg-seolgi-default',
        yellow: 'bg-seolgi-yellow',
        green: 'bg-seolgi-green',
        pink: 'bg-seolgi-pink',
        transparent: 'bg-[transparent]'
    }
    
    if (data) {
        data = data.filter(el => el !== 0)
        colors = data.filter(el => typeof el === 'object').map(el => el.Seolgi.color).sort()
        for (let i = 0; i < data.length - colors.length; i++) {
            colors.push('transparent')
        }
    }

    const colorSet = [...new Set(colors)].slice(0,-1)

    return (
        <>
            <div className="overflow-hidden	flex rounded-full w-[540px] h-[28px] bg-primary-gray m-[24px]">
                {data? colors.map((color, idx) => <div key={idx} className={bgColors[color] + ' grow'}></div>) : null}
            </div>
            <div className="flex justify-around w-[340px]">
                {colorSet.map(color => <div className={bgColors[color] + ' w-[40px] h-[40px]'}><SeolgiIcon width={40} height={40} bgFill="transparent" /></div>)}
            </div>
        </>
    )
}