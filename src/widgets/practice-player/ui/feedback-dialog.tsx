import { TriangleAlert, Volume2 } from 'lucide-react'

import type { StepAttempt } from '@/features/practice-session'
import type { ScenarioStepDto } from '@/shared/api'
import { speak } from '@/shared/lib/speech'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog'

import { KeywordFeedback } from './keyword-feedback'
import { SectionTitle } from './section-title'

type FeedbackDialogProps = {
  open: boolean
  step: ScenarioStepDto
  attempt: StepAttempt | undefined
  attemptNumber: number
  isLastStep: boolean
  onOpenChange: (open: boolean) => void
  onPlayRecording: (url: string) => void
  onRetry: () => void
  onContinue: () => void
}

export const FeedbackDialog = ({
  open,
  step,
  attempt,
  attemptNumber,
  isLastStep,
  onOpenChange,
  onPlayRecording,
  onRetry,
  onContinue,
}: FeedbackDialogProps) => {
  if (!attempt) {
    return null
  }

  const { result } = attempt
  const missedCritical = result.elements.filter((e) => e.critical && e.status === 'missed')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>Attempt {attemptNumber}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold tabular-nums">{result.score}%</div>
          <div className="space-y-1">
            <Badge variant={result.success ? 'default' : 'destructive'}>
              {result.success ? 'Successful phrase' : 'Needs work'}
            </Badge>
            <p className="text-sm text-muted-foreground">Grade {result.displayScore} of 6</p>
          </div>
        </div>

        {missedCritical.length > 0 && (
          <div className="flex gap-3 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
            <TriangleAlert className="size-5 shrink-0" />
            <p>
              You missed {missedCritical.map((e) => `“${e.label}”`).join(', ')}. Safety-critical items must always be
              read back.
            </p>
          </div>
        )}

        <section className="space-y-2">
          <SectionTitle>Expected response</SectionTitle>
          <div className="rounded-lg bg-card p-4 ring-1 ring-foreground/10">
            <KeywordFeedback step={step} expected={result.expectedPilotResponse} elements={result.elements} />
          </div>
        </section>

        <section className="space-y-1">
          <SectionTitle>You said</SectionTitle>
          <p className="italic">“{result.transcript}”</p>
          <p className="text-sm text-brand">{result.tip}</p>
        </section>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => speak(result.expectedPilotResponse)}>
            <Volume2 />
            Hear expected response
          </Button>
          <Button variant="outline" size="sm" onClick={() => onPlayRecording(attempt.recordingUrl)}>
            <Volume2 />
            Hear your response
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onRetry}>
            Try again
          </Button>
          <Button onClick={onContinue}>{isLastStep ? 'Finish scenario' : 'Next transmission'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
