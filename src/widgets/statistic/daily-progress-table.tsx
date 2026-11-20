import { cn } from 'cn'

import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent } from '@/shared/ui/card'
import { RefreshCw } from 'lucide-react'

type DailyItem = { date: string; attempts: number; successful: number; averageScore: number }

function formatDay(date: string) {
  return new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function isToday(date: string) {
  const d = new Date(date)
  const today = new Date()
  return d.toDateString() === today.toDateString()
}

type DailyProgressTableProps = {
  items: DailyItem[]
  onRetry: () => void
}

export const DailyProgressTable = ({ items, onRetry }: DailyProgressTableProps) => {
  const hasItems = items.length > 0

  return (
    <section>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Daily progress (last 30 days)</h2>
          <p className="text-sm text-muted-foreground">Attempts and successful phrases per day</p>
        </div>
        {!hasItems && (
          <Button variant="outline" onClick={onRetry} size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        )}
      </div>

      {!hasItems ? (
        <Card className="mt-4">
          <CardContent className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              No daily progress data available yet. Complete a scenario to see your stats here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full rounded-md border border-border bg-card">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Attempts
                </th>
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Successful
                </th>
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Avg. score
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((day) => {
                const today = isToday(day.date)
                return (
                  <tr
                    key={day.date}
                    className={cn('border-b border-border transition-colors', today ? 'bg-accent/50' : '')}
                  >
                    <td className="p-3">
                      <p className={cn('font-medium', today ? 'font-semibold' : '')}>
                        {formatDay(day.date)}
                        {today ? ' (today)' : ''}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {day.successful > 0 ? `${day.successful} successful` : '—'}
                      </p>
                    </td>
                    <td className="p-3">
                      <p className="font-medium tabular-nums">{day.attempts}</p>
                    </td>
                    <td className="p-3">
                      <Badge variant={day.successful > 0 ? 'default' : 'secondary'}>{day.successful}</Badge>
                    </td>
                    <td className="p-3">
                      <p className="font-medium text-sm tabular-nums">{day.averageScore.toFixed(1)}</p>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
