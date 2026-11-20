import { Card } from '@/shared/ui/card'

export const StatisticSkeleton = () => (
  <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="space-y-2">
        <h2 className="text-lg font-semibold animate-pulse">Your statistics</h2>
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
    </div>
  </div>
)
