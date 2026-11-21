import type { ScenarioDto } from '@/shared/api'

export const getBriefingValue = (scenario: ScenarioDto, label: string) =>
  scenario.briefing?.find((item) => item.label.toLowerCase() === label.toLowerCase())?.value
