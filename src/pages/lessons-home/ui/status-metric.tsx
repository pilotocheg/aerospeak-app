import type { ReactNode } from 'react'
import { cn } from 'cn'

type StatusMetricProps = {
  label: string
  isPending: boolean
  /** Skeleton shown while the packs and the progress load. */
  placeholder: ReactNode
  className?: string
  children: ReactNode
}

export const StatusMetric = ({ label, isPending, placeholder, className, children }: StatusMetricProps) => (
  <div className={cn('flex flex-col items-center gap-2', className)}>
    {isPending ? placeholder : children}
    <span className="text-xs tracking-wide text-muted-foreground uppercase">{label}</span>
  </div>
)
