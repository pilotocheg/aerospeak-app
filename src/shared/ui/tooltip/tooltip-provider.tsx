import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'

export const TooltipProvider = ({ delay = 300, ...props }: TooltipPrimitive.Provider.Props) => (
  <TooltipPrimitive.Provider data-slot="tooltip-provider" delay={delay} {...props} />
)
