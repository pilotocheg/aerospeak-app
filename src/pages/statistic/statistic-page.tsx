import { useCallback, useEffect, useRef } from 'react'
import { Activity, Clock, Target, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'

import { useUserDailyProgress, useUserProgress } from '@/entities/progress'
import { DailyProgressTable, StatCard, StatisticError, StatisticSkeleton } from '@/widgets/statistic'
import { SidebarToggle } from '@/widgets/app-sidebar'

const EMPTY_TOTALS = {
  practicedScenarios: 0,
  totalScenarios: 0,
  attempts: 0,
  successfulPhrases: 0,
  successfulPhrasesLast7Days: 0,
}

export const StatisticPage = () => {
  const errorToasted = useRef(false)

  const progressQuery = useUserProgress()
  const dailyQuery = useUserDailyProgress()

  useEffect(() => {
    const hasError = progressQuery.isError || dailyQuery.isError
    if (hasError && !errorToasted.current) {
      errorToasted.current = true
      toast.error('Could not load statistics')
    }
    if (!hasError) {
      errorToasted.current = false
    }
  }, [progressQuery.isError, dailyQuery.isError])

  const isPending = progressQuery.isPending || dailyQuery.isPending
  const isError = progressQuery.isError || dailyQuery.isError

  const refetch = useCallback(() => {
    progressQuery.refetch()
    dailyQuery.refetch()
    errorToasted.current = false
  }, [progressQuery, dailyQuery])

  if (isPending) {
    return <StatisticSkeleton />
  }

  if (isError) {
    return <StatisticError onRetry={refetch} />
  }

  const progress = progressQuery.data
  const items = dailyQuery.data ?? []
  const totals = progress?.totals ?? EMPTY_TOTALS
  const avgScore =
    items.length > 0 ? Math.round(items.reduce((sum, day) => sum + day.averageScore, 0) / items.length) : 0
  const practiceRate =
    totals.totalScenarios > 0 ? Math.round((totals.practicedScenarios / totals.totalScenarios) * 100) : 0

  const latestUpdate = Math.max(progressQuery.dataUpdatedAt ?? 0, dailyQuery.dataUpdatedAt ?? 0)

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 px-2 pt-2 lg:hidden">
        <SidebarToggle />
      </div>
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Your statistics</h2>
          <p className="text-sm text-muted-foreground">Training progress over the last 30 days</p>
        </section>

        <section>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="Practiced scenarios"
              value={totals.practicedScenarios}
              subtitle={practiceRate > 0 ? `${practiceRate}% of ${totals.totalScenarios}` : 'No scenarios yet'}
            />
            <StatCard icon={<Activity className="w-5 h-5" />} label="Attempts" value={totals.attempts} />
            <StatCard
              icon={<Target className="w-5 h-5" />}
              label="Successful phrases"
              value={totals.successfulPhrases}
              subtitle={
                totals.successfulPhrasesLast7Days > 0
                  ? `${totals.successfulPhrasesLast7Days} in the last 7 days`
                  : undefined
              }
            />
            <StatCard icon={<Clock className="w-5 h-5" />} label="Average score" value={avgScore} suffix="/100" />
          </div>
        </section>

        <DailyProgressTable items={items} onRetry={refetch} />

        {latestUpdate > 0 && (
          <p className="text-xs text-muted-foreground text-right">
            Last updated{' '}
            <time dateTime={new Date(latestUpdate).toISOString()}>
              {new Date(latestUpdate).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </time>
          </p>
        )}
      </div>
    </div>
  )
}
