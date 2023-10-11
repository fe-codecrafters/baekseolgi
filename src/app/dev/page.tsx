'use client'
import AttendanceInput from "@/components/AttendanceInput"
import ObjectiveInput from "@/components/ObjectiveInput"

const isDev = process.env.NODE_ENV === 'development'

export default function Dev() {
  if (!isDev) return <></>

  return (
    <div className="flex min-h-screen flex-col items-center max-w-screen-md w-full mx-auto">
      <AttendanceInput
        label="출석"
        id="attendance"
        name="attendance"
        onChange={() => { }}
        placeholder="Main 페이지 placeholder"
        required
        date={new Date()}
        type="main"
      ></AttendanceInput>
      <AttendanceInput
        label="출석"
        id="attendance-2"
        name="attendance-2"
        onChange={() => { }}
        placeholder="Calendar 페이지 placeholder"
        required
        date={new Date()}
        type="calendar"
      ></AttendanceInput> 
    </div>
  )
}
