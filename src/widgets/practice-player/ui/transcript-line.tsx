import { cn } from 'cn'

import type { ScenarioStepDto } from '@/shared/api'

export type TextMode = 'prompt' | 'atc' | 'response'

type TranscriptLineProps = {
  step: ScenarioStepDto
  mode: TextMode
  /** The ATC transmission now in effect (`getAtcTransmission`): the step's call or ATC's correction. */
  atcText: string | undefined
}

export const TranscriptLine = ({ step, mode, atcText }: TranscriptLineProps) => {
  const text =
    mode === 'atc'
      ? (atcText ?? 'No ATC call in this step: you transmit first.')
      : mode === 'response'
        ? step.expectedPilotResponse
        : step.prompt

  return (
    <p
      aria-live="polite"
      className={cn(
        'min-h-12 flex-1 text-center text-sm leading-snug sm:text-base',
        mode === 'prompt' ? 'text-foreground' : 'text-destructive italic',
      )}
    >
      {text}
    </p>
  )
}
