import { useQuery } from '@tanstack/react-query'
import { Link, useParams, useSearch } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'

import { scenarioQueryOptions } from '@/entities/scenario'
import { usePracticeRun } from '@/features/practice-session'
import { Button } from '@/shared/ui/button'
import { EmptyState } from '@/shared/ui/empty-state'
import { PracticePlayer } from '@/widgets/practice-player'

export const PracticePage = () => {
  const { scenarioId } = useParams({ from: '/_app/practice/$scenarioId' })
  const { variant } = useSearch({ from: '/_app/practice/$scenarioId' })
  const { data: scenario, isPending, isError } = useQuery(scenarioQueryOptions(scenarioId, variant))
  const { isReady } = usePracticeRun(scenarioId, variant)

  if (isError) {
    return (
      <EmptyState
        message="Scenario not found."
        action={
          <Button variant="outline" render={<Link to="/lessons" />}>
            Back to scenarios
          </Button>
        }
      />
    )
  }

  if (isPending || !isReady) {
    return (
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  return <PracticePlayer scenario={scenario} />
}
