import { useQueryClient } from '@tanstack/react-query'

import { useRecordScenarioResult, progressKeys } from '@/entities/progress'
import type { ScenarioDto } from '@/shared/api'

import { useFinishPractice } from './actions'
import { useAttemptsByStep } from './selectors'
import { buildSummary } from './summary'

/** The run's summary, and ending the run with its scenario score stored in the saved progress. */
export const useCompletePractice = (scenario: ScenarioDto) => {
  const queryClient = useQueryClient()
  const finishPractice = useFinishPractice()
  const recordScenarioResult = useRecordScenarioResult()
  const attemptsByStep = useAttemptsByStep()
  const summary = buildSummary(scenario, attemptsByStep)

  const completePractice = () => {
    finishPractice()
    recordScenarioResult(scenario.id, summary.scenarioScore)
    // Scenario complete: invalidate progress cache so totals / daily stats refetch.
    void queryClient.invalidateQueries({ queryKey: progressKeys.all })
  }

  return { summary, completePractice }
}
