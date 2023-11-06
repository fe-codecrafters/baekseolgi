/**
 * 켈린더 텝바 아이콘
 * - desktop 24px
 * - mobile 20px
 * - color primary-darkGray
 * - group-active:color primary-black
 */
export default function CalendarIcon() {
  const vb = `0 0 ${24} ${24}`;

  return (
    <>
      <div className="h-5 w-5 group-active:text-primary-black md:h-6 md:w-6">
        <svg
          viewBox={vb}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21.125 4.3125H17.1875V2.8125C17.1875 2.70937 17.1031 2.625 17 2.625H15.6875C15.5844 2.625 15.5 2.70937 15.5 2.8125V4.3125H9.5V2.8125C9.5 2.70937 9.41563 2.625 9.3125 2.625H8C7.89687 2.625 7.8125 2.70937 7.8125 2.8125V4.3125H3.875C3.46016 4.3125 3.125 4.64766 3.125 5.0625V20.625C3.125 21.0398 3.46016 21.375 3.875 21.375H21.125C21.5398 21.375 21.875 21.0398 21.875 20.625V5.0625C21.875 4.64766 21.5398 4.3125 21.125 4.3125ZM20.1875 19.6875H4.8125V10.7812H20.1875V19.6875ZM4.8125 9.1875V6H7.8125V7.125C7.8125 7.22813 7.89687 7.3125 8 7.3125H9.3125C9.41563 7.3125 9.5 7.22813 9.5 7.125V6H15.5V7.125C15.5 7.22813 15.5844 7.3125 15.6875 7.3125H17C17.1031 7.3125 17.1875 7.22813 17.1875 7.125V6H20.1875V9.1875H4.8125Z" />
        </svg>
      </div>
    </>
  );
}
