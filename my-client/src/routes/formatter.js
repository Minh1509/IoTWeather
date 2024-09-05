import { format } from "date-fns";

export const formatter = (timeString) => {
  return format(new Date(timeString), "yyyy/MM/dd HH:mm:ss");
};