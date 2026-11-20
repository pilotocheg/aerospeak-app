import type { AerodromeChartData } from '@/entities/aerodrome'

type TaxiwayLabelProps = {
  label: AerodromeChartData['taxiwayLabels'][number]
  unit: number
}

/** Yellow-on-black taxiway sign, as wide as its letters. */
export const TaxiwayLabel = ({ label, unit }: TaxiwayLabelProps) => {
  const { ref, x, y } = label
  const letterCount = ref.length

  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x={-unit * (0.9 + letterCount * 0.85)}
        y={-unit * 1.7}
        width={unit * (1.8 + letterCount * 1.7)}
        height={unit * 3.4}
        rx={unit * 0.4}
        className="fill-black stroke-yellow-400"
        strokeWidth={unit * 0.15}
      />
      <text className="fill-yellow-400">{ref}</text>
    </g>
  )
}
