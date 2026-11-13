import { describe, expect, it } from 'vitest'

import type { AttemptHistoryItemDto, DailyProgressDto, PracticePackDto, ProgressDto } from '@/shared/api'

import {
  averageScore,
  fillDays,
  humanizeMissedId,
  missedCounts,
  nextScenario,
  quickPractice,
  streak,
} from './helpers'

const pack = (id: string, order: number, scenarios: { id: string; title: string }[], recommendedForBeginners = false): PracticePackDto =>
  ({
    id,
    title: `Pack ${id}`,
    description: 'desc',
    order,
    recommendedForBeginners,
    scenarios: scenarios.map((scenario) => ({
      id: scenario.id,
      title: scenario.title,
      packId: id,
      difficulty: 'easy',
      estimatedDurationSec: 120,
      objective: 'obj',
      stepCount: 1,
    })),
  }) as PracticePackDto

const progress = (scenarios: { scenarioId: string; packId: string; runs: number; lastScore: number | null }[]): ProgressDto =>
  ({
    totals: {
      practicedScenarios: scenarios.filter((item) => item.runs > 0).length,
      totalScenarios: scenarios.length,
      attempts: 1,
      successfulPhrases: 0,
      successfulPhrasesLast7Days: 0,
    },
    scenarios: scenarios.map((item) => ({
      scenarioId: item.scenarioId,
      packId: item.packId,
      runs: item.runs,
      bestScore: item.lastScore,
      lastScore: item.lastScore,
      scores: item.lastScore === null ? [] : [item.lastScore],
      lastPlayedAt: '2026-01-01T00:00:00.000Z',
      stepAttempts: item.runs,
    })),
  }) as ProgressDto

describe('nextScenario', () => {
  it('picks recommended pack first scenario for new user', () => {
    const packs = [pack('a', 1, [{ id: 's1', title: 'S1' }]), pack('b', 2, [{ id: 's2', title: 'S2' }], true)]
    const result = nextScenario(packs, null, 0)
    expect(result?.pack.id).toBe('b')
    expect(result?.scenario.id).toBe('s2')
    expect(result?.chip).toBe('Start here')
  })

  it('prefers in-progress pack', () => {
    const packs = [pack('a', 1, [{ id: 's1', title: 'S1' }, { id: 's2', title: 'S2' }])]
    const p = progress([{ scenarioId: 's1', packId: 'a', runs: 1, lastScore: 4 }])
    const result = nextScenario(packs, p, 5)
    expect(result?.scenario.id).toBe('s2')
    expect(result?.chip).toBe('Continue · Pack a')
  })
})

describe('quickPractice', () => {
  it('picks the lowest scored practiced scenario', () => {
    const packs = [pack('a', 1, [{ id: 's1', title: 'S1' }, { id: 's2', title: 'S2' }])]
    const p = progress([
      { scenarioId: 's1', packId: 'a', runs: 1, lastScore: 8 },
      { scenarioId: 's2', packId: 'a', runs: 2, lastScore: 3 },
    ])
    const result = quickPractice(packs, p)
    expect(result?.scenario.id).toBe('s2')
  })

  it('returns null when no packs available', () => {
    expect(quickPractice([], null)).toBeNull()
  })
})

describe('averageScore', () => {
  it('returns mean displayScore', () => {
    const attempts = [{ displayScore: 4 }, { displayScore: 6 }] as AttemptHistoryItemDto[]
    expect(averageScore(attempts)).toBe(5)
  })

  it('returns null when empty', () => {
    expect(averageScore([])).toBeNull()
  })
})

describe('streak', () => {
  it('counts consecutive days ending today', () => {
    const daily = [
      { date: '2026-01-03', attempts: 1, successful: 1, averageScore: 5 },
      { date: '2026-01-02', attempts: 1, successful: 1, averageScore: 5 },
      { date: '2026-01-01', attempts: 0, successful: 0, averageScore: 0 },
    ] as DailyProgressDto[]
    expect(streak(daily, '2026-01-03')).toBe(2)
  })

  it('allows ending yesterday', () => {
    const daily = [
      { date: '2026-01-02', attempts: 1, successful: 1, averageScore: 5 },
      { date: '2026-01-01', attempts: 0, successful: 0, averageScore: 0 },
    ] as DailyProgressDto[]
    expect(streak(daily, '2026-01-03')).toBe(1)
  })
})

describe('missedCounts', () => {
  it('returns top missed ids with proper sorting', () => {
    const attempts = [
      { missedCritical: ['b', 'c'] },
      { missedCritical: ['a', 'c'] },
    ] as AttemptHistoryItemDto[]
    const result = missedCounts(attempts)
    expect(result).toEqual([
      { id: 'c', count: 2 },
      { id: 'a', count: 1 },
      { id: 'b', count: 1 },
    ])
  })
})

describe('fillDays', () => {
  it('fills missing days with zero', () => {
    const daily = [{ date: '2026-01-02', attempts: 2, successful: 1, averageScore: 4 }] as DailyProgressDto[]
    const result = fillDays(daily, 3, '2026-01-03')
    expect(result).toHaveLength(3)
    expect(result[0].attempts).toBe(0)
    expect(result[1].attempts).toBe(2)
    expect(result[2].attempts).toBe(0)
  })
})

describe('humanizeMissedId', () => {
  it('humanizes', () => {
    expect(humanizeMissedId('missed_call_sign')).toBe('Missed Call Sign')
  })
})