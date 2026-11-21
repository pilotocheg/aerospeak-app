import type { ReactNode } from 'react'

type EmptyStateProps = {
  message: string
  /** Usually a button back to a list. */
  action?: ReactNode
}

export const EmptyState = ({ message, action }: EmptyStateProps) => (
  <div className="flex flex-1 flex-col items-center justify-center gap-4 text-muted-foreground">
    <p>{message}</p>
    {action}
  </div>
)
