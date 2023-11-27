import SeolgiIconS from "@/icons/AttendanceInput/SeolgiIconS";
import CloseIcon from "@/icons/CloseIcon";
import { closeModal } from "@/app/redux/reducer/modalSlice";
import { RootState } from "@/app/redux/store";
import { format } from "date-fns";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ko } from "date-fns/locale";
import { useGetSeolgi } from "@/features/seolgi/api/getSeolgi";
import { updateAttendance } from "@/features/attendance/api/updateAttendance";

export default function AttendanceEditModal() {
  const dispatch = useDispatch();
  const { modalContent } = useSelector((state: RootState) => state.modal);
  const date = new Date(modalContent.createdAt);
  const seolgis = useGetSeolgi({ seolgiName: "SeolgiIcon" }).data;
  const [seolgiId, setSeolgiId] = useState<number>(modalContent.seolgiId);

  const [title, setTitle] = useState<string>(modalContent.title);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    //TODO: 뭔가 바로 적용이 안 된다? 새로고침을 하면 적용이 됨.
    updateAttendance({
      data: {
        seolgiId: seolgiId,
        title: title,
      },
      attendanceId: modalContent.id,
    });
    dispatch(closeModal());
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleSelectSeolgi = (id: number) => {
    setSeolgiId(id);
  };

  return (
    // edit attendance modal content
    <>
      <div className="relative">
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-center text-base leading-9 tracking-tight text-primary-black md:text-2xl md:font-bold">
            {format(date, "M", { locale: ko })}월{" "}
            {format(date, "d", { locale: ko })}일{" "}
            {format(date, "eee", { locale: ko })}
            요일
          </h2>
        </div>
        <button
          className="absolute left-[260px] top-[6px] md:left-[520px] md:top-[6px]"
          onClick={() => dispatch(closeModal())}
        >
          <CloseIcon />
        </button>
      </div>

      <div className="mt-4 md:mt-10">
        <form
          className="flex flex-col items-center space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="flex h-[50px]  w-[320px] justify-center rounded-xl bg-primary-lightGray md:h-[65px] md:w-[500px] md:rounded-2xl">
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

          <div className="flex h-[50px] w-[320px] items-center justify-center rounded-2xl bg-gray-100 md:h-[70px] md:w-[500px]">
            <div className="flex justify-center">
              <input
                id="seolgi-modal"
                name="description"
                type="text"
                value={title}
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
    </>
  );
}
