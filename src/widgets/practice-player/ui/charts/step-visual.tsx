import { getBriefingValue } from '@/entities/scenario'
import type { ScenarioDto, ScenarioStepDto } from '@/shared/api'

import { AerodromeChart } from './aerodrome-chart'
import { AirspaceChart } from './airspace-chart'
import { PatternDiagram } from './pattern-diagram'
import { TextVisual } from './text-visual'

type StepVisualProps = {
  scenario: ScenarioDto
  step: ScenarioStepDto
}

/**
 * The picture above the controls: drill item, or where the aircraft is: in the aerodrome airspace
 * (VFR chart), in the circuit (circuit diagram) or on the ground (aerodrome chart).
 */
export const StepVisual = ({ scenario, step }: StepVisualProps) => {
  const { visual } = step
  const airport = getBriefingValue(scenario, 'Airport')

  if (visual?.kind === 'text') {
    return <TextVisual text={visual.text} caption={visual.caption} />
  }
  if (visual?.kind === 'pattern') {
    return <PatternDiagram side={visual.side} position={visual.position} runway={visual.runway} />
  }
  if (visual?.kind === 'airspace') {
    return <AirspaceChart airport={airport} point={visual.point} direction={visual.direction} />
  }
  if (airport) {
    return <AerodromeChart airport={airport} position={getBriefingValue(scenario, 'Position')} />
  }
  return <TextVisual text={getBriefingValue(scenario, 'Callsign') ?? scenario.title} caption="Your callsign" />
}
