"use client";
import SeolgiFigure from "@/icons/SeolgiFigure";
import { useState } from "react";
const DEV = process.env.NODE_ENV === "development";

export default function TutorialPage() {
  const [inputValue] = useState(DEV ? "tutorial page" : "");

  return (
    <div className="mx-auto flex gap-[20px] md:gap-[40px] w-full h-screen flex-col items-center justify-between">
        <div className="flex flex-col h-full items-center justify-center" >
          <SeolgiFigure />
          <p className="my-6 md:my-10 text-center text-2xl md:text-3xl md:font-bold leading-9 tracking-tight text-black">
            목표를 정해주세요!
          </p>
          <form
            className="grid w-full grid-cols-1 justify-items-center gap-y-8"
            action="#"
            method="POST"
          >
            <div className="h-50 w-600">
              <input
                id="objective"
                name="objective"
                type="text"
                defaultValue={inputValue}
                required
                className="block w-[300px] h-[40px] md:w-[600px] md:h-[60px] rounded-md border-0 py-1.5 pl-5 text-center text-gray-900 shadow-sm ring ring-inset ring-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-gray-300 md:text-xl md:leading-6"
              />
            </div>
            <div>
              <button
                type="submit"
                className="flex  w-[100px] h-[40px] md:w-[160px] md:h-[60px] items-center justify-center rounded-md bg-gray-100 px-3 py-1.5 text-xl font-semibold leading-6 text-black shadow-lg hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
              >
                입력
              </button>
            </div>
          </form>
        </div>
    </div>
  );
}
