'use client'
import ObjectiveInput from "@/components/ObjectiveInput"

const isDev = process.env.NODE_ENV === 'development'

export default function Dev() {
  if (!isDev) return <></>

  return (
    <div className="flex min-h-screen flex-col items-center justify-between max-w-screen-md w-full mx-auto">
      <ObjectiveInput name="objective" label="목표" placeholder="목표를 작성해주세요" onChange={() => {}} required={false}></ObjectiveInput>
    </div>
  )
}
