import { Activity, Clock, Target, TrendingUp } from 'lucide-react'

import { useUser } from '@/features/auth'
import { useUserProgressSummary } from '@/entities/progress'
import { DailyProgressTable, StatCard, StatisticError, StatisticSkeleton } from '@/widgets/statistic'

import { StatisticLayout } from './ui/statistic-layout'

export const StatisticPage = () => {
  const user = useUser()
  const uid = user?.id ?? ''
  const { totals, items, avgScore, practiceRate, latestUpdate, isPending, isError, refetch } =
    useUserProgressSummary(uid)

  const updatedAt = new Date(latestUpdate)

  if (isPending) {
    return (
      <StatisticLayout>
        <StatisticSkeleton />
      </StatisticLayout>
    )
  }

  if (isError) {
    return (
      <StatisticLayout>
        <StatisticError onRetry={refetch} />
      </StatisticLayout>
    )
  }

  return (
    <StatisticLayout>
      <section className="space-y-2">
        <h1 className="text-lg font-semibold">Your statistics</h1>
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
          <time dateTime={updatedAt.toISOString()}>
            {updatedAt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
          </time>
        </p>
      )}
    </StatisticLayout>
  )
}
