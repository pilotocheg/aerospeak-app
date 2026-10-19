import type { CSSProperties } from 'react'
import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const toasterStyle = {
  '--normal-bg': 'var(--popover)',
  '--normal-text': 'var(--popover-foreground)',
  '--normal-border': 'var(--border)',
  '--border-radius': 'var(--radius)',
} as CSSProperties

export const Toaster = (props: ToasterProps) => (
  <Sonner
    theme="dark"
    className="toaster group"
    icons={{
      success: <CircleCheckIcon className="size-4" />,
      info: <InfoIcon className="size-4" />,
      warning: <TriangleAlertIcon className="size-4" />,
      error: <OctagonXIcon className="size-4" />,
      loading: <Loader2Icon className="size-4 animate-spin" />,
    }}
    style={toasterStyle}
    toastOptions={{
      classNames: {
        info: 'bg-zinc-800! border-zinc-600! text-zinc-100!',
        success: 'bg-green-950! border-green-700! text-green-100!',
        warning: 'bg-yellow-950! border-yellow-600! text-yellow-100!',
        error: 'bg-red-950! border-red-700! text-red-100!',
      },
    }}
    {...props}
  />
)
