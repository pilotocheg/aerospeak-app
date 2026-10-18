import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { cn } from 'cn'
import { XIcon } from 'lucide-react'

import { Button } from '@/shared/ui/button'

import { DialogOverlay } from './dialog-overlay'

type DialogContentProps = DialogPrimitive.Popup.Props & { showCloseButton?: boolean }

export const DialogContent = ({ className, children, showCloseButton = true, ...props }: DialogContentProps) => (
  <DialogPrimitive.Portal data-slot="dialog-portal">
    <DialogOverlay />
    <DialogPrimitive.Popup
      data-slot="dialog-content"
      className={cn(
        'fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100dvh-2rem)] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-6 overflow-y-auto rounded-xl bg-popover p-6 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-md data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          data-slot="dialog-close"
          render={<Button variant="ghost" className="absolute top-4 right-4" size="icon-sm" />}
        >
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Popup>
  </DialogPrimitive.Portal>
)
