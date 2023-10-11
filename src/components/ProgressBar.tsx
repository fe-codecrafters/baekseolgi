export const ProgressBar = ({data}) => {
    return (
        <div className="overflow-hidden	flex rounded-full w-10/12 h-10 bg-neutral-300 m-8">
            {/* 데이터가 어떻게 들어올지에 보고 로직을 짜야할듯.. */}
            <div className="bg-rose-200 w-3/12"></div>
            <div className="bg-green-200 w-2/12"></div>
            <div className="bg-yellow-100 w-1/12"></div>
            <div className="bg-neutral-50 w-4/12"></div>
        </div>
    )
}