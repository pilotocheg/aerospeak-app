import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

import { packsQueryOptions } from '@/entities/scenario'
import { Button } from '@/shared/ui/button'

import { PackSection } from './pack-section'

type ScenarioLibraryProps = {
  selectedScenarioId?: string
}

export const ScenarioLibrary = ({ selectedScenarioId }: ScenarioLibraryProps) => {
  const { data: packs, isPending, isError, refetch } = useQuery(packsQueryOptions())
  const [toggled, setToggled] = useState<Record<string, boolean>>({})

  if (isPending) {
    return (
      <div className="flex justify-center p-8 text-muted-foreground">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="space-y-3 p-6 text-sm text-muted-foreground">
        <p>Could not load practice packs.</p>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    )
  }

  const selectedPackId = packs.find((pack) => pack.scenarios.some((s) => s.id === selectedScenarioId))?.id
  const defaultOpenId = selectedPackId ?? packs[0]?.id

  return (
    <nav aria-label="Practice packs">
      {packs.map((pack) => {
        const isOpen = toggled[pack.id] ?? pack.id === defaultOpenId
        return (
          <PackSection
            key={pack.id}
            pack={pack}
            isOpen={isOpen}
            selectedScenarioId={selectedScenarioId}
            onToggle={() => setToggled((state) => ({ ...state, [pack.id]: !isOpen }))}
          />
        )
      })}
    </nav>
  )
}
