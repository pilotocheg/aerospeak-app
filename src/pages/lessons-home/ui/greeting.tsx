import { Skeleton } from '@/shared/ui/skeleton'

type GreetingProps = {
  packsIsPending: boolean
  profileName: string | null | undefined
  practiced: number
  total: number
}

const getStatusMessage = (practiced: number, total: number) => {
  if (practiced === total && total > 0) {
    return 'You have completed all scenarios. Great job!'
  }
  if (practiced > 0) {
    return 'Pick up where you left off.'
  }
  return 'Start with the first scenario to practice radio communication.'
}

/** Page heading: greeting and a one-line status. */
export const Greeting = ({ packsIsPending, profileName, practiced, total }: GreetingProps) => {
  if (packsIsPending) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80" />
      </div>
    )
  }

  const title = profileName ? `Hi, ${profileName}` : 'Welcome'
  const statusMessage = getStatusMessage(practiced, total)

  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{statusMessage}</p>
    </div>
  )
}
