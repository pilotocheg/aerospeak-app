import { average } from './average'

/** Mean rounded to a whole number; null for an empty list. */
export const roundedAverage = (values: number[]) => (values.length ? Math.round(average(values)) : null)
