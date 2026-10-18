import { Plane } from 'lucide-react'

type AerodromeChartProps = {
  airport?: string
  position?: string
}

/** Placeholder until real aerodrome charts for EPPO and EPPI are added. */
export const AerodromeChart = ({ airport, position }: AerodromeChartProps) => (
  <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-sky-950/40">
    <svg viewBox="0 0 400 300" className="absolute inset-0 size-full opacity-40" preserveAspectRatio="xMidYMid slice">
      <g className="stroke-slate-500" strokeWidth="1" fill="none">
        <path d="M40 210 L360 110" strokeWidth="18" className="stroke-slate-700" />
        <path d="M40 210 L360 110" strokeDasharray="10 10" className="stroke-slate-300" />
        <path d="M120 186 L150 240 L250 240 L280 155" strokeWidth="6" className="stroke-slate-600" />
        <rect x="150" y="240" width="100" height="36" className="fill-slate-700 stroke-slate-600" />
      </g>
    </svg>
    <div className="relative flex flex-col items-center gap-2 rounded-lg bg-background/70 px-6 py-4 text-center backdrop-blur">
      <Plane className="size-6 text-primary" />
      <p className="font-semibold">{airport ?? 'Aerodrome'}</p>
      {position && <p className="text-sm text-muted-foreground">{position}</p>}
      <p className="text-xs text-muted-foreground">Aerodrome chart coming soon</p>
    </div>
  </div>
)
