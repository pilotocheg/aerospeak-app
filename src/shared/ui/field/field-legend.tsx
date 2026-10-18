import type { ComponentProps } from 'react'
import { cn } from 'cn'

type FieldLegendProps = ComponentProps<'legend'> & { variant?: 'legend' | 'label' }

export const FieldLegend = ({ className, variant = 'legend', ...props }: FieldLegendProps) => (
  <legend
    data-slot="field-legend"
    data-variant={variant}
    className={cn('mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base', className)}
    {...props}
  />
)
