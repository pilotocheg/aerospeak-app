import { Link } from '@tanstack/react-router'
import { Mic } from 'lucide-react'

import type { ScenarioSummaryDto } from '@/shared/api'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'

type HeroCardProps = {
  chip: string
  scenario: ScenarioSummaryDto
  scenarioIndex: number
  totalScenarios: number
  practicedScenarios: number
  totalAllScenarios: number
  consentGranted: boolean
}

export const HeroCard = ({
  chip,
  scenario,
  scenarioIndex,
  totalScenarios,
  practicedScenarios,
  totalAllScenarios,
  consentGranted,
}: HeroCardProps) => {
  const minutes = Math.max(1, Math.round(scenario.estimatedDurationSec / 60))
  const ringValue = totalAllScenarios > 0 ? practicedScenarios / totalAllScenarios : 0
  const circumference = 2 * Math.PI * 52
  const offset = circumference * (1 - ringValue)

  return (
    <Card className="border-0 bg-linear-to-br from-primary to-indigo-600 p-7 text-white">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1 space-y-4">
          <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            {chip}
          </span>
          <h2 className="text-[28px] font-extrabold tracking-tight">{scenario.title}</h2>
          <p className="text-sm text-white/80">
            Scenario {scenarioIndex} of {totalScenarios} · {scenario.difficulty} · about {minutes} min
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              className="min-h-11 bg-white text-primary hover:bg-white/90"
              disabled={!consentGranted}
              render={
                <Link to="/practice/$scenarioId" params={{ scenarioId: scenario.id }}>
                  <Mic className="size-4" />
                  Start speaking
                </Link>
              }
            />
            <Button
              variant="ghost"
              className="min-h-11 bg-white/20 text-white hover:bg-white/30"
              disabled={!consentGranted}
              render={<Link to="/practice/$scenarioId" params={{ scenarioId: scenario.id }} />}
            >
              Quick practice
            </Button>
          </div>
        </div>
        <div className="flex shrink-0 items-center justify-center">
          <div className="relative size-[120px]">
            <svg width={120} height={120} className="-rotate-90" viewBox="0 0 120 120">
              <circle cx={60} cy={60} r={52} fill="none" strokeWidth={8} className="stroke-white/20" />
              <circle
                cx={60}
                cy={60}
                r={52}
                fill="none"
                strokeWidth={8}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="stroke-white transition-all"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums text-white">
              {practicedScenarios}/{totalAllScenarios}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}

