import { Button as ButtonPrimitive } from '@base-ui/react/button'
import type { VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

import { buttonVariants } from './styles'

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>

// A custom `render` (e.g. a router Link) is not a native <button>, so nativeButton defaults to false then.
export const Button = ({ className, variant = 'default', size = 'default', nativeButton, ...props }: ButtonProps) => (
  <ButtonPrimitive
    data-slot="button"
    nativeButton={nativeButton ?? !props.render}
    className={cn(buttonVariants({ variant, size, className }))}
    {...props}
  />
)
