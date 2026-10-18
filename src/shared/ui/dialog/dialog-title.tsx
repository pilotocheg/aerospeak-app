import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { cn } from 'cn'

export const DialogTitle = ({ className, ...props }: DialogPrimitive.Title.Props) => (
  <DialogPrimitive.Title
    data-slot="dialog-title"
    className={cn('font-heading text-lg leading-none font-semibold', className)}
    {...props}
  />
)
