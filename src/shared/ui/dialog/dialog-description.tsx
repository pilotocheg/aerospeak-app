import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { cn } from 'cn'

export const DialogDescription = ({ className, ...props }: DialogPrimitive.Description.Props) => (
  <DialogPrimitive.Description
    data-slot="dialog-description"
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
)
