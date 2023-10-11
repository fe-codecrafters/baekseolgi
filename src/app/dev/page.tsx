'use client'
import AttendanceInput from "@/components/AttendanceInput"

const DEV = process.env.NODE_ENV === 'development'

export default function Dev() {
  if (!DEV) return <></>

  return (
    <div className="flex min-h-screen flex-col items-center max-w-screen-md w-full mx-auto">
      {DEV ? <h2>use here wisely</h2> : null}
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
