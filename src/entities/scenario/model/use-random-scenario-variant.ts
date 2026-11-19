import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { scenarioQueryOptions } from '../api/scenario-queries'

/**
 * A scenario in a variant (aerodrome, weather, aircraft) picked at random once per mount:
 * every visit to the scenario page gets a new one, and practice runs the same variant.
 * Loads the default variant first, since it lists the keys of all variants.
 */
export const useRandomScenarioVariant = (scenarioId: string) => {
  const [pick] = useState(Math.random)
  const base = useQuery(scenarioQueryOptions(scenarioId))
  const variants = base.data?.variants ?? []
  const variant = variants.length > 1 ? variants[Math.floor(pick * variants.length)] : undefined
  const picked = useQuery({ ...scenarioQueryOptions(scenarioId, variant), enabled: Boolean(variant) })

  return {
    scenario: variant ? picked.data : base.data,
    isPending: base.isPending || (Boolean(variant) && picked.isPending),
    isError: base.isError || picked.isError,
  }
}
