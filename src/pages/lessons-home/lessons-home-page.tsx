import { useQuery } from '@tanstack/react-query'

import { useCurrentUserProfile } from '@/features/auth'
import { sections } from '@/shared/content'

import { SectionTitle } from '@/shared/ui/section-title'
import { SidebarToggle } from '@/widgets/app-sidebar'
import { SectionCard } from '@/widgets/section-cards'

import { GreetingCard } from './ui/greeting-card'
import { ContinueCourseCard } from './ui/continue-course-card'

import { useHomeProgress } from '@/entities/progress'
import { packsQueryOptions } from '@/entities/scenario'

export const LessonsHomePage = () => {
  const packsQuery = useQuery(packsQueryOptions())
  const { data: packs = [] } = packsQuery

  const { practiced, total, nextScenario, section } = useHomeProgress(packs, packsQuery.isPending)

  const { data: profile } = useCurrentUserProfile()

  console.log(profile)

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div className="flex items-center gap-2 px-2 pt-2 lg:hidden">
        <SidebarToggle />
      </div>

      <GreetingCard
        packsIsPending={packsQuery.isPending}
        profileName={profile?.name}
        practiced={practiced}
        total={total}
      />

      <ContinueCourseCard packsIsPending={packsQuery.isPending} nextScenario={nextScenario} section={section} />

      {/* Training plan — always rendered; each SectionCard handles its own loading state */}
      <section className="space-y-3 px-4 py-6 sm:px-6">
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
  )
}
