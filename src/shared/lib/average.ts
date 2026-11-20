/** Arithmetic mean; 0 for an empty list. */
export const average = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length)
