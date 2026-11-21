import type { ReactNode } from 'react'
import { cn } from 'cn'

type PanelProps = {
  className?: string
  children: ReactNode
}

export const Panel = ({ className, children }: PanelProps) => (
  <div className={cn('rounded-lg bg-card p-4 ring-1 ring-foreground/10', className)}>{children}</div>
)
