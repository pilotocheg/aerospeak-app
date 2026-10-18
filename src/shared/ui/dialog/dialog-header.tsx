import type { ComponentProps } from 'react'
import { cn } from 'cn'

export const DialogHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div data-slot="dialog-header" className={cn('flex flex-col gap-2', className)} {...props} />
)
