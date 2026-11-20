import type { AirspacePoint } from '@/entities/aerodrome'

import { getVfrLabelPlacement } from '../../lib/get-vfr-label-placement'

type VfrPointMarkerProps = {
  point: AirspacePoint
  unit: number
  /** The point the aircraft is over: bigger and highlighted. */
  isActive: boolean
}

export const VfrPointMarker = ({ point, unit, isActive }: VfrPointMarkerProps) => {
  const { name, x, y } = point
  const labelOffset = unit * (isActive ? 3.4 : 1.8)
  const label = getVfrLabelPlacement(point, labelOffset)

  return (
    <g transform={`translate(${x} ${y})`}>
      <circle
        r={unit * (isActive ? 1.3 : 0.9)}
        className={isActive ? 'fill-yellow-400 stroke-black' : 'fill-slate-900 stroke-rose-400'}
        strokeWidth={unit * 0.35}
      />
      <text
        x={label.x}
        y={label.y}
        textAnchor={label.textAnchor}
        className={isActive ? 'fill-yellow-300 stroke-slate-950' : 'fill-rose-300 stroke-slate-950'}
        strokeWidth={unit * 0.4}
        paintOrder="stroke"
      >
        {name.toUpperCase()}
      </text>
    </g>
  )
}
