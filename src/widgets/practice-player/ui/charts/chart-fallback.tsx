type ChartFallbackProps = {
  title?: string
  caption?: string
}

/** Shown instead of a chart for an aerodrome without chart data. */
export const ChartFallback = ({ title, caption }: ChartFallbackProps) => (
  <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-1 bg-sky-950/40 text-center">
    {title && <p className="font-semibold">{title}</p>}
    {caption && <p className="text-sm text-muted-foreground">{caption}</p>}
  </div>
)
