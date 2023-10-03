'use client'
import AttendanceInput from "@/components/AttendanceInput"
import ObjectiveInput from "@/components/ObjectiveInput"

const isDev = process.env.NODE_ENV === 'development'

export default function Dev() {
  if (!isDev) return <></>

  return (
    <div className="flex min-h-screen flex-col items-center justify-between max-w-screen-md w-full mx-auto">
      <AttendanceInput></AttendanceInput>
    </div>
  )
}
