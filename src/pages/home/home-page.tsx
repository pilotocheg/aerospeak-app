import { ArrowRight, BookOpenText, Plane, Radio, TrendingUp } from 'lucide-react'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { courses, stats } from '@/entities/course/model/courses'

export const HomePage = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-6">
      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Card className="border-border bg-card">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">AeroSpeak</Badge>
              <Badge variant="outline">Flight readiness</Badge>
            </div>

            <div className="mt-6 max-w-xl">
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Train communication. Fly with confidence.</h1>
              <p className="mt-3 text-base text-muted-foreground">
                Your dashboard keeps every scenario, training path, and radio interaction aligned with your next step.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button>Continue training</Button>
              <Button variant="outline">Open planner</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-base">Current mission</CardTitle>
              <Badge variant="secondary">On track</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-3">
              <div>
                <p className="text-sm text-muted-foreground">Next exercise</p>
                <p className="font-medium">Approach & landing</p>
              </div>
              <Plane className="h-5 w-5 text-primary" />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Phraseology score</span>
                <span className="font-medium text-foreground">82%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[82%] rounded-full bg-primary" />
              </div>
            </div>

            <div className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Next ATC call</span>
                <span className="font-medium text-foreground">Runway 27</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border bg-card">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className="mt-3 flex items-end justify-between gap-3">
                <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
                <p className="text-xs text-emerald-600">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Training path</p>
            <h2 className="text-2xl font-semibold tracking-tight">Your active modules</h2>
          </div>
          <Button variant="ghost" className="gap-2">
            View all <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="border-border bg-card">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{course.category}</Badge>
                  <span className="text-sm text-muted-foreground">{course.duration}</span>
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{course.lessons} lessons</span>
                  <span>{course.mentor}</span>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                    <span>Progress</span>
                    <span className="text-foreground">{course.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>

                <div className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
                  <p className="mb-1 text-xs uppercase tracking-[0.18em]">Next</p>
                  <p className="text-foreground">{course.nextLesson}</p>
                </div>

                <Button className="w-full">Resume module</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card">
          <CardHeader className="flex-row items-center gap-2">
            <BookOpenText className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Study goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between rounded-lg bg-muted p-3">
              <span>Practice rounds</span>
              <span className="font-medium text-foreground">3/5</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted p-3">
              <span>Scenario reviews</span>
              <span className="font-medium text-foreground">2/3</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex-row items-center gap-2">
            <Radio className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Focus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p className="text-3xl font-semibold tracking-tight text-foreground">12 days</p>
            <p>Your rhythm is steady. Keep the momentum for the next evaluation milestone.</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex-row items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p className="text-2xl font-semibold tracking-tight text-foreground">+18% accuracy</p>
            <p>Your communication quality is above the current training target.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
