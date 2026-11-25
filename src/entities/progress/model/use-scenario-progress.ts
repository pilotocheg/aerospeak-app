import { useQuery } from '@tanstack/react-query'

import { getProgressQueryOptions } from '../api/get-progress'

/** Account progress of one scenario: undefined before its first attempt. */
export const useScenarioProgress = (uid: string, scenarioId: string) => {
  const { data: progress, isPending } = useQuery({
    ...getProgressQueryOptions(uid),
    select: ({ scenarios }) => scenarios.find((scenario) => scenario.scenarioId === scenarioId),
    enabled: Boolean(uid),
  })

  return { progress, isPending }
}
