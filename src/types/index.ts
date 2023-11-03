/**
 * 아이콘 타입
 * https://www.figma.com/file/Iw5M1UfLYICcxIxLgftSM7/%EC%B9%AD%EC%B0%AC-%EB%8F%84%EC%9E%A5%ED%8C%90?type=design&node-id=122-159&mode=design&t=akSVXHBE3xZUjeQe-0
 *
 * @type {string}
 */
export type IconType = "desktop" | "mobile";

/**
 * 출결 Input 타입
 * https://www.figma.com/file/Iw5M1UfLYICcxIxLgftSM7/%EC%B9%AD%EC%B0%AC-%EB%8F%84%EC%9E%A5%ED%8C%90?type=design&node-id=122-159&mode=design&t=akSVXHBE3xZUjeQe-0
 *
 * @type {string}
 */
export type AttendanceInputType = "calendar" | "main";

/**
 * 한글 요일 표기 타입
 * @type {string}
 */
export type DayNameType = "일" | "월" | "화" | "수" | "목" | "금" | "토";

/**
 * 요일과 일자
 * day: 요일 (일요일:0 ~ 토요일:6)
 * Date.prototype.getDay()
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
 *
 * date: 일자
 * Date.prototype.getDate()
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate
 *
 */
export type DayOrDate = "day" | "date";
