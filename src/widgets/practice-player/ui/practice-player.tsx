import { ArrowLeft, ArrowRight } from 'lucide-react'

import { getBriefingValue } from '@/entities/scenario'
import { PttButton } from '@/features/record-transmission'
import type { ScenarioDto } from '@/shared/api'
import { Button } from '@/shared/ui/button'

import { usePracticePlayer } from '../model/use-practice-player'
import { AtcButton } from './atc-button'
import { BriefingStrip } from './briefing-strip'
import { FeedbackDialog } from './feedback-dialog'
import { HelpDialog } from './help-dialog'
import { PracticeHeader } from './practice-header'
import { ScoreBar } from './score-bar'
import { StepVisual } from './step-visual'
import { SummaryDialog } from './summary-dialog'
import { ToggleEye } from './toggle-eye'
import { TranscriptLine } from './transcript-line'

type PracticePlayerProps = {
  scenario: ScenarioDto
}

export const PracticePlayer = ({ scenario }: PracticePlayerProps) => {
  const practice = usePracticePlayer(scenario)
  const { step, stepIndex, atc, recorder, isSubmitting, textMode } = practice

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <PracticeHeader
        sectionId={practice.sectionId}
        title={scenario.title}
        stepIndex={stepIndex}
        stepCount={scenario.steps.length}
        onHelp={() => practice.setOpenDialog('help')}
      />
      <BriefingStrip briefing={scenario.briefing ?? []} />
      <StepVisual scenario={scenario} step={step} />

      <div className="shrink-0 space-y-3 border-t bg-card px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-8">
        <ScoreBar score={practice.lastAttempt?.result.score} />
        <div className="h-5 text-center">
          {practice.lastAttempt && (
            <button
              type="button"
              className="text-sm text-brand hover:underline"
              onClick={() => practice.setOpenDialog('feedback')}
            >
              Show feedback
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <AtcButton
            hasAudio={Boolean(atc.audio)}
            isPlaying={practice.atcPlayback.isPlaying}
            currentTime={practice.player.currentTime}
            duration={practice.atcPlayback.duration}
            onToggle={practice.atcPlayback.toggle}
          />
          <TranscriptLine step={step} mode={textMode} atcText={atc.text} />
          <PttButton
            status={recorder.status}
            elapsedMs={recorder.elapsedMs}
            disabled={!practice.canRecord && !isSubmitting}
            busy={isSubmitting}
            onToggle={practice.toggleRecording}
          />
        </div>

        <div className="mx-auto flex max-w-md items-center justify-between">
          <ToggleEye
            label="ATC"
            active={textMode === 'atc'}
            disabled={!atc.text}
            onClick={() => practice.toggleTextMode('atc')}
          />
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Previous transmission"
            disabled={stepIndex === 0 || isSubmitting}
            onClick={practice.goPrevious}
          >
            <ArrowLeft className="size-6" />
          </Button>
          <span className="text-sm text-muted-foreground tabular-nums">
            {stepIndex + 1}/{scenario.steps.length}
          </span>
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label={practice.isLastStep ? 'Finish scenario' : 'Next transmission'}
            title={practice.isStepDone ? undefined : 'Record a response first'}
            disabled={!practice.isStepDone || isSubmitting}
            onClick={practice.goNext}
          >
            <ArrowRight className="size-6" />
          </Button>
          <ToggleEye label="RES" active={textMode === 'response'} onClick={() => practice.toggleTextMode('response')} />
        </div>
      </div>

      <HelpDialog
        open={practice.openDialog === 'help'}
        scenario={scenario}
        step={step}
        callsign={getBriefingValue(scenario, 'Callsign')}
        onOpenChange={(open) => practice.setOpenDialog(open ? 'help' : null)}
      />
      <FeedbackDialog
        open={practice.openDialog === 'feedback'}
        step={step}
        attempt={practice.lastAttempt}
        attemptNumber={practice.attempts.length}
        isLastStep={practice.isLastStep}
        correction={atc.isCorrection ? atc.text : undefined}
        onOpenChange={(open) => practice.setOpenDialog(open ? 'feedback' : null)}
        onPlayRecording={practice.player.play}
        onRetry={practice.retry}
        onContinue={practice.goNext}
      />
      <SummaryDialog
        open={practice.isFinished}
        title={scenario.title}
        summary={practice.summary}
        onRepeat={practice.repeat}
        onClose={practice.close}
      />
    </div>
  )
}
