import { Card } from '@/shared/ui/card'

export const StatisticSkeleton = () => (
  <>
    <section className="space-y-2">
      <h1 className="text-lg font-semibold animate-pulse">Your statistics</h1>
      <p className="text-sm text-muted-foreground animate-pulse">Training progress over the last 30 days</p>
    </section>
    <section>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-4">
            <div className="h-4 w-24 rounded bg-muted animate-pulse" />
            <div className="mt-4 h-8 w-32 rounded bg-muted animate-pulse" />
            <div className="mt-2 h-3 w-1/2 rounded bg-muted animate-pulse" />
          </Card>
        ))}
      </div>
    </section>
    <section>
      <div className="h-64 rounded-md border border-border bg-muted/50 animate-pulse" />
    </section>
  </>
)
