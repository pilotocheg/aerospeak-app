import { getBriefingValue } from '@/entities/scenario'
import type { ScenarioDto, ScenarioStepDto } from '@/shared/api'

import { AerodromeChart } from './aerodrome-chart'
import { PatternDiagram } from './pattern-diagram'
import { TextVisual } from './text-visual'

type StepVisualProps = {
  scenario: ScenarioDto
  step: ScenarioStepDto
}

/** The picture above the controls: drill item, circuit diagram, or the aerodrome chart. */
export const StepVisual = ({ scenario, step }: StepVisualProps) => {
  const airport = getBriefingValue(scenario, 'Airport')

  if (step.visual?.kind === 'text') {
    return <TextVisual text={step.visual.text} caption={step.visual.caption} />
  }
  if (step.visual?.kind === 'pattern') {
    return <PatternDiagram side={step.visual.side} position={step.visual.position} runway={step.visual.runway} />
  }
  if (airport) {
    return <AerodromeChart airport={airport} position={getBriefingValue(scenario, 'Position')} />
  }
  return <TextVisual text={getBriefingValue(scenario, 'Callsign') ?? scenario.title} caption="Your callsign" />
}
