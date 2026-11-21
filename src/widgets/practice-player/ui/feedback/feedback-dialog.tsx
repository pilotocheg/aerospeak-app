import { RadioTower, TriangleAlert, Volume2 } from 'lucide-react'

import type { StepAttempt } from '@/features/practice-session'
import type { ScenarioStepDto } from '@/shared/api'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { SectionTitle } from '@/shared/ui/section-title'

import { getFeedbackNotices } from '../../lib/feedback/get-feedback-notices'
import { Callout } from '../common/callout'
import { HearExpectedButton } from '../common/hear-expected-button'
import { KeywordFeedback } from './keyword-feedback'
import { OrderNotice } from './order-notice'
import { Panel } from '../common/panel'

type FeedbackDialogProps = {
  open: boolean
  step: ScenarioStepDto
  attempt: StepAttempt | undefined
  attemptNumber: number
  isLastStep: boolean
  /** ATC's "negative, I say again" when this readback missed a critical element. */
  correction?: string
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
  correction,
  onOpenChange,
  onPlayRecording,
  onRetry,
  onContinue,
}: FeedbackDialogProps) => {
  if (!attempt) {
    return null
  }

  const { result } = attempt
  const { missedCritical, wrongCritical, order, outOfOrder, showTip } = getFeedbackNotices(result)

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
          <Callout tone="destructive" icon={TriangleAlert}>
            <p>
              You missed {missedCritical.map((e) => `“${e.label}”`).join(', ')}. Safety-critical items must always be
              read back.
            </p>
          </Callout>
        )}

        {wrongCritical.map((element) => (
          <Callout key={element.id} tone="destructive" icon={TriangleAlert}>
            <p>
              “{element.label}”: {element.hint}
            </p>
          </Callout>
        ))}

        {order && <OrderNotice order={order} />}

        {correction && (
          <Callout tone="brand" icon={RadioTower}>
            <div className="space-y-0.5">
              <p className="font-semibold">ATC corrects you</p>
              <p className="italic">“{correction}”</p>
              <p className="text-muted-foreground">Read back the corrected instruction again.</p>
            </div>
          </Callout>
        )}

        <section className="space-y-2">
          <SectionTitle>Expected response</SectionTitle>
          <Panel>
            <KeywordFeedback
              step={step}
              expected={result.expectedPilotResponse}
              elements={result.elements}
              outOfOrder={outOfOrder}
            />
          </Panel>
        </section>

        <section className="space-y-1">
          <SectionTitle>You said</SectionTitle>
          <p className="italic">“{result.transcript}”</p>
          {showTip && <p className="text-sm text-brand">{result.tip}</p>}
        </section>

        <div className="flex flex-wrap gap-2">
          <HearExpectedButton text={result.expectedPilotResponse} />
          <Button variant="outline" size="sm" onClick={() => onPlayRecording(attempt.recordingUrl)}>
            <Volume2 />
            Hear your response
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onRetry}>
            {correction ? 'Read back again' : 'Try again'}
          </Button>
          <Button onClick={onContinue}>{isLastStep ? 'Finish scenario' : 'Next transmission'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
