import { useRecordScenarioResult } from '@/entities/progress'
import type { ScenarioDto } from '@/shared/api'

import { useFinishPractice } from './actions'
import { usePracticeStore } from './practice-store'
import { buildSummary } from './summary'

/** Ends the run and stores its scenario score in the saved progress. */
export const useCompletePractice = () => {
  const finishPractice = useFinishPractice()
  const recordScenarioResult = useRecordScenarioResult()

  return (scenario: ScenarioDto) => {
    finishPractice()
    const { attemptsByStep } = usePracticeStore.getState()
    recordScenarioResult(scenario.id, buildSummary(scenario, attemptsByStep).scenarioScore)
  }
}
