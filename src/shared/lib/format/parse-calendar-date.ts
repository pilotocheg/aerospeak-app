/** Parse a `YYYY-MM-DD` calendar date as a local date, not UTC midnight. */
export const parseCalendarDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}
