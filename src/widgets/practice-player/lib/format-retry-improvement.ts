/** null -> "–", 12 -> "+12", -3 -> "-3" */
export const formatRetryImprovement = (improvement: number | null) => {
  if (improvement === null) return '–'
  return improvement >= 0 ? `+${improvement}` : String(improvement)
}
