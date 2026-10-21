import { Skeleton } from '@/shared/ui/skeleton'

const STAT_COUNT = 4

/** Mirrors ScenarioDetails: title bar, four stats, objective, briefing and the start button. */
export const ScenarioDetailsSkeleton = () => (
  <div className="flex min-h-0 flex-1 flex-col" aria-busy aria-label="Loading scenario">
    <div className="border-b bg-card px-4 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <Skeleton className="size-8" />
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {Array.from({ length: STAT_COUNT }, (_, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="flex h-16 items-center">
              <Skeleton className="size-14 rounded-full" />
            </div>
            <Skeleton className="h-3 w-14" />
          </div>
        ))}
      </div>
    </div>

    <div className="min-h-0 flex-1 space-y-6 px-4 py-6 sm:px-6">
      <div className="space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-28 w-full rounded-lg" />
      </div>
      <Skeleton className="h-32 w-full rounded-lg" />
    </div>

    <div className="border-t bg-card p-4">
      <Skeleton className="mx-auto h-10 w-full max-w-sm" />
    </div>
  </div>
)
