import type { ComponentProps } from 'react'
import { cn } from 'cn'

export const FieldContent = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="field-content"
    className={cn('group/field-content flex flex-1 flex-col gap-1 leading-snug', className)}
    {...props}
  />
)
