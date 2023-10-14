interface Props {
  stroke?: string;
}

export default function EditIcon({ stroke = "#000000" }: Props) {
  return (
    <>
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 15H15.5"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.25 1.51777C12.5815 1.18625 13.0312 1 13.5 1C13.7321 1 13.962 1.04572 14.1765 1.13456C14.391 1.2234 14.5858 1.35361 14.75 1.51777C14.9142 1.68192 15.0444 1.8768 15.1332 2.09127C15.222 2.30575 15.2678 2.53562 15.2678 2.76777C15.2678 2.99991 15.222 3.22979 15.1332 3.44426C15.0444 3.65874 14.9142 3.85361 14.75 4.01777L4.33333 14.4344L1 15.2678L1.83333 11.9344L12.25 1.51777Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
