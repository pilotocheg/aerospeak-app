import type { ComponentProps } from 'react'
import { cn } from 'cn'

export const CardContent = ({ className, ...props }: ComponentProps<'div'>) => (
  <div data-slot="card-content" className={cn('flex flex-col gap-3 px-(--card-spacing)', className)} {...props} />
)
