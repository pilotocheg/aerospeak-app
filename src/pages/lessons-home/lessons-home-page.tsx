import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

import { useSectionProgress } from '@/features/section-progress'
import { useUser } from '@/features/auth/model/selectors'
import { sections } from '@/shared/content'
import { Button } from '@/shared/ui/button'
import { SidebarToggle } from '@/widgets/app-sidebar'
import { SectionCard } from '@/widgets/section-cards'

import { useAllProgress } from '@/entities/progress'
import { packsQueryOptions } from '@/entities/scenario'
import { getUserProfileQueryOptions } from '@/entities/user'
import { findSectionByPackId } from '@/entities/section'

export const LessonsHomePage = () => {
  const user = useUser()
  const { total, practiced, isPending } = useSectionProgress()
  const allProgress = useAllProgress()
  const { data: packs = [] } = useQuery(packsQueryOptions())

  const { data: profile } = useQuery({
    ...getUserProfileQueryOptions(user?.id ?? ''),
    enabled: Boolean(user),
  })

  if (isPending) {
    return <div>Loading…</div>
  }

  /** Find the first unpracticed scenario across packs ordered by `order`. */
  const nextScenario = [...packs]
    .sort((a, b) => a.order - b.order)
    .flatMap((pack) => pack.scenarios)
    .find((scenario) => !allProgress[scenario.id])

  const section = findSectionByPackId(nextScenario?.packId ?? '')

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div className="flex items-center gap-2 px-2 pt-2 lg:hidden">
        <SidebarToggle />
      </div>
      <div className="mx-auto max-w-6xl space-y-4 px-4 py-6 sm:px-6">
        {/* Greeting + current status */}
        <div className="rounded-lg border border-border bg-card p-6">
          <section className="space-y-3">
            <h1 className="text-lg font-semibold">{profile ? `Hi, ${profile.name}` : 'Welcome'}</h1>
            <p className="text-sm text-muted-foreground">
              {practiced === total && total > 0
                ? 'You have completed all scenarios. Great job!'
                : practiced > 0
                  ? `You have practiced ${practiced} of ${total} scenarios.`
                  : 'Start with the first scenario to practice radio communication.'}
            </p>
          </section>
        </div>

        {/* Continue course recommendation */}
        {nextScenario && section && (
          <div className="rounded-lg border border-border bg-card p-6">
            <section>
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Continue course - Next</p>
                  <p className="text-lg font-semibold truncate">{nextScenario.title}</p>
                  <p className="text-xs text-muted-foreground">{nextScenario.objective}</p>
                </div>
                <Button>
                  <Link
                    to="/lessons/$sectionId"
                    params={{ sectionId: section.id }}
                    search={{ scenario: String(nextScenario.id) }}
                    className="w-full"
                  >
                    Start
                  </Link>
                </Button>
              </div>
            </section>
          </div>
        )}

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
