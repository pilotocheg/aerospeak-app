import { useSectionProgress } from '@/features/section-progress'
import { sections } from '@/shared/content'
import { ScoreRing } from '@/shared/ui/score-ring'
import { Skeleton } from '@/shared/ui/skeleton'
import { SidebarToggle } from '@/widgets/app-sidebar'
import { SectionCard } from '@/widgets/section-cards'

export const LessonsHomePage = () => {
  const { total, practiced, averageBest, isPending } = useSectionProgress()

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div className="flex items-center gap-2 px-2 pt-2 lg:hidden">
        <SidebarToggle />
      </div>
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6">
        <section className="text-center">
          <h1 className="text-lg font-semibold">Training status</h1>
          <div className="mt-4 flex items-center justify-center gap-10">
            <div className="flex flex-col items-center gap-2">
              {isPending ? (
                <Skeleton className="size-21 rounded-full" />
              ) : (
                <ScoreRing value={total ? Math.round((practiced / total) * 100) : 0} size={84} />
              )}
              <span className="text-xs tracking-wide text-muted-foreground uppercase">Progress</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              {isPending ? (
                <Skeleton className="h-8 w-14" />
              ) : (
                <span className="text-2xl font-bold tabular-nums">
                  {practiced}/{total}
                </span>
              )}
              <span className="text-xs tracking-wide text-muted-foreground uppercase">Scenarios practiced</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              {isPending ? <Skeleton className="size-21 rounded-full" /> : <ScoreRing value={averageBest} size={84} />}
              <span className="text-xs tracking-wide text-muted-foreground uppercase">Proficiency</span>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-center text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Training plan
          </h2>
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
