import Image from 'next/image'
import { Calendar } from '../components/Calendar'
import { ProgressBar } from '../components/ProgressBar'


export default function Home() {
  return (
    <>
      <div className='text-4xl font-bold m-8'>Monthly Calandar</div>
      <Calendar />
      <div className='text-4xl font-bold m-8'>Weekly Calandar</div>
      <Calendar type={'week'}/>
      <div className='text-4xl font-bold m-8'>Progress Bar</div>
      <ProgressBar />
    </>
  )
}
