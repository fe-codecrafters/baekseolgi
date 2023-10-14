interface Props {
  direction: string;
}

export default function CalendarIcon({ direction }: Props) {
  return (
    <>
      {direction === "left" ? (
        <svg width="15" height="26">
          <path d="M13.807 1.068a1.875 1.875 0 0 1 0 2.65L4.526 13l9.281 9.281a1.875 1.875 0 0 1-2.651 2.652L.549 14.326a1.875 1.875 0 0 1 0-2.652L11.156 1.068a1.875 1.875 0 0 1 2.651 0Z" />
        </svg>
      ) : (
        <svg
          className="fill-primary-gray active:fill-primary-black"
          width="15"
          height="26"
        >
          <path d="M1.325.965a1.813 1.813 0 0 0 0 2.563l8.972 8.972-8.972 8.972a1.812 1.812 0 0 0 2.563 2.563L14.14 13.78a1.812 1.812 0 0 0 0-2.562L3.888.965a1.813 1.813 0 0 0-2.563 0Z" />
        </svg>
      )}
    </>
  );
}
