import { startOfDay } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

/**
 * 타임존의 가장 이른 시간을 확인
 * ! 클라이언트에서 사용할 것 (서버는 UTC 기준이니까!)
 *
 * @example
 * const date = new Date();
 * const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
 * const startOfDayInTimeZone = getStartOfDayInTimeZone(date, timeZone);
 *
 */
export function getStartOfDayInTimeZone(date: Date, timeZone: string) {
  const utcStartOfDay = zonedTimeToUtc(startOfDay(date), timeZone);
  return utcToZonedTime(utcStartOfDay, timeZone);
}
