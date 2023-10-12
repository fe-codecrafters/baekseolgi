import AttendanceEditIcon from '@/icons/AttendanceEditIcon';
import CloseIcon from '@/icons/CloseIcon';
import SeolgiIcon from '@/icons/SeolgiIcon';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const Modal = () => {

    const date = new Date();

    return (<div className="block flex w-600 min-h-full border-[1px] rounded-2xl flex-col justify-center px-6 py-6 lg:px-8">
    <div className="relative">
        <div className="flex items-center justify-center gap-3">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{format(date, "M", { locale: ko })}월 {format(date, "d", { locale: ko })}일 {format(date, "eee", { locale: ko })}요일</h2>
            <button><AttendanceEditIcon /></button>
        </div>
        <button className="absolute top-[6px] left-[520px]"><CloseIcon /></button>
    </div>
  
    <div className="mt-10">
      <form className="flex flex-col items-center space-y-6" action="#" method="POST">
        <div className="rounded-2xl bg-gray-100 w-[500px] h-[100px]">
          <label className="block mt-3 text-md text-center font-medium leading-6 text-gray-900">오늘 달성도는 어땠나요?</label>
          <div className="mt-2 flex justify-center gap-[28px]">
            <SeolgiIcon width={40} height={40} />
            <SeolgiIcon width={40} height={40} bgFill={"#FFE3E3"} blushFill={"#fff"} />
            <SeolgiIcon width={40} height={40} bgFill={"#D5FBF3"} blushFill={"#fff"} />
            <SeolgiIcon width={40} height={40} bgFill={"#FEF2DA"} blushFill={"#fff"} />
          </div>
        </div>
  
        <div className="rounded-2xl bg-gray-100 w-[500px] h-[100px]">
            <label className="block mt-3 text-md text-center font-medium leading-6 text-gray-900">오늘 달성도 짧은 일기</label>
            <div className="mt-2 flex justify-center">
                <input
                    id="description"
                    name="description" 
                    type="text"
                    required 
                    className="block w-[440px] h-[40px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-gray-300 sm:text-sm sm:leading-6" 
                />
            </div>
        </div>
  
        <div>
          <button type="submit" className="flex w-[100px] h-[30px] justify-center items-center rounded-2xl bg-gray-200 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-300">확인</button>
        </div>
      </form>
    </div>
  </div>)
}

export default Modal;