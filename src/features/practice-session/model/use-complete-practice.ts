import { useQueryClient } from '@tanstack/react-query'

import { progressKeys } from '@/entities/progress'
import type { ScenarioDto } from '@/shared/api'

import { useFinishPractice } from './actions'
import { useAttemptsByStep } from './selectors'
import { buildSummary } from './summary'

/** The run's summary, and ending the run so the account progress shows it. */
export const useCompletePractice = (scenario: ScenarioDto) => {
  const queryClient = useQueryClient()
  const finishPractice = useFinishPractice()
  const attemptsByStep = useAttemptsByStep()
  const summary = buildSummary(scenario, attemptsByStep)

  const completePractice = () => {
    finishPractice()
    // The backend counted the run with its last scored attempt: refetch progress (home, sections, statistics).
    void queryClient.invalidateQueries({ queryKey: progressKeys.all })
  }

  return { summary, completePractice }
}
