import { ArrowLeft, ArrowRight } from 'lucide-react'

import { getBriefingValue } from '@/entities/scenario'
import { PttButton } from '@/features/record-transmission'
import type { ScenarioDto } from '@/shared/api'
import { Button } from '@/shared/ui/button'

import { usePracticePlayer } from '../model/use-practice-player'
import { AtcButton } from './controls/atc-button'
import { BriefingStrip } from './controls/briefing-strip'
import { FeedbackDialog } from './feedback/feedback-dialog'
import { HelpDialog } from './help/help-dialog'
import { PracticeHeader } from './controls/practice-header'
import { ScoreBar } from './controls/score-bar'
import { StepVisual } from './charts/step-visual'
import { SummaryDialog } from './summary/summary-dialog'
import { ToggleEye } from './controls/toggle-eye'
import { TranscriptLine } from './controls/transcript-line'

type PracticePlayerProps = {
  scenario: ScenarioDto
}

export const PracticePlayer = ({ scenario }: PracticePlayerProps) => {
  const {
    practiceStep,
    atc,
    recording,
    dialogs,
    transcript,
    navigation,
    summary,
    sectionId,
    retry,
    closePractice,
    playRecording,
  } = usePracticePlayer(scenario)
  const {
    step,
    stepIndex,
    stepCount,
    attempts,
    lastAttempt,
    lastResult,
    isFirstStep,
    isLastStep,
    isStepDone,
    isFinished,
  } = practiceStep
  const { recorder, canRecord, isSubmitting, toggleRecording } = recording
  const { isHelpOpen, isFeedbackOpen, openHelp, openFeedback, toggleDialog } = dialogs
  const { textMode, toggleTextMode } = transcript
  const { goPrevious, goNext, repeat } = navigation
  const { title, briefing = [] } = scenario

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <PracticeHeader
        sectionId={sectionId}
        title={title}
        stepIndex={stepIndex}
        stepCount={stepCount}
        onHelp={openHelp}
      />
      <BriefingStrip briefing={briefing} />
      <StepVisual scenario={scenario} step={step} />

      <div className="shrink-0 space-y-3 border-t bg-card px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-8">
        <ScoreBar score={lastResult?.score} />
        <div className="h-5 text-center">
          {lastAttempt && (
            <button type="button" className="text-sm text-brand hover:underline" onClick={openFeedback}>
              Show feedback
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <AtcButton atc={atc} />
          <TranscriptLine step={step} mode={textMode} atcText={atc.text} />
          <PttButton
            status={recorder.status}
            elapsedMs={recorder.elapsedMs}
            disabled={!canRecord && !isSubmitting}
            busy={isSubmitting}
            onToggle={toggleRecording}
          />
        </div>

        <div className="mx-auto flex max-w-md items-center justify-between">
          <ToggleEye
            label="ATC"
            active={textMode === 'atc'}
            disabled={!atc.text}
            onClick={() => toggleTextMode('atc')}
          />
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Previous transmission"
            disabled={isFirstStep || isSubmitting}
            onClick={goPrevious}
          >
            <ArrowLeft className="size-6" />
          </Button>
          <span className="text-sm text-muted-foreground tabular-nums">
            {stepIndex + 1}/{stepCount}
          </span>
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label={isLastStep ? 'Finish scenario' : 'Next transmission'}
            title={isStepDone ? undefined : 'Record a response first'}
            disabled={!isStepDone || isSubmitting}
            onClick={goNext}
          >
            <ArrowRight className="size-6" />
          </Button>
          <ToggleEye label="RES" active={textMode === 'response'} onClick={() => toggleTextMode('response')} />
        </div>
      </div>

      <HelpDialog
        open={isHelpOpen}
        scenario={scenario}
        step={step}
        callsign={getBriefingValue(scenario, 'Callsign')}
        onOpenChange={toggleDialog('help')}
      />
      <FeedbackDialog
        open={isFeedbackOpen}
        step={step}
        attempt={lastAttempt}
        attemptNumber={attempts.length}
        isLastStep={isLastStep}
        correction={atc.correction}
        onOpenChange={toggleDialog('feedback')}
        onPlayRecording={playRecording}
        onRetry={retry}
        onContinue={goNext}
      />
      <SummaryDialog open={isFinished} title={title} summary={summary} onRepeat={repeat} onClose={closePractice} />
    </div>
  )
}
