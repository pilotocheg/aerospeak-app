import { beforeEach, describe, expect, it } from 'vitest'

import { usePracticeStore } from '@/features/practice-session/model/practice-store'

const SCENARIO_ID = 'ground-ctrl-taxi-clearance'
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

const startPractice = () => {
  const { start } = usePracticeStore.getState()
  start(SCENARIO_ID)
  const { sessionId } = usePracticeStore.getState()
  return sessionId
}

describe('practice store', () => {
  beforeEach(() => {
    usePracticeStore.setState({ scenarioId: null, sessionId: null })
  })

  it('gives a started run a uuid session id', () => {
    const sessionId = startPractice()

    expect(sessionId).toMatch(UUID_PATTERN)
  })

  it('gives a restarted run a new session id', () => {
    const firstSessionId = startPractice()

    const secondSessionId = startPractice()

    expect(secondSessionId).not.toBe(firstSessionId)
  })
})
