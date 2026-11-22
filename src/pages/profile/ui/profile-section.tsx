import { cn } from 'cn'
import type { ReactNode } from 'react'

type ProfileSectionProps = {
  title: string
  children: ReactNode
  danger?: boolean
  className?: string
}

export const ProfileSection = ({ title, children, danger, className }: ProfileSectionProps) => (
  <section
    className={cn(
      'space-y-4 rounded-xl bg-card p-5 ring-1',
      danger ? 'ring-destructive/30' : 'ring-foreground/10',
      className,
    )}
  >
    <h2 className="text-lg font-semibold">{title}</h2>
    {children}
  </section>
)
