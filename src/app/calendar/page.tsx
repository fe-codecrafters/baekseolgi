import TabBar from "@/components/TabBar";
const DEV = process.env.NODE_ENV === "development";

export default function Tutorial() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col items-center justify-between">
      {DEV ? <h2>calendar page</h2> : null}
      <h2>목표를 정해주세요</h2>
      <TabBar type={"desktop"}></TabBar>
    </div>
  );
}
