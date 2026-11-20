import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { VariantProps } from 'class-variance-authority'

import { calloutVariants } from './styles'

type CalloutProps = Required<VariantProps<typeof calloutVariants>> & {
  icon: LucideIcon
  children: ReactNode
}

/** Bordered, tinted notice with an icon: critical misses, order problems, ATC corrections. */
export const Callout = ({ tone, icon: Icon, children }: CalloutProps) => (
  <div className={calloutVariants({ tone })}>
    <Icon className="size-5 shrink-0" />
    {children}
  </div>
)
