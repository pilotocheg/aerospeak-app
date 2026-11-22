/** Parse a `YYYY-MM-DD` calendar date as a local date, not UTC midnight. */
export const parseCalendarDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/** Format a `YYYY-MM-DD` date for display, e.g. "Jan 5". */
export const formatDate = (date: string) => {
  return parseCalendarDate(date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}

/** Check whether a `YYYY-MM-DD` date is today in local time. */
export const isToday = (date: string) => {
  const d = parseCalendarDate(date)
  const today = new Date()
  return d.toDateString() === today.toDateString()
}
