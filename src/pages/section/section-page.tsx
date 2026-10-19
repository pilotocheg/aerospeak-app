import { Link, useParams, useSearch } from '@tanstack/react-router'
import { cn } from 'cn'
import { ChevronLeft, GraduationCap } from 'lucide-react'

import { getSection } from '@/entities/section'
import { Button } from '@/shared/ui/button'
import { SidebarToggle } from '@/widgets/app-sidebar'
import { ScenarioDetails } from '@/widgets/scenario-details'
import { ScenarioLibrary } from '@/widgets/scenario-library'

export const SectionPage = () => {
  const { sectionId } = useParams({ from: '/_app/lessons/$sectionId' })
  const { scenario: scenarioId } = useSearch({ from: '/_app/lessons/$sectionId' })
  const section = getSection(sectionId)

  if (!section || section.comingSoon) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-muted-foreground">
        <p>{section ? `${section.title} is coming soon.` : 'Section not found.'}</p>
        <Button variant="outline" render={<Link to="/lessons" />}>
          All sections
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="relative flex h-14 shrink-0 items-center gap-2 bg-primary px-2 text-primary-foreground">
        <SidebarToggle />
        <Link to="/lessons" className="flex items-center gap-1 text-sm opacity-90 hover:opacity-100">
          <ChevronLeft className="size-4" />
          <span className="hidden sm:inline">All sections</span>
        </Link>
        <h1 className="pointer-events-none absolute inset-x-0 text-center font-semibold tracking-wide uppercase">
          {section.title}
        </h1>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside
          className={cn(
            'w-full shrink-0 overflow-y-auto border-r md:block md:w-80 lg:w-96',
            scenarioId ? 'hidden' : 'block',
          )}
        >
          <ScenarioLibrary sectionId={sectionId} selectedScenarioId={scenarioId} />
        </aside>

        <div className={cn('min-w-0 flex-1 flex-col', scenarioId ? 'flex' : 'hidden md:flex')}>
          {scenarioId ? (
            <ScenarioDetails key={scenarioId} sectionId={sectionId} scenarioId={scenarioId} />
          ) : (
            <div className="flex flex-1 items-center justify-center gap-3 text-muted-foreground">
              <GraduationCap className="size-6" />
              <span className="text-lg font-medium">Select a lesson</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
