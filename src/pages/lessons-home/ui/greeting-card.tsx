import { Skeleton } from '@/shared/ui/skeleton'

type GreetingCardProps = {
  packsIsPending: boolean
  profileName: string | null | undefined
  practiced: number
  total: number
}

/** Get status message for practiced/total scenarios */
function getStatusMessage(practiced: number, total: number) {
  if (practiced === total && total > 0) {
    return 'You have completed all scenarios. Great job!'
  }
  if (practiced > 0) {
    return `You have practiced ${practiced} of ${total} scenarios.`
  }
  return 'Start with the first scenario to practice radio communication.'
}

export const GreetingCard = ({ packsIsPending, profileName, practiced, total }: GreetingCardProps) => (
  <div className="rounded-lg border border-border bg-card p-6">
    <section className="space-y-3">
      {packsIsPending ? (
        <>
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-3/4" />
        </>
      ) : (
        <>
          <h1 className="text-lg font-semibold">{profileName ? `Hi, ${profileName}` : 'Welcome'}</h1>
          <p className="text-sm text-muted-foreground">{getStatusMessage(practiced, total)}</p>
        </>
      )}
    </section>
  </div>
)
