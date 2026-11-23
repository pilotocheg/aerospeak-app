import type { ScenarioDto } from '@/shared/api'
import { Badge } from '@/shared/ui/badge'

import { difficultyBadgeVariants } from './styles'

type DifficultyBadgeProps = {
  difficulty: ScenarioDto['difficulty']
}

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => (
  <Badge variant="outline" className={difficultyBadgeVariants({ difficulty })}>
    {difficulty}
  </Badge>
)
