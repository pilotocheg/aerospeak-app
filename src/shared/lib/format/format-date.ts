import { parseCalendarDate } from './parse-calendar-date'

/** Format a `YYYY-MM-DD` date for display, e.g. "Jan 5". */
export const formatDate = (date: string) => {
  return parseCalendarDate(date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}
