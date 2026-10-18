import { cn } from 'cn'

type ScoreRingProps = {
  /** 0..100, or null when there is no score yet. */
  value: number | null
  label?: string
  size?: number
  className?: string
}

const colorFor = (value: number) =>
  value >= 75
    ? 'stroke-green-500'
    : value >= 60
      ? 'stroke-lime-500'
      : value >= 45
        ? 'stroke-amber-500'
        : 'stroke-red-500'

export const ScoreRing = ({ value, label, size = 56, className }: ScoreRingProps) => {
  const stroke = Math.max(3, size / 14)
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - (value ?? 0) / 100)

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={stroke} className="stroke-muted" />
        {value !== null && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={cn('transition-all', colorFor(value))}
          />
        )}
      </svg>
      <span className="absolute text-xs font-semibold tabular-nums" style={{ fontSize: size / 4.2 }}>
        {label ?? (value === null ? '–' : `${value}%`)}
      </span>
    </div>
  )
}
