import { DateTime } from "luxon";

export const getCurrentTimeSimple = () => {
  return DateTime.local().toLocaleString(DateTime.TIME_SIMPLE);
};

export const getCurrentDayOfWeek = () => {
  return DateTime.local().weekdayLong;
};
