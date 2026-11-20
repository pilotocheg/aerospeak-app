import { useNavigate } from '@tanstack/react-router'

import { findSectionByPackId } from '@/entities/section'
import type { ScenarioDto } from '@/shared/api'

/** Leaves practice for the scenario's section with the scenario selected, or for all sections. */
export const useClosePractice = (scenario: ScenarioDto) => {
  const navigate = useNavigate()
  const sectionId = findSectionByPackId(scenario.packId)?.id

  const closePractice = async () => {
    if (!sectionId) {
      await navigate({ to: '/lessons' })
      return
    }
    await navigate({ to: '/lessons/$sectionId', params: { sectionId }, search: { scenario: scenario.id } })
  }

  return { sectionId, closePractice }
}
