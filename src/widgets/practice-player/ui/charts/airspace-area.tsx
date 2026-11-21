import type { AirspaceChartData } from '@/entities/aerodrome'

type AirspaceAreaProps = {
  area: AirspaceChartData['areas'][number]
  unit: number
}

/** A CTR / MCTR outline (closed path, dashed) or a boundary line, with its label along an edge. */
export const AirspaceArea = ({ area, unit }: AirspaceAreaProps) => {
  const { label, d, labelPosition } = area
  const { x, y, angle } = labelPosition
  const isClosed = d.endsWith('Z')

  return (
    <g>
      <path
        d={d}
        className={isClosed ? 'fill-rose-400/10 stroke-sky-400' : 'fill-none stroke-sky-400'}
        strokeWidth={unit * 0.25}
        strokeDasharray={isClosed ? `${unit * 1.2} ${unit * 0.8}` : undefined}
      />
      <text
        transform={`translate(${x} ${y}) rotate(${angle})`}
        className="fill-sky-300 font-semibold"
        fontSize={unit * 1.9}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  )
}
