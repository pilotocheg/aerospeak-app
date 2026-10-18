type ScoreBarProps = {
  /** 0..100 or undefined before the first attempt. */
  score?: number
}

export const ScoreBar = ({ score }: ScoreBarProps) => (
  <div className="flex items-center gap-3 text-sm font-semibold tabular-nums">
    <span>0</span>
    <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted">
      <div
        className="absolute inset-y-0 left-0 bg-linear-to-r from-red-600 via-amber-400 to-green-500 transition-all duration-500"
        style={{ width: `${score ?? 0}%`, backgroundSize: `${score ? (100 / score) * 100 : 100}% 100%` }}
      />
    </div>
    <span>100</span>
  </div>
)
