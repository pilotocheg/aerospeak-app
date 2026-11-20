import { getAerodromeChart, getChartSpot, getChartUnit } from '@/entities/aerodrome'

import { getSpotCaption } from '../../lib/get-spot-caption'
import { AircraftMarker } from './aircraft-marker'
import { ChartFallback } from './chart-fallback'
import { ChartLegend } from './chart-legend'
import { TaxiwayLabel } from './taxiway-label'

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

  const { icao, name, viewBox, runway, taxiways, taxiwayLabels, aprons, buildings } = chart
  const { d: runwayOutline, centerline, designators } = runway
  const spot = getChartSpot(chart, position)
  const { unit } = getChartUnit(viewBox)

  return (
    <div className="relative min-h-0 flex-1 overflow-hidden bg-sky-950/40">
      <svg
        viewBox={viewBox}
        className="absolute inset-0 size-full"
        role="img"
        aria-label={`${icao} ${name} aerodrome chart`}
      >
        <g className="fill-slate-700/80 stroke-slate-600" strokeWidth={unit * 0.15}>
          {aprons.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g className="fill-slate-500/70">
          {buildings.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g className="fill-none stroke-slate-600" strokeWidth={unit * 0.8} strokeLinecap="round" strokeLinejoin="round">
          {taxiways.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g className="fill-none stroke-yellow-500/60" strokeWidth={unit * 0.12}>
          {taxiways.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <path d={runwayOutline} className="fill-slate-800 stroke-slate-300" strokeWidth={unit * 0.15} />
        <path
          d={centerline}
          className="stroke-slate-100"
          strokeWidth={unit * 0.2}
          strokeDasharray={`${unit * 1.5} ${unit * 1.2}`}
        />
        <g className="fill-white font-bold" fontSize={unit * 3.4} textAnchor="middle" dominantBaseline="central">
          {designators.map((label) => (
            <text key={label.label} x={label.x} y={label.y}>
              {label.label}
            </text>
          ))}
        </g>
        <g fontSize={unit * 2.6} textAnchor="middle" dominantBaseline="central" className="font-bold">
          {taxiwayLabels.map((label) => (
            <TaxiwayLabel key={label.ref} label={label} unit={unit} />
          ))}
        </g>
        {spot && <AircraftMarker spot={spot} size={unit * 4} />}
      </svg>

      <ChartLegend title={`${icao} ${name}`} caption={position && getSpotCaption(position, Boolean(spot))} />
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
