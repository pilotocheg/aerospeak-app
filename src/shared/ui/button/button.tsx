import { Button as ButtonPrimitive } from '@base-ui/react/button'
import type { VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

import { buttonVariants } from './styles'

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>

export const Button = ({ className, variant = 'default', size = 'default', ...props }: ButtonProps) => (
  <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
)
