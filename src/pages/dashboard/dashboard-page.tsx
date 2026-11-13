import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useUser } from '@/features/auth/model/selectors'
import { packsQueryOptions } from '@/entities/scenario'
import { getDailyProgressQueryOptions, getProgressQueryOptions } from '@/entities/progress'
import { listAttemptsQueryOptions } from '@/entities/attempt'

import { getUserProfileQueryOptions } from '@/entities/user'
import { nextScenario, averageScore, streak, missedCounts, fillDays } from './lib/helpers'
import { ConsentBanner } from './ui/ConsentBanner'
import { HeroCard } from './ui/HeroCard'
import { MicCheckButton } from './ui/MicCheckButton'
import { MissedElements } from './ui/MissedElements'
import { PackList } from './ui/PackList'
import { RecentAttempts } from './ui/RecentAttempts'
import { SidebarToggle } from '@/widgets/app-sidebar'
import { StatCard } from './ui/StatCard'
import { WeekChart } from './ui/WeekChart'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

type Filter = 'all' | 'in-progress' | 'not-started' | 'completed'

export const DashboardPage = () => {
  const user = useUser()
  const uid = user?.id ?? ''
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

  const profileQuery = useQuery({ ...getUserProfileQueryOptions(uid), enabled: Boolean(uid) })
  const packsQuery = useQuery(packsQueryOptions())
  const progressQuery = useQuery({ ...getProgressQueryOptions(uid), enabled: Boolean(uid) })
  const dailyQuery = useQuery({ ...getDailyProgressQueryOptions(uid, 30, tz), enabled: Boolean(uid) })
  const attemptsQuery = useQuery({ ...listAttemptsQueryOptions(uid, 20), enabled: Boolean(uid) })

  const [filter, setFilter] = useState<Filter>('all')
  const initializedRef = useRef(false)
  const [openPacks, setOpenPacks] = useState<Set<string>>(new Set())
  const openPacksRef = useRef(new Set<string>())

  const packs = useMemo(() => packsQuery.data ?? [], [packsQuery.data])
  const progress = useMemo(() => profileQuery.data ? progressQuery.data : null, [profileQuery.data, progressQuery.data])
  const attempts = useMemo(() => attemptsQuery.data ?? [], [attemptsQuery.data])
  const daily = useMemo(() => dailyQuery.data ?? [], [dailyQuery.data])

  const progressMap = useMemo(
    () => new Map((progress?.scenarios ?? []).map((row) => [row.scenarioId, row])),
    [progress],
  )

  const filteredPacks = useMemo(() => {
    return packs.filter((pack) => {
      const done = pack.scenarios.filter((scenario) => (progressMap.get(scenario.id)?.runs ?? 0) >= 1).length
      const total = pack.scenarios.length
      if (filter === 'all') return true
      if (filter === 'completed') return total > 0 && done === total
      if (filter === 'in-progress') return done > 0 && done < total
      return done === 0
    })
  }, [packs, progressMap, filter])

  useEffect(() => {
    if (openPacksRef.current.size === 0 && packs.length > 0) {
      const firstNonCompleted = packs.find((pack) => {
        const done = pack.scenarios.filter((scenario) => (progressMap.get(scenario.id)?.runs ?? 0) >= 1).length
        return done < pack.scenarios.length
      })
      const first = firstNonCompleted ?? packs[0]
      if (first) openPacksRef.current = new Set([first.id])
    }
    initializedRef.current = true
  }, [initializedRef, packs, progressMap])

  useEffect(() => {
    setOpenPacks(openPacksRef.current)
  }, [initializedRef])

  const togglePack = (packId: string, open: boolean) => {
    openPacksRef.current = open ? new Set([packId]) : new Set<string>()
    setOpenPacks(openPacksRef.current)
  }

  const isLoading =
    Boolean(uid) &&
    (profileQuery.isPending || packsQuery.isPending || progressQuery.isPending || dailyQuery.isPending || attemptsQuery.isPending)

  const isError = profileQuery.isError || packsQuery.isError || progressQuery.isError || dailyQuery.isError || attemptsQuery.isError

  const handleRetry = () => {
    void profileQuery.refetch()
    void packsQuery.refetch()
    void progressQuery.refetch()
    void dailyQuery.refetch()
    void attemptsQuery.refetch()
  }

  const profile = profileQuery.data ?? null
  const consentGranted = Boolean(profile?.voiceConsentAt)

  const firstName = (profile?.name ?? user?.name ?? 'Pilot').split(' ')[0]

  const next = nextScenario(packs, progress, progress?.totals.attempts ?? 0)

  const scenarioTitle = (id: string) =>
    packs.flatMap((pack) => pack.scenarios).find((scenario) => scenario.id === id)?.title ?? id
  const packTitleForScenario = (scenarioId: string) => {
    const pack = packs.find((pack) => pack.scenarios.some((scenario) => scenario.id === scenarioId))
    return pack?.title ?? ''
  }

  const today = new Intl.DateTimeFormat('en-CA', { timeZone: tz }).format(new Date())
  const weekDays = fillDays(daily, 7, today)
  const missed = missedCounts(attempts)
  const avg = averageScore(attempts)
  const streakValue = streak(daily, today)


  if (isLoading) {
    return (
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 px-2 pt-2 lg:hidden">
          <SidebarToggle />
        </div>
        <div className="p-4 lg:p-10">
          <div className="space-y-6">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-48 w-full rounded-xl" />
            <div className="flex gap-4">
              <Skeleton className="h-28 flex-1 rounded-xl" />
              <Skeleton className="h-28 flex-1 rounded-xl" />
              <Skeleton className="h-28 flex-1 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 px-2 pt-2 lg:hidden">
          <SidebarToggle />
        </div>
        <div className="p-4 lg:p-10">
          <Card>
            <CardHeader>
              <CardTitle>Could not load dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleRetry}>Retry</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div className="flex items-center gap-2 px-2 pt-2 lg:hidden">
        <SidebarToggle />
      </div>
      <div className="p-4 lg:p-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Dashboard</p>
            <h1 className="text-[32px] font-extrabold tracking-tight">Good to see you, {firstName}</h1>
          </div>
          <MicCheckButton />
        </div>

        {profile && !consentGranted && <ConsentBanner uid={uid} />}

        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="min-w-0 flex-1 space-y-6">
            {next && (
              <HeroCard
                chip={next.chip}
                scenario={next.scenario}
                scenarioIndex={next.index}
                totalScenarios={next.total}
                practicedScenarios={progress?.totals.practicedScenarios ?? 0}
                totalAllScenarios={progress?.totals.totalScenarios ?? 0}
                consentGranted={consentGranted}
              />
            )}

            <div className="flex flex-wrap gap-4">
              <StatCard
                label="Successful phrases"
                value={String(progress?.totals.successfulPhrases ?? 0)}
                caption={`${progress?.totals.successfulPhrasesLast7Days ?? 0} in the last 7 days`}
              />
              <StatCard
                label="Average score"
                value={avg === null ? '–' : `${avg.toFixed(1)} / 6`}
                caption="Pass mark is 4"
              />
              <StatCard
                label="Streak"
                value={streakValue > 0 ? `${streakValue} days` : '–'}
                caption="Consecutive days"
              />
            </div>

            <section className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-bold">Practice packs</h2>
                <div className="flex flex-wrap gap-2">
                  {(['all', 'in-progress', 'not-started', 'completed'] as Filter[]).map((item) => (
                    <Button
                      key={item}
                      variant={filter === item ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter(item)}
                    >
                      {item === 'all'
                        ? 'All'
                        : item === 'in-progress'
                          ? 'In progress'
                          : item === 'not-started'
                            ? 'Not started'
                            : 'Completed'}
                    </Button>
                  ))}
                </div>
              </div>
              {filteredPacks.length === 0 ? (
                <Card>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">No packs match this filter.</p>
                  </CardContent>
                </Card>
              ) : (
                <PackList
                  packs={filteredPacks}
                  progressMap={progressMap}
                  openPacks={openPacks}
                  onToggle={togglePack}
                />
              )}
            </section>
          </div>

          <aside className="w-full space-y-4 xl:w-[360px] xl:shrink-0">
            <Card>
              <CardHeader>
                <CardTitle>Attempts · last 7 days</CardTitle>
              </CardHeader>
              <CardContent>
                <WeekChart days={weekDays} today={today} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent attempts</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentAttempts attempts={attempts} scenarioTitle={scenarioTitle} packTitle={packTitleForScenario} />
              </CardContent>
            </Card>

            {missed.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Often missed</CardTitle>
                  <p className="text-xs text-muted-foreground">Critical elements you left out most often.</p>
                </CardHeader>
                <CardContent>
                  <MissedElements items={missed} />
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
