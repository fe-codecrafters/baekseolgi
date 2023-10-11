"use client"

import { useState } from "react"
import { mockData } from './mockData'
import SeolgiIcon from "@/icons/SeolgiIcon"
import ArrowIcon from "@/icons/ArrowIcon"

// 요일 및 현재 날짜 정보 상수로 정의
const days = ["일", "월", "화", "수", "목", "금", "토"]
const date = new Date()
const today = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    day: date.getDay()
}

// 달력에서 요일 및 각 날짜를 표시하는 컴포넌트
// props-day는 일, 월 혹은 12, 13 같이 요일이나 날짜 정보가 들어옴
// props-type은 day로 들어온 정보가 무엇인지 표시. day라면 요일을, date라면 날짜를 표시
const Day = ({day, type, isThisMonth}) => {
    const isToday = (isThisMonth && type === 'date' && day === today.date) || (isThisMonth && type === 'day' && days.indexOf(day) === today.day)

    let bgColor = 'bg-primary-gray'
    if (day.id) {
      if (day.stamp.color === 'white') bgColor = 'bg-seolgi-default'
      if (day.stamp.color === 'pink') bgColor = 'bg-seolgi-pink'
      if (day.stamp.color === 'green') bgColor = 'bg-seolgi-green'
      if (day.stamp.color === 'yellow') bgColor = 'bg-seolgi-yellow'
    }
    
    console.log(bgColor)
    return (
      <div className='flex flex-col items-center mx-1'>
        <div className={`w-[70px] h-[29px] text-center${type === 'day' ? ' text-[24px] mt-[20px]' : ' text-[16px] mt-[14px]'}${isToday? ' text-black font-medium' : ' text-neutral-500'}`}>{day.id? day.id : day !== 0 ? day : null}</div>
        {type === 'date' ? (
          <div className={`w-[70px] h-[70px] mt-[6px] rounded-[10px] ${bgColor}`}>
            {day.id ? <SeolgiIcon bgFill="transparent" width={70} height={70}/> : null }
          </div>
        ) : null}
      </div>
    )
  }
  
  // 달력에서 한 주를 표시하는 컴포넌트 - 7개의 Day 컴포넌트를 묶어주는 역할
  const Week = ({week, type, isThisMonth}) => {
    return (
      <div className='weekly-row flex flex-row w-auto justify-start mt-1'>
        {week.map(day => <Day day={day} type={type} isThisMonth={isThisMonth}/>)}
      </div>
    )
  }
  
  // 한 달을 표시하는 컴포넌트 - type에 따라 weekly, monthly로 구분
  export const Calendar = ({type}) => {
    // 선택된 연도와 달을 상태로 관리
    const [selectedYear, setSelectedYear] = useState(today.year)
    const [selectedMonth, setSelectedMonth] = useState(today.month)
    const [monthData, setMonthData] = useState(filterMonthData(selectedMonth))
    
    //리덕스 써야것는디...
    const isThisMonth = selectedYear === today.year && selectedMonth === today.month
    function filterMonthData (selectedMonth) {
      return mockData.data.filter(data => data.month === selectedMonth)[0]
    }
    // console.log(monthData)

    const toPrevMonth = () => {
      if (selectedMonth === 1) {
        setSelectedMonth(12)
        setSelectedYear(selectedYear - 1)

        //mockData에 Year 정보가 없어서 보완이 필요함
        setMonthData(filterMonthData(12))
      } else {
        setSelectedMonth(selectedMonth -1)
        setMonthData(filterMonthData(selectedMonth - 1))
      }
    }

    const toNextMonth = () => {
      if (selectedMonth === 12) {
        setSelectedMonth(1)
        setSelectedYear(selectedYear + 1)

        //mockData에 Year 정보가 없어서 보완이 필요함
        setMonthData(filterMonthData(1))
      } else {
        setSelectedMonth(selectedMonth + 1)
        setMonthData(filterMonthData(selectedMonth + 1))        
      }
    }

    // 선택된 달의 시작일과 종료일을 정의
    const monthStart = new Date(selectedYear, selectedMonth - 1, 1)
    const monthEnd = new Date(selectedYear, selectedMonth, 0)

    // 비어있는 날짜도 Day 컴포넌트로 표시해줘야하므로 0으로 채워넣기
    const dates = []
    for (let i = 0; i < monthStart.getDay(); i++) {
        dates.push(0)
    }
    for (let i = 1; i <= monthEnd.getDate(); i++ ) {
        dates.push(i)
    }
    while (dates.length % 7 !== 0) {
        dates.push(0)
    }

    // 날짜에 스탬프 정보 대입
    // 일단 monthData 유무로 조건문을 짜놨지만 수정 필요..
    if (monthData) { monthData.day.forEach(date => {
      if (dates.findIndex(el => el === date.id)) {
        dates[dates.findIndex(el => el === date.id)] = date
      }
    })}

    // 날짜들을 7개로 끊어 주 단위로 나누기
    let weeks = []
    while (dates.length > 0) {
      weeks.push(dates.splice(0,7))
    }

    console.log(weeks)

    // Weekly Calendar라면 오늘 날짜가 포함된 주만 남기기
    if (type === 'week') {
      weeks = weeks.filter(week => week.includes(today.date))
    }
  
    return (
      <div className='calendar flex flex-col items-center'>
        {type !== 'week' ? <CalendarHeader toPrevMonth={toPrevMonth} toNextMonth={toNextMonth} selectedYear={selectedYear} selectedMonth={selectedMonth} /> : null}
        <Week week={days} type={'day'} isThisMonth={isThisMonth} />
        {weeks.map(week => <Week week={week} type={'date'} isThisMonth={isThisMonth}/>)}
      </div>
    )
  }

  function CalendarHeader ({toPrevMonth, toNextMonth, selectedYear, selectedMonth}) {
    return (
      <div className="flex text-[32px] font-semibold">
        <button onClick={toPrevMonth} className="mr-[48px] fill-primary-gray active:fill-primary-black" ><ArrowIcon direction='left' /></button>
        <div className="font-semibold">{`${selectedYear}년 ${selectedMonth}월`}</div>
        <button onClick={toNextMonth} className="ml-[48px] fill-primary-gray active:fill-primary-black" ><ArrowIcon direction='right' /></button>
      </div>
    )
  }
  