import type { ComponentProps } from 'react'
import { cn } from 'cn'

export const CardFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="card-footer"
    className={cn('flex items-center rounded-b-xl px-(--card-spacing) [.border-t]:pt-(--card-spacing)', className)}
    {...props}
  />
)
