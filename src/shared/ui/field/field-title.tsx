import type { ComponentProps } from 'react'
import { cn } from 'cn'

export const FieldTitle = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="field-label"
    className={cn(
      'flex w-fit items-center gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50',
      className,
    )}
    {...props}
  />
)
