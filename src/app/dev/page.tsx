"use client";
import Chart from "@/components/Chart";
import { useState } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";

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
      <LoadingIndicator />
      <Chart />
    </div>
  );
}
