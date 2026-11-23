import { Link } from '@tanstack/react-router'

import { Button } from '@/shared/ui/button'
import { Skeleton } from '@/shared/ui/skeleton'

type ContinueCourseCardProps = {
  packsIsPending: boolean
  nextScenario: { id: string; title: string; objective: string; packId: string } | undefined
  section: { id: string } | undefined
}

/** Continue course recommendation card */
export const ContinueCourseCard = ({ packsIsPending, nextScenario, section }: ContinueCourseCardProps) => {
  if (packsIsPending) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <section>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex-1 min-w-0">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-3 w-2/3" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
        </section>
      </div>
    )
  }

  if (!nextScenario || !section) {
    return null
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <section>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground uppercase tracking-wider truncate">Continue course - Next</p>
            <p className="text-lg font-semibold truncate">{nextScenario.title}</p>
            <p className="text-xs text-muted-foreground line-clamp-2">{nextScenario.objective}</p>
          </div>
          <Button
            render={
              <Link
                to="/lessons/$sectionId"
                params={{ sectionId: section.id }}
                search={{ scenario: String(nextScenario.id) }}
                className="w-full md:w-auto"
              />
            }
          >
            Start
          </Button>
        </div>
      </section>
    </div>
  )
}
