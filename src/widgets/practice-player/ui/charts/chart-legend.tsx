type ChartLegendProps = {
  title: string
  caption?: string
}

/** Aerodrome name and aircraft position in the chart corner, plus the north-up mark. */
export const ChartLegend = ({ title, caption }: ChartLegendProps) => (
  <>
    <div className="pointer-events-none absolute top-2 left-2 rounded bg-background/70 px-2 py-1 text-xs backdrop-blur">
      <p className="font-semibold">{title}</p>
      {caption && <p className="text-muted-foreground">{caption}</p>}
    </div>
    <p className="pointer-events-none absolute top-2 right-3 text-xs font-bold text-slate-300">N ↑</p>
  </>
)
