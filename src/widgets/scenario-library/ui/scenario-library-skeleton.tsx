import { Skeleton } from '@/shared/ui/skeleton'

const PACK_COUNT = 4
const ROW_COUNT = 3

/** Mirrors PackSection: pack headers, the first one open with a few scenario rows. */
export const ScenarioLibrarySkeleton = () => (
  <div aria-busy aria-label="Loading practice packs">
    {Array.from({ length: PACK_COUNT }, (_, pack) => (
      <div key={pack} className="border-b">
        <div className="flex items-center gap-3 bg-card px-4 py-3">
          <Skeleton className="size-4" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        {pack === 0 &&
          Array.from({ length: ROW_COUNT }, (_, row) => (
            <div key={row} className="flex items-center gap-3 py-3 pr-3 pl-4">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
      </div>
    ))}
  </div>
)
