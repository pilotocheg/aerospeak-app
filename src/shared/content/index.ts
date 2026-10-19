import packsFile from '../../../content/packs.json'
import sectionsFile from '../../../content/sections.json'
import type { PracticePackDto } from '@/shared/api'

import type { Scenario, Section } from './types'

export type * from './types'

type PackMeta = Omit<PracticePackDto, 'scenarios'>

const scenarioModules = import.meta.glob<Scenario>('../../../content/scenarios/**/*.json', {
  eager: true,
  import: 'default',
})

// Files are named with an order prefix (01-..., 02-...), so path order is scenario order.
const scenarios = Object.entries(scenarioModules)
  .toSorted(([a], [b]) => a.localeCompare(b))
  .map(([, scenario]) => scenario)

/** Packs with scenario summaries, shaped like GET /packs. */
export const localPacks: PracticePackDto[] = (packsFile as PackMeta[])
  .toSorted((a, b) => a.order - b.order)
  .map((pack) => ({
    ...pack,
    scenarios: scenarios
      .filter((scenario) => scenario.packId === pack.id)
      .map(({ id, title, packId, difficulty, estimatedDurationSec, objective, steps }) => ({
        id,
        title,
        packId,
        difficulty,
        estimatedDurationSec,
        objective,
        stepCount: steps.length,
      })),
  }))

export const findLocalScenario = (id: string) => scenarios.find((scenario) => scenario.id === id)

export const sections = sectionsFile as Section[]
