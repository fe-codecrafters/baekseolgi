"use client";
import AttendanceInput from "@/components/AttendanceInput";
import { Calendar } from "@/components/Calendar";
import { ProgressBar } from "@/components/ProgressBar";

const DEV = process.env.NODE_ENV === "development";

export default function Dev() {
  if (!DEV) return <></>;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col items-center">
      {DEV ? <h2>use here wisely</h2> : null}
      <Calendar />
      <Calendar type="week" />
      <ProgressBar />
      <AttendanceInput
        label="출석"
        id="attendance"
        name="attendance"
        onChange={() => {}}
        placeholder="Main 페이지 placeholder"
        required
        date={new Date()}
        type="main"
      ></AttendanceInput>
      <AttendanceInput
        label="출석"
        id="attendance-2"
        name="attendance-2"
        onChange={() => {}}
        placeholder="Calendar 페이지 placeholder"
        required
        date={new Date()}
        type="calendar"
      ></AttendanceInput>
    </div>
  );
}
