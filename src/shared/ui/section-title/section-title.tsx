import type { ReactNode } from 'react'
import { cn } from 'cn'

type SectionTitleProps = {
  as?: 'h2' | 'h3' | 'p'
  className?: string
  children: ReactNode
}

/** Small uppercase label above a block of content. */
export const SectionTitle = ({ as: Tag = 'h3', className, children }: SectionTitleProps) => (
  <Tag className={cn('text-xs font-semibold tracking-wide text-muted-foreground uppercase', className)}>{children}</Tag>
)
