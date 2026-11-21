import { useSectionProgress } from '@/features/section-progress'
import { sections } from '@/shared/content'
import { ScoreRing } from '@/shared/ui/score-ring'
import { SectionTitle } from '@/shared/ui/section-title'
import { Skeleton } from '@/shared/ui/skeleton'
import { SidebarToggle } from '@/widgets/app-sidebar'
import { SectionCard } from '@/widgets/section-cards'

import { StatusMetric } from './ui/status-metric'

const ringPlaceholder = <Skeleton className="size-21 rounded-full" />

export const LessonsHomePage = () => {
  const { total, practiced, completionPercent, averageBest, isPending } = useSectionProgress()

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div className="flex items-center gap-2 px-2 pt-2 lg:hidden">
        <SidebarToggle />
      </div>
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6">
        <section className="text-center">
          <h1 className="text-lg font-semibold">Training status</h1>
          <div className="mt-4 flex items-center justify-center gap-10">
            <StatusMetric label="Progress" isPending={isPending} placeholder={ringPlaceholder}>
              <ScoreRing value={Math.round(completionPercent)} size={84} />
            </StatusMetric>
            <StatusMetric
              label="Scenarios practiced"
              isPending={isPending}
              placeholder={<Skeleton className="h-8 w-14" />}
              className="gap-1"
            >
              <span className="text-2xl font-bold tabular-nums">
                {practiced}/{total}
              </span>
            </StatusMetric>
            <StatusMetric label="Proficiency" isPending={isPending} placeholder={ringPlaceholder}>
              <ScoreRing value={averageBest} size={84} />
            </StatusMetric>
          </div>
        </section>

        <section className="space-y-3">
          <SectionTitle as="h2" className="text-center">
            Training plan
          </SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sections.map((section) => (
              <SectionCard key={section.id} section={section} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
