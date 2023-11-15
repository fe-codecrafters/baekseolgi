"use client";
import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import AttendanceModal from "./AttendanceModal";
import AttendanceEditModal from "./AttendanceEditModal";
import { closeModal } from "@/app/redux/reducer/modalSlice";

const MODAL_TYPES = {
  AttendanceModal: "AttendanceModal",
  EditModal: "EditModal",
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.AttendanceModal,
    component: <AttendanceModal />,
  },
  {
    type: MODAL_TYPES.EditModal,
    component: <AttendanceEditModal />,
  },
];

export default function GlobalModal() {
  const { modalType, isOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });

  if (!findModal) return null;

  const renderModal = () => {
    return findModal.component;
  };

  return (
    <>
      <button
        className="fixed inset-0 cursor-default bg-slate-800 opacity-40"
        onClick={() => dispatch(closeModal())}
      ></button>
      <div className="fixed left-[50%] top-[50%] z-[999] translate-x-[-50%] translate-y-[-50%]">
        <div className="w-[340px] rounded-xl border-[1px] bg-primary-white p-6 md:w-[600px] md:rounded-2xl lg:px-8">
          {renderModal()}
        </div>
      </div>
    </>
  );
}
