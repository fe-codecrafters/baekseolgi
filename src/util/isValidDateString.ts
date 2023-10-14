import { parse, isValid } from "date-fns";

const format = "yyyy-MM-dd";
export default function isValidDateString(dateString: string) {
  const parsedDate = parse(dateString, format, new Date());
  return isValid(parsedDate);
}
