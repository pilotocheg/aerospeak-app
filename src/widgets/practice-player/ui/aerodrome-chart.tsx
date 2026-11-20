import { getAerodromeChart, getChartSpot, getChartUnit } from '@/entities/aerodrome'

import { getSpotCaption } from '../lib/get-spot-caption'
import { AircraftMarker } from './aircraft-marker'
import { ChartFallback } from './chart-fallback'
import { ChartLegend } from './chart-legend'

type AerodromeChartProps = {
  airport?: string
  position?: string
}

/** Simplified north-up airport diagram with the aircraft at the briefing position. */
export const AerodromeChart = ({ airport, position }: AerodromeChartProps) => {
  const chart = getAerodromeChart(airport)

  if (!chart) {
    return <ChartFallback title={airport} caption={position} />
  }

  const spot = getChartSpot(chart, position)
  const { unit } = getChartUnit(chart.viewBox)

  return (
    <div className="relative min-h-0 flex-1 overflow-hidden bg-sky-950/40">
      <svg
        viewBox={chart.viewBox}
        className="absolute inset-0 size-full"
        role="img"
        aria-label={`${chart.icao} ${chart.name} aerodrome chart`}
      >
        <g className="fill-slate-700/80 stroke-slate-600" strokeWidth={unit * 0.15}>
          {chart.aprons.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g className="fill-slate-500/70">
          {chart.buildings.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g className="fill-none stroke-slate-600" strokeWidth={unit * 0.8} strokeLinecap="round" strokeLinejoin="round">
          {chart.taxiways.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g className="fill-none stroke-yellow-500/60" strokeWidth={unit * 0.12}>
          {chart.taxiways.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <path d={chart.runway.d} className="fill-slate-800 stroke-slate-300" strokeWidth={unit * 0.15} />
        <path
          d={chart.runway.centerline}
          className="stroke-slate-100"
          strokeWidth={unit * 0.2}
          strokeDasharray={`${unit * 1.5} ${unit * 1.2}`}
        />
        <g className="fill-white font-bold" fontSize={unit * 3.4} textAnchor="middle" dominantBaseline="central">
          {chart.runway.designators.map((label) => (
            <text key={label.label} x={label.x} y={label.y}>
              {label.label}
            </text>
          ))}
        </g>
        <g fontSize={unit * 2.6} textAnchor="middle" dominantBaseline="central" className="font-bold">
          {chart.taxiwayLabels.map((label) => (
            <g key={label.ref} transform={`translate(${label.x} ${label.y})`}>
              <rect
                x={-unit * (0.9 + label.ref.length * 0.85)}
                y={-unit * 1.7}
                width={unit * (1.8 + label.ref.length * 1.7)}
                height={unit * 3.4}
                rx={unit * 0.4}
                className="fill-black stroke-yellow-400"
                strokeWidth={unit * 0.15}
              />
              <text className="fill-yellow-400">{label.ref}</text>
            </g>
          ))}
        </g>
        {spot && <AircraftMarker spot={spot} size={unit * 4} />}
      </svg>

      <ChartLegend
        title={`${chart.icao} ${chart.name}`}
        caption={position && getSpotCaption(position, Boolean(spot))}
      />
      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noreferrer"
        className="absolute right-2 bottom-1 text-[10px] text-slate-400 hover:underline"
      >
        © OpenStreetMap contributors, simplified, not for navigation
      </a>
    </div>
  )
}
