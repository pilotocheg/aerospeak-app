import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible'
import { cn } from 'cn'

export const Collapsible = ({ className, ...props }: CollapsiblePrimitive.Root.Props & { className?: string }) => (
  <CollapsiblePrimitive.Root data-slot="collapsible" className={cn(className)} {...props} />
)

export const CollapsibleTrigger = ({ className, ...props }: CollapsiblePrimitive.Trigger.Props & { className?: string }) => (
  <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" className={cn(className)} {...props} />
)

export const CollapsibleContent = ({ className, ...props }: CollapsiblePrimitive.Panel.Props & { className?: string }) => (
  <CollapsiblePrimitive.Panel data-slot="collapsible-content" className={cn(className)} {...props} />
)

