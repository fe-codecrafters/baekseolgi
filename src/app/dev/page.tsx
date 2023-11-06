"use client";
import AttendanceInput from "@/components/AttendanceInput";
import { Calendar } from "@/components/Calendar";
import Chart from "@/components/Chart";
import Modal from "@/components/Modal";
import { useState } from "react";

const DEV = process.env.NODE_ENV === "development";

export default function Dev() {
  if (!DEV) return <></>;

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const openModalHandler = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col items-center">
      {DEV ? <h2>use here wisely</h2> : null}
      <button onClick={openModalHandler}>modal click</button>
      {isOpened && <Modal />}
    </div>
  );
}
