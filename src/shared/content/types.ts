import type { ScenarioDto, ScenarioStepDto } from '@/shared/api'

export type PatternPosition = 'upwind' | 'crosswind' | 'downwind' | 'base' | 'final'

/** Frontend-only content extension: what the practice screen shows for a step. */
export type StepVisual =
  | { kind: 'text'; text: string; caption?: string }
  | { kind: 'pattern'; side: 'left' | 'right'; position: PatternPosition; runway: string }

export type ScenarioStep = ScenarioStepDto & { visual?: StepVisual }

export type Scenario = Omit<ScenarioDto, 'steps'> & { steps: ScenarioStep[] }

export type SectionIcon = 'list-ordered' | 'route' | 'sun' | 'radio-tower' | 'cloud'

/** Top-level grouping of packs (frontend only, the backend has no sections). */
export type Section = {
  id: string
  title: string
  icon: SectionIcon
  description: string
  packIds: string[]
  comingSoon?: boolean
}
