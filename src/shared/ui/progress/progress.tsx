import { Progress as ProgressPrimitive } from '@base-ui/react/progress'
import { cn } from 'cn'

type ProgressProps = ProgressPrimitive.Root.Props & { indicatorClassName?: string }

export const Progress = ({ className, indicatorClassName, children, value, ...props }: ProgressProps) => (
  <ProgressPrimitive.Root
    value={value}
    data-slot="progress"
    className={cn('flex flex-wrap gap-3', className)}
    {...props}
  >
    {children}
    <ProgressPrimitive.Track
      data-slot="progress-track"
      className="relative flex h-1.5 w-full items-center overflow-x-hidden rounded-full bg-muted"
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn('h-full bg-primary transition-all', indicatorClassName)}
      />
    </ProgressPrimitive.Track>
  </ProgressPrimitive.Root>
)
