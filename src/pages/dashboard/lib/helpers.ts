import type {
  AttemptHistoryItemDto,
  DailyProgressDto,
  PracticePackDto,
  ProgressDto,
  ScenarioSummaryDto,
} from '@/shared/api'


export type NextScenarioResult = {
  pack: PracticePackDto
  scenario: ScenarioSummaryDto
  index: number
  total: number
  chip: string
}

export const nextScenario = (
  packs: PracticePackDto[],
  progress: ProgressDto | null | undefined,
  attemptsCount: number,
): NextScenarioResult | null => {
  const progressRows = progress?.scenarios ?? []
  const progressMap = new Map(progressRows.map((row) => [row.scenarioId, row]))
  const sortedPacks = [...packs].sort((a, b) => a.order - b.order)

  const runsOf = (scenarioId: string) => progressMap.get(scenarioId)?.runs ?? 0
  const firstUnpracticed = (pack: PracticePackDto) =>
    pack.scenarios.find((scenario) => runsOf(scenario.id) === 0)

  if (attemptsCount === 0) {
    const pack =
      sortedPacks.find((item) => item.recommendedForBeginners) ?? sortedPacks[0]
    if (!pack || !pack.scenarios.length) return null
    return {
      pack,
      scenario: pack.scenarios[0],
      index: 1,
      total: pack.scenarios.length,
      chip: 'Start here',
    }
  }

  const inProgress = sortedPacks.filter(
    (pack) =>
      pack.scenarios.some((scenario) => runsOf(scenario.id) > 0) &&
      pack.scenarios.some((scenario) => runsOf(scenario.id) === 0),
  )
  const candidates = inProgress.length > 0 ? inProgress : sortedPacks

  for (const pack of candidates) {
    const scenario = firstUnpracticed(pack)
    if (scenario) {
      return {
        pack,
        scenario,
        index: pack.scenarios.findIndex((item) => item.id === scenario.id) + 1,
        total: pack.scenarios.length,
        chip: `Continue · ${pack.title}`,
      }
    }
  }

  return null
}

export type QuickPracticeResult = {
  pack: PracticePackDto
  scenario: ScenarioSummaryDto
} | null

export const quickPractice = (
  packs: PracticePackDto[],
  progress: ProgressDto | null | undefined,
): QuickPracticeResult => {
  const progressRows = progress?.scenarios ?? []
  const progressMap = new Map(progressRows.map((row) => [row.scenarioId, row]))
  const sortedPacks = [...packs].sort((a, b) => a.order - b.order)

  const practiced = sortedPacks
    .flatMap((pack) =>
      pack.scenarios.map((scenario) => ({ pack, scenario, row: progressMap.get(scenario.id) })),
    )
    .filter((item) => (item.row?.runs ?? 0) > 0)

  if (practiced.length > 0) {
    const lowest = practiced.reduce((best, item) => {
      const bestScore = best.row?.lastScore ?? Number.POSITIVE_INFINITY
      const itemScore = item.row?.lastScore ?? Number.POSITIVE_INFINITY
      return itemScore < bestScore ? item : best
    })
    return { pack: lowest.pack, scenario: lowest.scenario }
  }

  const unpracticed = sortedPacks.flatMap((pack) =>
    pack.scenarios
      .filter((scenario) => (progressMap.get(scenario.id)?.runs ?? 0) === 0)
      .map((scenario) => ({ pack, scenario })),
  )
  if (unpracticed.length === 0) return null
  const pick = unpracticed[Math.floor(Math.random() * unpracticed.length)]
  return { pack: pick.pack, scenario: pick.scenario }
}

export const averageScore = (attempts: AttemptHistoryItemDto[]): number | null => {
  const recent = attempts.slice(0, 20)
  if (recent.length === 0) return null
  const sum = recent.reduce((acc, attempt) => acc + attempt.displayScore, 0)
  return sum / recent.length
}

export const streak = (
  daily: DailyProgressDto[],
  today?: string,
): number => {
  const present = new Set(daily.filter((day) => day.attempts > 0).map((day) => day.date))
  const todayDate = today ?? new Date().toISOString().slice(0, 10)

  const previousDay = (date: string) => {
    const parsed = new Date(`${date}T00:00:00Z`)
    parsed.setUTCDate(parsed.getUTCDate() - 1)
    return parsed.toISOString().slice(0, 10)
  }

  let cursor = todayDate
  if (!present.has(cursor)) {
    cursor = previousDay(cursor)
    if (!present.has(cursor)) return 0
  }

  let count = 0
  while (present.has(cursor)) {
    count += 1
    cursor = previousDay(cursor)
  }
  return count
}

export type MissedCount = { id: string; count: number }

export const missedCounts = (
  attempts: AttemptHistoryItemDto[],
  topN = 3,
): MissedCount[] => {
  const counts = new Map<string, number>()
  for (const attempt of attempts.slice(0, 50)) {
    for (const id of attempt.missedCritical) {
      counts.set(id, (counts.get(id) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count || a.id.localeCompare(b.id))
    .slice(0, topN)
}

export const fillDays = (
  daily: DailyProgressDto[],
  days: number,
  today?: string,
): DailyProgressDto[] => {
  const byDate = new Map(daily.map((day) => [day.date, day]))
  const todayDate = today ?? new Date().toISOString().slice(0, 10)

  const addDays = (date: string, delta: number) => {
    const parsed = new Date(`${date}T00:00:00Z`)
    parsed.setUTCDate(parsed.getUTCDate() + delta)
    return parsed.toISOString().slice(0, 10)
  }

  const result: DailyProgressDto[] = []
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = addDays(todayDate, -i)
    const existing = byDate.get(date)
    result.push(
      existing ?? { date, attempts: 0, successful: 0, averageScore: 0 },
    )
  }
  return result
}

export const humanizeMissedId = (id: string) =>
  id
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
