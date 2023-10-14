interface Props {
  size?: number;
  stroke?: string;
}

export default function AttendanceEditIcon({
  size = 24,
  stroke = "#000000",
}: Props) {
  // const isDesktop = type === 'desktop'
  const desktopCN = "text-primary-darkGray group-hover:text-primary-black";
  const cn = desktopCN;
  const vb = `0 0 ${size} ${size}`;
  const w = size;
  const h = size;

  return (
    <>
      <svg
        width={w}
        height={h}
        viewBox={vb}
        className={cn}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.1875 12H19.875C19.7719 12 19.6875 12.0844 19.6875 12.1875V19.6875H4.3125V4.3125H11.8125C11.9156 4.3125 12 4.22812 12 4.125V2.8125C12 2.70937 11.9156 2.625 11.8125 2.625H3.375C2.96016 2.625 2.625 2.96016 2.625 3.375V20.625C2.625 21.0398 2.96016 21.375 3.375 21.375H20.625C21.0398 21.375 21.375 21.0398 21.375 20.625V12.1875C21.375 12.0844 21.2906 12 21.1875 12Z"
          fill="currentColor"
        />
        <path
          d="M8.34143 12.5367L8.2969 15.3234C8.29456 15.532 8.46331 15.7031 8.6719 15.7031H8.68127L11.4469 15.6352C11.4938 15.6328 11.5406 15.6141 11.5735 15.5812L21.3211 5.85469C21.3938 5.78203 21.3938 5.6625 21.3211 5.58984L18.4078 2.67891C18.3703 2.64141 18.3235 2.625 18.2742 2.625C18.225 2.625 18.1781 2.64375 18.1406 2.67891L8.39534 12.4055C8.36148 12.4409 8.34223 12.4877 8.34143 12.5367ZM9.82971 13.0898L18.2742 4.66406L19.3336 5.72109L10.8844 14.1516L9.81331 14.1773L9.82971 13.0898Z"
          fill="currentColor"
        />
      </svg>
    </>
  );
}
