import EditIcon from "@/icons/EditIcon";
import CloseIcon from "@/icons/CloseIcon";
import SeolgiIcon from "@/icons/SeolgiIcon";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const Modal = () => {
  const date = new Date();

  return (
    <>
      {/* modal background */}
      <div className="fixed inset-0 z-[999] bg-slate-800 opacity-50"></div>
      {/* modal center fix */}
      <div className="fixed left-[50%] top-[50%] z-[999] translate-x-[-50%] translate-y-[-50%]">
        {/* modal content */}
        <div className="w-[600px] rounded-2xl border-[1px] bg-primary-white p-6 lg:px-8">
          <div className="relative">
            <div className="flex items-center justify-center gap-3">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-primary-black">
                {format(date, "M", { locale: ko })}월{" "}
                {format(date, "d", { locale: ko })}일{" "}
                {format(date, "eee", { locale: ko })}요일
              </h2>
              <button>
                <EditIcon />
              </button>
            </div>
            <button className="absolute left-[520px] top-[6px]">
              <CloseIcon />
            </button>
          </div>

          <div className="mt-10">
            <form
              className="flex flex-col items-center space-y-6"
              action="#"
              method="POST"
            >
              <div className="h-[100px] w-[500px] rounded-2xl bg-primary-lightGray">
                <label
                  htmlFor="seolgi-modal"
                  className="mt-3 block text-center text-base font-medium leading-6 text-primary-black"
                >
                  오늘 달성도는 어땠나요?
                </label>
                <div className="mt-2 flex justify-center gap-[28px]">
                  <SeolgiIcon width={40} height={40} />
                  <SeolgiIcon
                    width={40}
                    height={40}
                    bgFill={"#FFE3E3"}
                    blushFill={"#fff"}
                  />
                  <SeolgiIcon
                    width={40}
                    height={40}
                    bgFill={"#D5FBF3"}
                    blushFill={"#fff"}
                  />
                  <SeolgiIcon
                    width={40}
                    height={40}
                    bgFill={"#FEF2DA"}
                    blushFill={"#fff"}
                  />
                </div>
              </div>

              <div className="h-[100px] w-[500px] rounded-2xl bg-gray-100">
                <label
                  htmlFor="seolgi-modal"
                  className="mt-3 block text-center text-base font-medium leading-6 text-gray-900"
                >
                  오늘 달성도 짧은 일기
                </label>
                <div className="mt-2 flex justify-center">
                  <input
                    id="seolgi-modal"
                    name="description"
                    type="text"
                    required
                    className="block h-[40px] w-[440px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-gray-300 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex h-[30px] w-[100px] items-center justify-center rounded-2xl bg-gray-200 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-300"
                >
                  확인
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
