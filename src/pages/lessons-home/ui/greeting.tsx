import { Skeleton } from '@/shared/ui/skeleton'

type GreetingProps = {
  isPending: boolean
  /** The account progress could not be loaded: no status line about it. */
  isError: boolean
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
export const Greeting = ({ isPending, isError, profileName, practiced, total }: GreetingProps) => {
  if (isPending) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8 w-full max-w-56" />
        <Skeleton className="h-4 w-full max-w-80" />
      </div>
    )
  }

  const title = profileName ? `Hi, ${profileName}` : 'Welcome'
  const statusMessage = isError ? 'Pick a section to practice.' : getStatusMessage(practiced, total)

  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{statusMessage}</p>
    </div>
  )
}
