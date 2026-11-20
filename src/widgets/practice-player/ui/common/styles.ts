import { cva } from 'class-variance-authority'

export const calloutVariants = cva('flex gap-3 rounded-lg border p-3 text-sm', {
  variants: {
    tone: {
      destructive: 'border-destructive/40 bg-destructive/10 text-destructive',
      warning: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300',
      brand: 'border-brand/40 bg-brand/10 [&>svg]:text-brand',
    },
  },
})
