'use client'
import TabBar from "@/components/TabBar"
import { FormEventHandler } from "react"

export default function Home() {
  const handleObjectSubmit: FormEventHandler<HTMLFormElement> = () => {
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between max-w-screen-md w-full mx-auto">
      <h2>목표를 정해주세요</h2>
      <TabBar></TabBar>
    </div>
  )
}
