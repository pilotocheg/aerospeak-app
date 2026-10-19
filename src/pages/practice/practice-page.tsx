import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'

import { scenarioQueryOptions } from '@/entities/scenario'
import { usePracticeScenarioId, useStartPractice } from '@/features/practice-session'
import { Button } from '@/shared/ui/button'
import { PracticePlayer } from '@/widgets/practice-player'

export const PracticePage = () => {
  const { scenarioId } = useParams({ from: '/_app/practice/$scenarioId' })
  const { data: scenario, isPending, isError } = useQuery(scenarioQueryOptions(scenarioId))
  const activeScenarioId = usePracticeScenarioId()
  const startPractice = useStartPractice()

  useEffect(() => {
    startPractice(scenarioId)
  }, [scenarioId, startPractice])

  if (isError) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-muted-foreground">
        <p>Scenario not found.</p>
        <Button variant="outline" render={<Link to="/lessons" />}>
          Back to scenarios
        </Button>
      </div>
    )
  }

  if (isPending || activeScenarioId !== scenarioId) {
    return (
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  return <PracticePlayer scenario={scenario} />
}
