import { useRecordScenarioResult } from '@/entities/progress'
import type { ScenarioDto } from '@/shared/api'

import { useFinishPractice } from './actions'
import { useAttemptsByStep } from './selectors'
import { buildSummary } from './summary'

/** Ends the run and stores its scenario score in the saved progress. */
export const useCompletePractice = () => {
  const finishPractice = useFinishPractice()
  const recordScenarioResult = useRecordScenarioResult()
  const attemptsByStep = useAttemptsByStep()

  return (scenario: ScenarioDto) => {
    finishPractice()
    recordScenarioResult(scenario.id, buildSummary(scenario, attemptsByStep).scenarioScore)
  }
}
