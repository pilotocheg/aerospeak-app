import { useQuery } from '@tanstack/react-query'

import { useHomeProgress } from '@/entities/progress'
import { packsQueryOptions } from '@/entities/scenario'
import { useCurrentUserProfile, useUserId } from '@/features/auth'
import { sections } from '@/shared/content'
import { SectionTitle } from '@/shared/ui/section-title'
import { SidebarToggle } from '@/widgets/app-sidebar'
import { SectionCard } from '@/widgets/section-cards'

import { Greeting } from './ui/greeting'
import { HomeStats } from './ui/home-stats'
import { UpNextBanner } from './ui/up-next-banner'

export const LessonsHomePage = () => {
  const uid = useUserId()
  const { data: packs = [], isPending: packsIsPending } = useQuery(packsQueryOptions())
  const { practiced, total, averageBest, nextScenario, section, isPending, isError, refetchProgress } = useHomeProgress(
    uid,
    packs,
    packsIsPending,
  )

  const { data: profile } = useCurrentUserProfile()

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div className="flex items-center gap-2 px-2 pt-2 lg:hidden">
        <SidebarToggle />
      </div>

      <div className="space-y-8 px-4 py-6 sm:px-6">
        <div className="space-y-4">
          <Greeting
            isPending={isPending}
            isError={isError}
            profileName={profile?.name}
            practiced={practiced}
            total={total}
          />
          <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <UpNextBanner
              isPending={isPending}
              isError={isError}
              practiced={practiced}
              nextScenario={nextScenario}
              section={section}
            />
            <HomeStats
              isPending={isPending}
              isError={isError}
              onRetry={refetchProgress}
              practiced={practiced}
              total={total}
              averageBest={averageBest}
            />
          </div>
        </div>

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
