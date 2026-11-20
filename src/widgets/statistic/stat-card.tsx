import type { ReactNode } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

type StatCardProps = {
  icon: ReactNode
  label: string
  value: number | string
  subtitle?: string
  suffix?: string
}

export const StatCard = ({ icon, label, value, subtitle, suffix }: StatCardProps) => (
  <Card className="p-4">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-normal text-muted-foreground">{label}</CardTitle>
      {icon && <div className="text-muted-foreground">{icon}</div>}
    </CardHeader>
    <CardContent className="pt-0">
      <div className="text-2xl font-bold tabular-nums">
        {value}
        {suffix}
      </div>
      {subtitle && <CardDescription className="mt-1">{subtitle}</CardDescription>}
    </CardContent>
  </Card>
)

StatCard.displayName = 'StatCard'
