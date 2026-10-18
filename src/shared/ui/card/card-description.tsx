import type { ComponentProps } from 'react'
import { cn } from 'cn'

export const CardDescription = ({ className, ...props }: ComponentProps<'div'>) => (
  <div data-slot="card-description" className={cn('text-sm text-muted-foreground', className)} {...props} />
)
