import { beforeEach, describe, expect, it } from 'vitest'

import { usePracticeStore } from '@/features/practice-session/model/practice-store'

const SCENARIO_ID = 'ground-ctrl-taxi-clearance'
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

const startPractice = () => {
  const { start } = usePracticeStore.getState()
  start(SCENARIO_ID)
  const { practiceSessionId } = usePracticeStore.getState()
  return practiceSessionId
}

describe('practice store', () => {
  beforeEach(() => {
    usePracticeStore.setState({ scenarioId: null, practiceSessionId: null })
  })

  it('gives a started run a uuid practice session id', () => {
    const practiceSessionId = startPractice()

    expect(practiceSessionId).toMatch(UUID_PATTERN)
  })

  it('gives a restarted run a new practice session id', () => {
    const firstPracticeSessionId = startPractice()

    const secondPracticeSessionId = startPractice()

    expect(secondPracticeSessionId).not.toBe(firstPracticeSessionId)
  })
})
