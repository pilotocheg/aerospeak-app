import { isMissedCritical } from '@/entities/attempt'
import type { AttemptResultDto } from '@/shared/api'

/** What the feedback warns about, worst first, and whether the backend tip still adds anything. */
export const getFeedbackNotices = (result: AttemptResultDto) => {
  const critical = result.elements.filter(isMissedCritical)
  // A critical element with a hint was said, but wrongly ("climbing to 2000 feet"): show why.
  const missedCritical = critical.filter((element) => !element.hint)
  const wrongCritical = critical.filter((element) => element.hint)
  const order = result.order && !result.order.correct ? result.order : undefined
  // The backend tip names the most important problem first. A critical miss or an order
  // problem already has its own notice above, so the tip would only repeat it.
  const tipRepeatsNotice = critical.length > 0 || (order !== undefined && result.tip === order.message)

  const outOfOrder = result.order?.outOfOrder ?? []

  return { missedCritical, wrongCritical, order, outOfOrder, showTip: !tipRepeatsNotice }
}
