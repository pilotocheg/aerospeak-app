import type { PracticePackDto } from '@/shared/api'

/** An empty first pack, unless overridden. */
export const buildPracticePack = (overrides: Partial<PracticePackDto> = {}): PracticePackDto => ({
  id: 'landing-controlled',
  title: 'Landing',
  description: 'Landing at a controlled aerodrome.',
  order: 1,
  scenarios: [],
  ...overrides,
})
