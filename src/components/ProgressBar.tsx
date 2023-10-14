export const ProgressBar = ({ data }) => {
  return (
    <div className="m-8	flex h-10 w-10/12 overflow-hidden rounded-full bg-neutral-300">
      {/* 데이터가 어떻게 들어올지에 보고 로직을 짜야할듯.. */}
      <div className="w-3/12 bg-rose-200"></div>
      <div className="w-2/12 bg-green-200"></div>
      <div className="w-1/12 bg-yellow-100"></div>
      <div className="w-4/12 bg-neutral-50"></div>
    </div>
  );
};
