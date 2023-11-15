"use client";
import Chart from "@/components/Chart";
import { useState } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import Modal from "@/components/Modal/AttendanceModal";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/app/redux/reducer/modalSlice";
import { RootState } from "@/app/redux/store";

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
      </div>
    </div>
  );
}
