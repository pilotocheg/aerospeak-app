import { useSearch } from '@tanstack/react-router'
import { cn } from 'cn'
import { GraduationCap } from 'lucide-react'

import { AppHeader } from '@/widgets/app-header'
import { ScenarioDetails } from '@/widgets/scenario-details'
import { ScenarioLibrary } from '@/widgets/scenario-library'

export const TrainerPage = () => {
  const { scenario: scenarioId } = useSearch({ from: '/' })

  return (
    <div className="flex h-dvh flex-col">
      <AppHeader />
      <div className="flex min-h-0 flex-1">
        <aside
          className={cn(
            'w-full shrink-0 overflow-y-auto border-r md:block md:w-80 lg:w-96',
            scenarioId ? 'hidden' : 'block',
          )}
        >
          <ScenarioLibrary selectedScenarioId={scenarioId} />
        </aside>

        <main className={cn('min-w-0 flex-1 flex-col', scenarioId ? 'flex' : 'hidden md:flex')}>
          {scenarioId ? (
            <ScenarioDetails key={scenarioId} scenarioId={scenarioId} />
          ) : (
            <div className="flex flex-1 items-center justify-center gap-3 text-muted-foreground">
              <GraduationCap className="size-6" />
              <span className="text-lg font-medium">Select a scenario</span>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
