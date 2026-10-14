import { ArrowRight, BookOpenCheck, Clock3, TrendingUp } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { courses, stats } from '@/entities/course/model/courses'

export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-10">
      <section className="overflow-hidden rounded-3xl border border-slate-800 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.26),_transparent_30%),linear-gradient(135deg,_#0f172a_0%,_#111827_40%,_#0b1120_100%)] p-8 shadow-2xl shadow-slate-950/20">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-indigo-200">
              Learning path 2026
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Build the skills that move your career forward.
              </h1>
              <p className="max-w-xl text-base text-slate-300 md:text-lg">
                Follow guided programs, track your learning, and keep momentum with mentors that help you apply knowledge in real work.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-indigo-500 text-white hover:bg-indigo-400">
                Continue learning
              </Button>
              <Button variant="outline" className="border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800">
                Browse catalog
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">Current focus</p>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300">
                  On track
                </span>
              </div>

              <div className="rounded-2xl bg-slate-950 p-4">
                <p className="text-sm text-slate-400">Product Design Systems</p>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-white">64%</p>
                    <p className="text-sm text-slate-400">Completed</p>
                  </div>
                  <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-300">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
                  <span>Next lesson</span>
                  <span className="text-white">UX review</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
                  <span>Mentor</span>
                  <span className="text-white">Ava Reed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-slate-800 bg-slate-900/80 text-slate-50">
            <CardContent className="p-5">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
                <p className="text-xs text-emerald-300">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">My learning</p>
            <h2 className="text-2xl font-semibold text-white">Continue your courses</h2>
          </div>
          <Button variant="ghost" className="text-indigo-300 hover:bg-slate-800 hover:text-indigo-200">
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden border-slate-800 bg-slate-900/80 text-slate-50">
              <CardHeader className="space-y-3 pb-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-200">
                    {course.category}
                  </span>
                  <span className="text-xs text-slate-400">{course.duration}</span>
                </div>
                <CardTitle className="text-xl text-white">{course.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>{course.lessons} lessons</span>
                  <span>{course.mentor}</span>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-sm text-slate-300">
                  <p className="mb-1 text-slate-500">Next up</p>
                  <p>{course.nextLesson}</p>
                </div>
                <Button className="w-full bg-slate-100 text-slate-900 hover:bg-white">
                  Resume course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <Card className="border-slate-800 bg-slate-900/80 text-slate-50">
          <CardHeader>
            <div className="flex items-center gap-2 text-indigo-300">
              <BookOpenCheck className="h-5 w-5" />
              <CardTitle className="text-lg">Weekly goals</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-between rounded-xl bg-slate-950/80 p-3">
              <span>Video lessons</span>
              <span className="text-white">3/5</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-950/80 p-3">
              <span>Quiz attempts</span>
              <span className="text-white">2/3</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/80 text-slate-50">
          <CardHeader>
            <div className="flex items-center gap-2 text-cyan-300">
              <Clock3 className="h-5 w-5" />
              <CardTitle className="text-lg">Study streak</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            <p className="text-2xl font-semibold text-white">12 days</p>
            <p>Your consistency is growing. Keep up the pace for another milestone reward.</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/80 text-slate-50">
          <CardHeader>
            <div className="flex items-center gap-2 text-emerald-300">
              <TrendingUp className="h-5 w-5" />
              <CardTitle className="text-lg">Opportunity</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            <p className="text-xl font-semibold text-white">+18% growth</p>
            <p>Your learning pattern is on pace with your target career roadmap.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
