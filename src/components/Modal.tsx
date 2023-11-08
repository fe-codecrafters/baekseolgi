import EditIcon from "@/icons/EditIcon";
import CloseIcon from "@/icons/CloseIcon";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useCreateAttendance } from "@/features/attendance/api/createAttendance";
import { attendanceKeys } from "@/features/attendance/key";
import { useGetSeolgi } from "@/features/seolgi/api/getSeolgi";
import { getStartOfDayInTimeZone } from "@/util/getStartOfDayInTimeZone";
import SeolgiIconS from "@/icons/AttendanceInput/SeolgiIconS";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/redux/reducer/modalSlice";
import { RootState } from "@/redux/store";

const Modal = () => {
  const dispatch = useDispatch();
  const { year, month, date } = useSelector((state: RootState) => state.date);
  const getDate = new Date(year, month - 1, date);
  const seolgis = useGetSeolgi({ seolgiName: "SeolgiIcon" }).data;
  const [seolgiId, setSeolgiId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  // TODO: userId, objectiveID props로 내려받아야, 아님 전역?
  const createAttendanceMutation = useCreateAttendance(
    attendanceKeys.month({ year, month, userId: 1, objectiveId: 1 }),
  );

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    createAttendanceMutation.mutate({
      userId: 1,
      objectiveId: 1,
      seolgiId,
      title,
      createdAt: getStartOfDayInTimeZone(getDate, timeZone),
    });

    handleModalClose();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleSelectSeolgi = (id: number) => {
    setSeolgiId(id);
  };

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      {/* modal background */}
      <button
        className="fixed inset-0 cursor-default bg-slate-800 opacity-40"
        onClick={handleModalClose}
      ></button>
      {/* modal center fix */}
      <div className="fixed left-[50%] top-[50%] z-[999] translate-x-[-50%] translate-y-[-50%]">
        {/* modal content */}
        <div className="w-[340px] rounded-xl border-[1px] bg-primary-white p-6 md:w-[600px] md:rounded-2xl lg:px-8">
          <div className="relative">
            <div className="flex items-center justify-center gap-3">
              <h2 className="text-center text-base leading-9 tracking-tight text-primary-black md:text-2xl md:font-bold">
                {month}월 {date}일 {format(date, "eee", { locale: ko })}요일
              </h2>
              <button>
                <EditIcon />
              </button>
            </div>
            <button
              className="absolute left-[260px] top-[6px] md:left-[520px] md:top-[6px]"
              onClick={handleModalClose}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mt-4 md:mt-10">
            <form
              className="flex flex-col items-center space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="h-[75px] w-[320px] rounded-xl bg-primary-lightGray md:h-[100px] md:w-[500px] md:rounded-2xl">
                <label
                  htmlFor="seolgi-modal"
                  className="mt-3 block text-center text-base font-medium leading-6 text-primary-black md:text-xl"
                >
                  오늘 달성도는 어땠나요?
                </label>
                <div className="mt-1 flex justify-center gap-[28px] md:mt-2">
                  {seolgis?.map((seolgi) => {
                    const { bgFill, blushFill } = seolgi;
                    const iconOptions = {
                      bgFill: bgFill ? bgFill : undefined,
                      blushFill: blushFill ? blushFill : undefined,
                    };
                    return (
                      <button
                        type="button"
                        key={seolgi.id}
                        onClick={() => handleSelectSeolgi(seolgi.id)}
                      >
                        <input
                          type="radio"
                          id={"radio" + seolgi.id}
                          name="seolgi-modal-1"
                          checked={seolgiId === seolgi.id}
                          readOnly
                          className="peer hidden"
                        />
                        <label
                          htmlFor={"radio-" + seolgi.id}
                          className="inline-block h-auto w-auto cursor-pointer peer-checked:outline-none peer-checked:ring peer-checked:ring-primary-gray"
                        >
                          <SeolgiIconS {...iconOptions} />
                        </label>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="h-[75px] w-[320px] rounded-2xl bg-gray-100 md:h-[100px] md:w-[500px]">
                <label
                  htmlFor="seolgi-modal"
                  className="mt-3 block text-center text-base font-medium leading-6 text-gray-900 md:text-xl"
                >
                  오늘 달성도 짧은 일기
                </label>
                <div className="mt-1 flex justify-center md:mt-2">
                  <input
                    id="seolgi-modal"
                    name="description"
                    type="text"
                    onChange={handleChange}
                    required
                    className="block h-[30px] w-[300px] rounded-md border-0 p-2 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-gray-300 sm:text-sm sm:leading-6 md:h-[40px] md:w-[440px]"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex h-[28px] w-[80px] items-center justify-center rounded-2xl bg-gray-200 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-300 md:h-[30px] md:w-[100px]"
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
