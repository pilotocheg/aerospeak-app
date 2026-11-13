import { cn } from 'cn'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

type StatCardProps = {
  label: string
  value: string
  caption?: string
  className?: string
}

export const StatCard = ({ label, value, caption, className }: StatCardProps) => (
  <Card className={cn('min-w-[180px] flex-1', className)}>
    <CardHeader>
      <CardDescription className="text-xs font-semibold tracking-wide uppercase">{label}</CardDescription>
      <CardTitle className="text-3xl font-extrabold tabular-nums">{value}</CardTitle>
    </CardHeader>
    {caption && (
      <CardContent>
        <p className="text-xs text-muted-foreground">{caption}</p>
      </CardContent>
    )}
  </Card>
)
