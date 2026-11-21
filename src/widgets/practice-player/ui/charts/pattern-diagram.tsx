import type { PatternVisualDto } from '@/shared/api'

import { AircraftMarker } from './aircraft-marker'

type PatternPosition = PatternVisualDto['position']

type PatternDiagramProps = {
  side: 'left' | 'right'
  position: PatternPosition
  runway: string
}

// Left-hand circuit drawn north-up with the landing direction to the north; right-hand is mirrored.
const RUNWAY_X = 250
const LEGS: Record<PatternPosition, { x: number; y: number; heading: number }> = {
  // Crossing the runway midpoint towards the downwind side.
  overhead: { x: 250, y: 150, heading: 270 },
  upwind: { x: 250, y: 46, heading: 0 },
  crosswind: { x: 180, y: 40, heading: 270 },
  downwind: { x: 110, y: 150, heading: 180 },
  base: { x: 180, y: 260, heading: 90 },
  final: { x: 250, y: 247, heading: 0 },
  // Climbing straight out past the circuit.
  leaving: { x: 250, y: 20, heading: 0 },
}
const CIRCUIT = 'M250 70 V52 Q250 40 238 40 H122 Q110 40 110 52 V248 Q110 260 122 260 H238 Q250 260 250 248 V234'
const ARROWS = ['M176 36 L168 40 L176 44', 'M106 146 L110 154 L114 146', 'M184 256 L192 260 L184 264']

export const PatternDiagram = ({ side, position, runway }: PatternDiagramProps) => {
  const mirror = side === 'right' ? `translate(${RUNWAY_X * 2} 0) scale(-1 1)` : undefined
  const spot = LEGS[position]
  const viewBox = side === 'left' ? '90 0 180 276' : '230 0 180 276'

  return (
    <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-sky-950/40">
      <svg
        viewBox={viewBox}
        className="size-full max-h-full"
        role="img"
        aria-label={`${side}-hand circuit, runway ${runway}`}
      >
        <g transform={mirror}>
          <path d={CIRCUIT} fill="none" className="stroke-slate-400" strokeWidth="1.6" strokeDasharray="5 4" />
          {ARROWS.map((d) => (
            <path key={d} d={d} fill="none" className="stroke-slate-300" strokeWidth="1.6" strokeLinejoin="round" />
          ))}
        </g>
        <rect
          x={RUNWAY_X - 6}
          y="72"
          width="12"
          height="160"
          rx="1"
          className="fill-slate-800 stroke-slate-300"
          strokeWidth="0.8"
        />
        <path d={`M${RUNWAY_X} 80 V224`} className="stroke-slate-100" strokeWidth="1" strokeDasharray="6 5" />
        <text x={RUNWAY_X} y="226" textAnchor="middle" className="fill-white text-[7px] font-bold">
          {runway}
        </text>
        <g transform={mirror}>
          <AircraftMarker spot={spot} size={24} />
        </g>
      </svg>
      <p className="pointer-events-none absolute top-2 left-2 rounded bg-background/70 px-2 py-1 text-xs backdrop-blur">
        <span className="font-semibold">{side === 'left' ? 'Left' : 'Right'}-hand circuit</span>
        <span className="text-muted-foreground"> · runway {runway}</span>
      </p>
    </div>
  )
}
