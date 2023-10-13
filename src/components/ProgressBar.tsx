export const ProgressBar = ({data}) => {
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
        colors = data.filter(el => typeof el === 'object').map(el => el.stamp.color).sort()
        for (let i = 0; i < data.length - colors.length; i++) {
            colors.push('transparent')
        }
    }

    return (
        <div className="overflow-hidden	flex rounded-full w-[100%] h-[28px] bg-primary-gray m-[24px]">
            {data? colors.map((color, idx) => <div key={idx} className={bgColors[color] + ' grow'}></div>) : null}
        </div>
    )
}