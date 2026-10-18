import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import type { VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

import { badgeVariants } from './styles'

type BadgeProps = useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>

export const Badge = ({ className, variant = 'default', render, ...props }: BadgeProps) =>
  useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>({ className: cn(badgeVariants({ variant }), className) }, props),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  })
