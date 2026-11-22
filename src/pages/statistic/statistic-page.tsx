import { Activity, Clock, Target, TrendingUp } from 'lucide-react'

import { useUserProgressSummary } from '@/entities/progress'
import { DailyProgressTable, StatCard, StatisticError, StatisticSkeleton } from '@/widgets/statistic'
import { SidebarToggle } from '@/widgets/app-sidebar'

export const StatisticPage = () => {
  const { totals, items, avgScore, practiceRate, latestUpdate, isPending, isError, refetch } = useUserProgressSummary()

  if (isPending) {
    return <StatisticSkeleton />
  }

  if (isError) {
    return <StatisticError onRetry={refetch} />
  }

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
