import { Link } from '@tanstack/react-router'

import { useSectionProgress } from '@/features/section-progress'
import { ScoreRing } from '@/shared/ui/score-ring'
import { Skeleton } from '@/shared/ui/skeleton'

import { StatusMetric } from './status-metric'

const ringPlaceholder = <Skeleton className="size-14 rounded-full" />

/** Overall progress at a glance, with a link to the full statistics page. */
export const HomeStats = () => {
  const { total, practiced, completionPercent, averageBest, isPending } = useSectionProgress()
  const roundedCompletion = Math.round(completionPercent)

  return (
    <section aria-label="Your progress" className="flex flex-col rounded-xl bg-card p-5 ring-1 ring-foreground/10">
      <div className="flex flex-1 items-center justify-around gap-4">
        <StatusMetric label="Progress" isPending={isPending} placeholder={ringPlaceholder}>
          <ScoreRing value={roundedCompletion} size={56} />
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
      <Link to="/statistic" className="mt-4 self-end text-sm text-primary underline underline-offset-4">
        View full statistics
      </Link>
    </section>
  )
}
