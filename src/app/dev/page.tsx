"use client";
import Chart from "@/components/Chart";
import { useState } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import Modal from "@/components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/reducer/modalSlice";
import { RootState } from "@/redux/store";

const DEV = process.env.NODE_ENV === "development";

export default function Dev() {
  if (!DEV) return <></>;

  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modal.isOpen);

  const openModalHandler = () => {
    dispatch(openModal());
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col items-center">
      {DEV ? <h2>use here wisely</h2> : null}
      <button onClick={openModalHandler}>modal click</button>
      {modalState === true ? <Modal /> : ""}
    </div>
  );
}
