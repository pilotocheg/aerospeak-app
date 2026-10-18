import { cn } from 'cn'

import type { ScenarioStepDto } from '@/shared/api'

export type TextMode = 'prompt' | 'atc' | 'response'

type TranscriptLineProps = {
  step: ScenarioStepDto
  mode: TextMode
}

export const TranscriptLine = ({ step, mode }: TranscriptLineProps) => {
  const text =
    mode === 'atc'
      ? (step.atcText ?? 'No ATC call in this step: you transmit first.')
      : mode === 'response'
        ? step.expectedPilotResponse
        : step.prompt

  return (
    <p
      aria-live="polite"
      className={cn(
        'min-h-12 flex-1 text-center text-sm leading-snug sm:text-base',
        mode === 'prompt' ? 'text-foreground' : 'text-red-400 italic',
      )}
    >
      {text}
    </p>
  )
}
