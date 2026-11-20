import { useEffect } from 'react'

import { useStartPractice } from './actions'
import { usePracticeScenarioId } from './selectors'

/** Starts a fresh run whenever the scenario or its variant changes; ready once the store holds this scenario. */
export const usePracticeRun = (scenarioId: string, variant: string | undefined) => {
  const activeScenarioId = usePracticeScenarioId()
  const startPractice = useStartPractice()

  useEffect(() => {
    startPractice(scenarioId)
  }, [scenarioId, variant, startPractice])

  return { isReady: activeScenarioId === scenarioId }
}
