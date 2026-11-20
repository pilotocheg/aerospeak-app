import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { scenarioQueryOptions } from '../api/scenario-query-options'

/**
 * A scenario in a variant (aerodrome, weather, aircraft) picked at random once per mount:
 * every visit to the scenario page gets a new one, and practice runs the same variant.
 * Loads the default variant first, since it lists the keys of all variants.
 */
export const useRandomScenarioVariant = (scenarioId: string) => {
  const [pick] = useState(Math.random)
  const base = useQuery(scenarioQueryOptions(scenarioId))
  const variants = base.data?.variants ?? []
  const hasVariants = variants.length > 1
  const variant = hasVariants ? variants[Math.floor(pick * variants.length)] : undefined
  const picked = useQuery({ ...scenarioQueryOptions(scenarioId, variant), enabled: hasVariants })

  return {
    scenario: hasVariants ? picked.data : base.data,
    isPending: base.isPending || (hasVariants && picked.isPending),
    isError: base.isError || picked.isError,
  }
}
