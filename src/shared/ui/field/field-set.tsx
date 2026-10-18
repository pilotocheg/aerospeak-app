import type { ComponentProps } from 'react'
import { cn } from 'cn'

export const FieldSet = ({ className, ...props }: ComponentProps<'fieldset'>) => (
  <fieldset
    data-slot="field-set"
    className={cn(
      'flex flex-col gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
      className,
    )}
    {...props}
  />
)
