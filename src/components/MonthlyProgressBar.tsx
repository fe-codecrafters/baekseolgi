import SeolgiIcon from "@/icons/SeolgiIcon";

export const MonthlyProgressBar = ({ data }) => {
  let colors;
  // TODO: API에서 잘 전달해주면 그냥 보여주기만 하는 역할로 추후에 변경
  const bgColors = {
    white: "bg-seolgi-default",
    yellow: "bg-seolgi-yellow",
    green: "bg-seolgi-green",
    pink: "bg-seolgi-pink",
    transparent: "bg-[transparent]",
  };

  if (data) {
    data = data.filter((el) => el !== 0);
    colors = data
      .filter((el) => typeof el === "object")
      .map((el) => el.Seolgi.color)
      .sort();
    for (let i = 0; i < data.length - colors.length; i++) {
      colors.push("transparent");
    }
  }

  const colorSet = [...new Set(colors)].slice(0, -1);

  return (
    <>
      <div className="m-[24px]	flex h-[28px] w-[540px] overflow-hidden rounded-full bg-primary-gray">
        {data
          ? colors.map((color, idx) => (
              <div key={idx} className={bgColors[color] + " grow"}></div>
            ))
          : null}
      </div>
      <div className="flex w-[340px] justify-around">
        {colorSet.map((color, idx) => (
          <div
            className={bgColors[color] + " w-[40px] h-[40px]"}
            key={"MPB-" + color + idx}
          >
            <SeolgiIcon width={40} height={40} bgFill="transparent" />
          </div>
        ))}
      </div>
    </>
  );
};
