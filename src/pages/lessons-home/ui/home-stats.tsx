import { Link } from '@tanstack/react-router'

import { Button } from '@/shared/ui/button'
import { ScoreRing } from '@/shared/ui/score-ring'
import { Skeleton } from '@/shared/ui/skeleton'

import { StatusMetric } from './status-metric'

type HomeStatsProps = {
  isPending: boolean
  isError: boolean
  onRetry: () => void
  practiced: number
  total: number
  averageBest: number | null
}

const ringPlaceholder = <Skeleton className="size-14 rounded-full" />

const getCompletionPercent = (practiced: number, total: number) => (total ? Math.round((practiced / total) * 100) : 0)

/** Overall progress at a glance, with a link to the full statistics page. */
export const HomeStats = ({ isPending, isError, onRetry, practiced, total, averageBest }: HomeStatsProps) => {
  const completionPercent = getCompletionPercent(practiced, total)

  return (
    <section
      aria-label="Your progress"
      className="flex flex-col rounded-xl bg-card p-5 ring-1 ring-foreground/10 lg:only:col-span-full"
    >
      {isError ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
          <p>Could not load your progress.</p>
          <Button variant="outline" size="sm" onClick={onRetry}>
            Try again
          </Button>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-around gap-4">
          <StatusMetric label="Progress" isPending={isPending} placeholder={ringPlaceholder}>
            <ScoreRing value={completionPercent} size={56} />
          </StatusMetric>
          <StatusMetric label="Practiced" isPending={isPending} placeholder={<Skeleton className="h-14 w-14" />}>
            <span className="flex h-14 items-center text-2xl font-bold tabular-nums">
              {practiced}/{total}
            </span>
          </StatusMetric>
          <StatusMetric label="Avg score" isPending={isPending} placeholder={ringPlaceholder}>
            <ScoreRing value={averageBest} size={56} />
          </StatusMetric>
        </div>
      )}
      <Link to="/statistic" className="mt-4 self-end text-sm text-primary underline underline-offset-4">
        View full statistics
      </Link>
    </section>
  )
}
