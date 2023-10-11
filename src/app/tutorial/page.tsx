import TabBar from "@/components/TabBar"
const DEV = process.env.NODE_ENV === 'development'

export default function Tutorial() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between max-w-screen-md w-full mx-auto">
      {DEV ? <h2>tutorial page</h2> : null}
      <h2>목표를 정해주세요</h2>
      <TabBar></TabBar>
    </div>
  )
}
