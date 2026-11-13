import { cn } from 'cn'

import type { DailyProgressDto } from '@/shared/api'

type WeekChartProps = {
  days: DailyProgressDto[]
  today: string
}

export const WeekChart = ({ days, today }: WeekChartProps) => {
  const maxAttempts = Math.max(1, ...days.map((day) => day.attempts))
  return (
    <div className="flex items-end justify-between gap-2">
      {days.map((day) => {
        const height = day.attempts > 0 ? Math.max(4, (day.attempts / maxAttempts) * 80) : 4
        const isToday = day.date === today
        const weekday = new Date(`${day.date}T12:00:00Z`).toLocaleDateString('en', { weekday: 'narrow' })
        return (
          <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-xs tabular-nums text-muted-foreground">{day.attempts}</span>
            <div
              className={cn(
                'w-full rounded-md transition-all',
                day.attempts > 0 ? 'bg-primary' : 'bg-muted',
                isToday && 'ring-2 ring-primary ring-offset-2 ring-offset-card',
              )}
              style={{ height: `${height}px` }}
            />
            <span className="text-xs text-muted-foreground">{weekday}</span>
          </div>
        )
      })}
    </div>
  )
}
