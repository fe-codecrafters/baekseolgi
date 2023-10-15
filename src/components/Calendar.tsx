"use client"

import SeolgiIcon from "@/icons/SeolgiIcon"

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
      if (day.Seolgi.color === 'white') bgColor = 'bg-seolgi-default'
      if (day.Seolgi.color === 'pink') bgColor = 'bg-seolgi-pink'
      if (day.Seolgi.color === 'green') bgColor = 'bg-seolgi-green'
      if (day.Seolgi.color === 'yellow') bgColor = 'bg-seolgi-yellow'
    }
    
    return (
      <div className='flex flex-col items-center'>
        <div className={`w-[70px] text-center ${type === 'day' ? ' text-[24px] mb-[-6px]' : ' text-[16px] mb-[6px] h-[20px]'}${isToday? ' text-black font-medium' : ' text-neutral-500'}`}>{day.id? day.id : day !== 0 ? day : null}</div>
        {type === 'date' ? (
          <div className={`w-[70px] h-[70px] rounded-[10px] ${bgColor}`}>
            {day.id ? <SeolgiIcon bgFill="transparent" width={70} height={70}/> : null }
          </div>
        ) : null}
      </div>
    )
  }
  
  // 달력에서 한 주를 표시하는 컴포넌트 - 7개의 Day 컴포넌트를 묶어주는 역할
  const Week = ({week, type, isThisMonth}) => {
    return (
      <div className='weekly-row flex flex-row w-auto gap-[16px] justify-start'>
        {week.map((day, idx) => <Day key={`day-${idx+1}`} day={day} type={type} isThisMonth={isThisMonth}/>)}
      </div>
    )
  }
  
  // 한 달을 표시하는 컴포넌트 - type에 따라 weekly, monthly로 구분
  export const Calendar = ({selectedYear, selectedMonth, monthData, dates, toPrevMonth, toNextMonth, type}) => {
    const isThisMonth = selectedYear === today.year && selectedMonth === today.month

    // 날짜들을 7개로 끊어 주 단위로 나누기
    let weeks = [];
    const datesCopy = [...dates]
    while (datesCopy.length > 0) {
      weeks.push(datesCopy.splice(0,7))
    }


    // Weekly Calendar라면 오늘 날짜가 포함된 주만 남기기
    if (type === 'week') {
      weeks = weeks.filter(week => week.includes(today.date))
    }
  
    return (
      <div className='flex flex-col items-center justify-start gap-[20px] mb-[40px]'>
        <Week week={days} type={'day'} isThisMonth={isThisMonth} />
        {weeks.map((week, idx) => <Week key={`${selectedYear}Y-${selectedMonth}M-${idx}W`} week={week} type={'date'} isThisMonth={isThisMonth}/>)}
      </div>
    )
  }

  