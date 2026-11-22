/** Latest update timestamp across two queries. 0 when neither has data. */
export const computeLatestUpdate = (a: number, b: number): number => {
  return Math.max(a ?? 0, b ?? 0)
}
