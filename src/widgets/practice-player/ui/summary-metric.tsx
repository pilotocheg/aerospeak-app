type SummaryMetricProps = {
  label: string
  value: string | number
}

export const SummaryMetric = ({ label, value }: SummaryMetricProps) => (
  <div className="rounded-lg bg-card p-3 text-center ring-1 ring-foreground/10">
    <p className="text-xl font-semibold tabular-nums">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
)
