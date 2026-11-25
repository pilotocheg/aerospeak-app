import type { ReactNode } from 'react'

import { Skeleton } from '@/shared/ui/skeleton'

type StatProps = {
  label: string
  /** Shows a ring placeholder while the value loads. */
  isPending?: boolean
  children: ReactNode
}

export const Stat = ({ label, isPending = false, children }: StatProps) => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex h-16 items-center">{isPending ? <Skeleton className="size-14 rounded-full" /> : children}</div>
    <span className="text-[11px] tracking-wide text-muted-foreground uppercase">{label}</span>
  </div>
)
