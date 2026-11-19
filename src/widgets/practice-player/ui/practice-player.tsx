import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { useRecordScenarioResult } from '@/entities/progress'
import { getAtcTransmission, getBriefingValue } from '@/entities/scenario'
import { findSectionByPackId } from '@/entities/section'
import {
  buildSummary,
  useAttemptsByStep,
  useFinishPractice,
  useGoToStep,
  useIsFinished,
  useRunId,
  useStartPractice,
  useStepIndex,
} from '@/features/practice-session'
import { PttButton, useRecordToggleKey } from '@/features/record-transmission'
import type { ScenarioDto } from '@/shared/api'
import { useAudioPlayer } from '@/shared/lib/audio'
import { Button } from '@/shared/ui/button'

import { useAtcPlayback } from '../model/use-atc-playback'
import { usePracticeAttempt } from '../model/use-practice-attempt'
import { useStepAtcAutoplay } from '../model/use-step-atc-autoplay'
import { AtcButton } from './atc-button'
import { BriefingStrip } from './briefing-strip'
import { FeedbackDialog } from './feedback-dialog'
import { HelpDialog } from './help-dialog'
import { PracticeHeader } from './practice-header'
import { ScoreBar } from './score-bar'
import { StepVisual } from './step-visual'
import { SummaryDialog } from './summary-dialog'
import { ToggleEye } from './toggle-eye'
import { TranscriptLine, type TextMode } from './transcript-line'

type PracticePlayerProps = {
  scenario: ScenarioDto
}

type OpenDialog = 'help' | 'feedback' | null

export const PracticePlayer = ({ scenario }: PracticePlayerProps) => {
  const navigate = useNavigate()
  const stepIndex = useStepIndex()
  const runId = useRunId()
  const attemptsByStep = useAttemptsByStep()
  const isFinished = useIsFinished()
  const goToStep = useGoToStep()
  const finishPractice = useFinishPractice()
  const startPractice = useStartPractice()
  const recordScenarioResult = useRecordScenarioResult()
  const player = useAudioPlayer()

  const [textMode, setTextMode] = useState<TextMode>('prompt')
  const [openDialog, setOpenDialog] = useState<OpenDialog>(null)

  const step = scenario.steps[stepIndex]
  const attempts = attemptsByStep[step.id] ?? []
  const lastAttempt = attempts.at(-1)
  const isLastStep = stepIndex === scenario.steps.length - 1
  const isStepDone = attempts.length > 0
  const sectionId = findSectionByPackId(scenario.packId)?.id

  const atc = getAtcTransmission(step, lastAttempt?.result)
  const atcPlayback = useAtcPlayback(player, atc.audio)
  useStepAtcAutoplay(player, runId, step.atcAudio)

  const { recorder, canRecord, isSubmitting, toggleRecording } = usePracticeAttempt({
    scenario,
    step,
    player,
    onScored: () => setOpenDialog('feedback'),
  })
  useRecordToggleKey(openDialog === null && !isFinished && (canRecord || recorder.status !== 'idle'), toggleRecording)

  const enterStep = (index: number) => {
    // While an attempt is being scored, the result belongs to this step: stay on it.
    if (isSubmitting || (index > stepIndex && !isStepDone)) {
      return
    }
    goToStep(index)
    setTextMode('prompt')
    setOpenDialog(null)
  }

  const finish = () => {
    if (!isStepDone || isSubmitting) {
      return
    }
    player.stop()
    setOpenDialog(null)
    finishPractice()
    recordScenarioResult(scenario.id, buildSummary(scenario, attemptsByStep).scenarioScore)
  }

  const goNext = () => (isLastStep ? finish() : enterStep(stepIndex + 1))

  /** Retrying from the feedback goes straight to recording the readback. */
  const retry = () => {
    setOpenDialog(null)
    toggleRecording()
  }

  const toggleTextMode = (mode: TextMode) => setTextMode((current) => (current === mode ? 'prompt' : mode))

  const repeat = () => {
    startPractice(scenario.id)
    setTextMode('prompt')
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <PracticeHeader
        sectionId={sectionId}
        title={scenario.title}
        stepIndex={stepIndex}
        stepCount={scenario.steps.length}
        onHelp={() => setOpenDialog('help')}
      />
      <BriefingStrip briefing={scenario.briefing ?? []} />
      <StepVisual scenario={scenario} step={step} />

      <div className="shrink-0 space-y-3 border-t bg-card px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-8">
        <ScoreBar score={lastAttempt?.result.score} />
        <div className="h-5 text-center">
          {lastAttempt && (
            <button
              type="button"
              className="text-sm text-brand hover:underline"
              onClick={() => setOpenDialog('feedback')}
            >
              Show feedback
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <AtcButton
            hasAudio={Boolean(atc.audio)}
            isPlaying={atcPlayback.isPlaying}
            currentTime={player.currentTime}
            duration={atcPlayback.duration}
            onToggle={atcPlayback.toggle}
          />
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
            disabled={stepIndex === 0 || isSubmitting}
            onClick={() => enterStep(stepIndex - 1)}
          >
            <ArrowLeft className="size-6" />
          </Button>
          <span className="text-sm text-muted-foreground tabular-nums">
            {stepIndex + 1}/{scenario.steps.length}
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
        open={openDialog === 'help'}
        scenario={scenario}
        step={step}
        callsign={getBriefingValue(scenario, 'Callsign')}
        onOpenChange={(open) => setOpenDialog(open ? 'help' : null)}
      />
      <FeedbackDialog
        open={openDialog === 'feedback'}
        step={step}
        attempt={lastAttempt}
        attemptNumber={attempts.length}
        isLastStep={isLastStep}
        correction={atc.isCorrection ? atc.text : undefined}
        onOpenChange={(open) => setOpenDialog(open ? 'feedback' : null)}
        onPlayRecording={player.play}
        onRetry={retry}
        onContinue={goNext}
      />
      <SummaryDialog
        open={isFinished}
        title={scenario.title}
        summary={buildSummary(scenario, attemptsByStep)}
        onRepeat={repeat}
        onClose={() =>
          sectionId
            ? navigate({ to: '/lessons/$sectionId', params: { sectionId }, search: { scenario: scenario.id } })
            : navigate({ to: '/lessons' })
        }
      />
    </div>
  )
}
