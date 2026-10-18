import type { ReactNode } from 'react'

type StatProps = {
  label: string
  children: ReactNode
}

export const Stat = ({ label, children }: StatProps) => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex h-16 items-center">{children}</div>
    <span className="text-[11px] tracking-wide text-muted-foreground uppercase">{label}</span>
  </div>
)
