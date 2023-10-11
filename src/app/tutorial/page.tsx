'use client'
import SeolgiFigure from "@/icons/SeolgiFigure"
import { useState } from "react"
const DEV = process.env.NODE_ENV === 'development'

export default function TutorialPage() {
  const [inputValue, setInputValue] = useState(DEV ? "tutorial page": "")

  return (
    <div className="w-full flex items-center flex-col">
      <SeolgiFigure />
      <p className="mt-10 mb-10 text-center text-3xl font-bold leading-9 tracking-tight text-black">목표를 정해주세요!</p>
      <form className="grid gap-y-8 grid-cols-1 w-full justify-items-center" action="#" method="POST">
        <div className="w-600 h-50">
          <input 
            id="objective" 
            name="objective" 
            type="text"
            value={inputValue} 
            required 
            className="block w-full h-full text-center rounded-md border-0 py-1.5 pl-5 text-gray-900 shadow-sm ring ring-inset ring-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-gray-300 sm:text-xl sm:leading-6" 
          />
        </div>
        <div>
          <button type="submit" className="flex w-150 h-50 justify-center items-center rounded-md bg-gray-100 px-3 py-1.5 text-xl font-semibold leading-6 text-black shadow-lg hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">입력</button>
        </div>
      </form>
    </div>
  )
}
