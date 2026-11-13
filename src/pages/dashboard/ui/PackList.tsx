import type { PracticePackDto } from '@/shared/api'
import type { ScenarioProgressDto } from '@/shared/api'
import { PackRow } from './PackRow'


type PackListProps = {
  packs: PracticePackDto[]
  progressMap: Map<string, ScenarioProgressDto>
  openPacks: Set<string>
  onToggle: (packId: string, open: boolean) => void
}

export const PackList = ({ packs, progressMap, openPacks, onToggle }: PackListProps) => (
  <div className="space-y-3">
    {packs.map((pack) => (
      <PackRow
        key={pack.id}
        pack={pack}
        progressMap={progressMap}
        isOpen={openPacks.has(pack.id)}
        onToggle={(open) => onToggle(pack.id, open)}
      />
    ))}
  </div>
)
