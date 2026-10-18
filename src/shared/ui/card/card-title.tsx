import type { ComponentProps } from 'react'
import { cn } from 'cn'

export const CardTitle = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="card-title"
    className={cn('font-heading text-base leading-normal font-medium group-data-[size=sm]/card:text-sm', className)}
    {...props}
  />
)
