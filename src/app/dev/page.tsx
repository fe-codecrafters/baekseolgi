"use client";
import { useDispatch } from "react-redux";
import { openModal } from "@/app/redux/reducer/modalSlice";
import MyPageInput from "@/components/MyPage/MyPageInput";

const DEV = process.env.NODE_ENV === "development";

export default function Dev() {
  if (!DEV) return <></>;

  const dispatch = useDispatch();

  const handleOpenEditModal = () => {
    dispatch(
      openModal({
        modalType: "EditModal",
        isOpen: true,
      }),
    );
  };
  const handleOpenBasicModal = () => {
    dispatch(
      openModal({
        modalType: "AttendanceModal",
        isOpen: true,
      }),
    );
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col items-center">
      {DEV ? <h2>use here wisely</h2> : null}
      <div>
        <button onClick={handleOpenEditModal}>에딧 모달 열기</button>
        <button onClick={handleOpenBasicModal}>기본 모달 열기</button>
        <MyPageInput label="MyPageInput 테스트"></MyPageInput>
      </div>
    </div>
  );
}
