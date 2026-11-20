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

  const completePractice = (scenario: ScenarioDto) => {
    finishPractice()
    const { scenarioScore } = buildSummary(scenario, attemptsByStep)
    recordScenarioResult(scenario.id, scenarioScore)
  }

  return completePractice
}
