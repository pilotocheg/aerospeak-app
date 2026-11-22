import { parseCalendarDate } from './parse-calendar-date'

/** Check whether a `YYYY-MM-DD` date is today in local time. */
export const isToday = (date: string) => {
  const d = parseCalendarDate(date)
  const today = new Date()
  return d.toDateString() === today.toDateString()
}
