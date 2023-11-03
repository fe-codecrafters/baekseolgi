import SeolgiIcon from "@/icons/SeolgiIcon";

export const MonthlyProgressBar = ({ data = null }) => {

  //fake data
    // data = {
    //   dayCount: 31,
    //   1: 5,
    //   2: 12,
    //   3: 3,
    // }

  // TODO: API에서 잘 전달해주면 그냥 보여주기만 하는 역할로 추후에 변경
  const bgColors = {
    1: "bg-seolgi-default",
    2: "bg-seolgi-green",
    3: "bg-seolgi-pink",
    blank: "bg-primary-gray"
  };

  let colors = [];

  if (data) {
    let seolgiCount = 0
    for (let key in data) {
      seolgiCount += key
      for (let i = 0; i < data[key]; i++ ) colors.push(key)
    }
    for (let i = 0; i < data.dayCount - seolgiCount; i++) {
      colors.push("transparent");
    }
  }

  const colorSet = [...new Set(colors)].slice(0, -1);
  while (colorSet.length < 4) {
    colorSet.push('blank')
  }

  return (
    <>
      <div className="mx-[24px] mb-[24px] flex h-[24px] w-[280px] md:h-[28px] md:w-[540px] overflow-hidden rounded-full bg-primary-gray">
        {data
          ? colors.map((color, idx) => (
              <div key={idx} className={bgColors[color] + " grow"}></div>
            ))
          : null}
      </div>
      <div className="flex w-[228px] md:w-[340px] justify-around mx-auto">
        {colorSet.map((color, idx) => (
          <div
            className={bgColors[color] + " w-[30px] h-[30px] md:w-[40px] md:h-[40px]"}
            key={"MPB-" + color + idx}
          >
            <SeolgiIcon width={'auto'} height={'auto'} bgFill="transparent" />
          </div>
        ))}
      </div>
    </>
  );
};
