import { describe, expect, it } from 'vitest'

import type { OrderFeedbackDto } from '@/shared/api'
import { buildAttemptResult, buildElementResult } from '@tests/builders'

import { getFeedbackNotices } from '@/widgets/practice-player/lib/feedback/get-feedback-notices'

const ORDER_MESSAGE = 'Read back the runway before the clearance.'

const MISSED_RUNWAY = buildElementResult({ id: 'runway', critical: true, status: 'missed' })
const WRONG_ALTITUDE = buildElementResult({
  id: 'altitude',
  critical: true,
  status: 'missed',
  hint: 'Said 2000 feet, expected 2500 feet.',
})
const MISSED_GREETING = buildElementResult({ id: 'greeting', critical: false, status: 'missed' })

const wrongOrder: OrderFeedbackDto = {
  rule: 'readback',
  correct: false,
  outOfOrder: ['runway'],
  message: ORDER_MESSAGE,
  lostPoints: 10,
}

describe('getFeedbackNotices', () => {
  it('separates critical elements left out from critical elements said wrongly', () => {
    const result = buildAttemptResult({ elements: [MISSED_RUNWAY, WRONG_ALTITUDE, MISSED_GREETING] })

    const { missedCritical, wrongCritical } = getFeedbackNotices(result)

    expect({ missedCritical, wrongCritical }).toEqual({
      missedCritical: [MISSED_RUNWAY],
      wrongCritical: [WRONG_ALTITUDE],
    })
  })

  it('shows the order notice only when the order is wrong', () => {
    const correctOrder = { ...wrongOrder, correct: true, outOfOrder: [] }

    const { order } = getFeedbackNotices(buildAttemptResult({ order: correctOrder }))

    expect(order).toBeUndefined()
  })

  it('lists the elements said in the wrong place', () => {
    const { outOfOrder } = getFeedbackNotices(buildAttemptResult({ order: wrongOrder }))

    expect(outOfOrder).toEqual(['runway'])
  })

  it('shows the tip when no notice covers the problem', () => {
    const { showTip } = getFeedbackNotices(buildAttemptResult({ elements: [MISSED_GREETING] }))

    expect(showTip).toBe(true)
  })

  it('hides the tip after a critical miss, which has its own notice', () => {
    const { showTip } = getFeedbackNotices(buildAttemptResult({ elements: [MISSED_RUNWAY] }))

    expect(showTip).toBe(false)
  })

  it('hides the tip when it repeats the order notice', () => {
    const result = buildAttemptResult({ order: wrongOrder, tip: ORDER_MESSAGE })

    const { showTip } = getFeedbackNotices(result)

    expect(showTip).toBe(false)
  })
})
