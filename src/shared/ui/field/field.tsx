import type { ComponentProps } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

import { fieldVariants } from './styles'

type FieldProps = ComponentProps<'div'> & VariantProps<typeof fieldVariants>

export const Field = ({ className, orientation = 'vertical', ...props }: FieldProps) => (
  <div
    role="group"
    data-slot="field"
    data-orientation={orientation}
    className={cn(fieldVariants({ orientation }), className)}
    {...props}
  />
)
