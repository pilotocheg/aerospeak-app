import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

import { SttFailedError, submitAttempt } from '@/entities/attempt'
import { guestQueryOptions } from '@/entities/guest'
import { useRecordScenarioResult } from '@/entities/progress'
import { getBriefingValue } from '@/entities/scenario'
import { findSectionByPackId } from '@/entities/section'
import {
  buildSummary,
  useAddAttempt,
  useAttemptsByStep,
  useFinishPractice,
  useGoToStep,
  useIsFinished,
  useRunId,
  useStartPractice,
  useStepIndex,
} from '@/features/practice-session'
import {
  PttButton,
  TooShortError,
  useRecordToggleKey,
  useRecorder,
  type Recording,
} from '@/features/record-transmission'
import type { ScenarioDto } from '@/shared/api'
import { useAudioPlayer } from '@/shared/lib/audio'
import { stopSpeaking } from '@/shared/lib/speech'
import { Button } from '@/shared/ui/button'

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
  const addAttempt = useAddAttempt()
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
  // A step counts as done after any scored attempt; only then can the user move on.
  const isStepDone = attempts.length > 0
  const sectionId = findSectionByPackId(scenario.packId)?.id

  const { data: guestId } = useQuery(guestQueryOptions())

  const attemptMutation = useMutation({
    mutationFn: submitAttempt,
    onError: (error) => (error instanceof SttFailedError ? toast.warning(error.message) : toast.error(error.message)),
  })

  const handleRecorded = (recording: Recording) => {
    if (!guestId) {
      toast.error('Not connected to the server yet. Try again in a moment.')
      return
    }
    attemptMutation.mutate(
      { guestId, scenarioId: scenario.id, stepId: step.id, audio: recording.blob },
      {
        onSuccess: (result) => {
          addAttempt(step.id, { result, recordingUrl: recording.url })
          setOpenDialog('feedback')
        },
        onError: () => URL.revokeObjectURL(recording.url),
      },
    )
  }

  const recorder = useRecorder({
    onRecorded: handleRecorded,
    onError: (error) => (error instanceof TooShortError ? toast.warning(error.message) : toast.error(error.message)),
  })

  const canRecord = Boolean(guestId) && !attemptMutation.isPending

  const toggleRecording = () => {
    if (recorder.status === 'idle') {
      if (!canRecord) {
        return
      }
      player.stop()
      stopSpeaking()
    }
    recorder.toggle()
  }

  useRecordToggleKey(openDialog === null && !isFinished && (canRecord || recorder.status !== 'idle'), toggleRecording)

  // ATC speaks first: play the step's call as soon as the step opens (also after "Repeat").
  const { play, stop } = player
  useEffect(() => {
    if (step.atcAudio) {
      play(step.atcAudio)
    } else {
      stop()
    }
  }, [runId, step.atcAudio, play, stop])

  const enterStep = (index: number) => {
    if (index > stepIndex && !isStepDone) {
      return
    }
    goToStep(index)
    setTextMode('prompt')
    setOpenDialog(null)
  }

  const finish = () => {
    if (!isStepDone) {
      return
    }
    player.stop()
    setOpenDialog(null)
    finishPractice()
    recordScenarioResult(scenario.id, buildSummary(scenario, attemptsByStep).scenarioScore)
  }

  const goNext = () => (isLastStep ? finish() : enterStep(stepIndex + 1))

  const toggleAtc = () => {
    if (!step.atcAudio) {
      return
    }
    if (player.playingSrc === step.atcAudio) {
      player.stop()
    } else {
      player.play(step.atcAudio)
    }
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

      <div className="shrink-0 space-y-3 border-t bg-black px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-8">
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
            hasAudio={Boolean(step.atcAudio)}
            isPlaying={player.playingSrc === step.atcAudio && Boolean(step.atcAudio)}
            currentTime={player.currentTime}
            duration={player.playingSrc === step.atcAudio ? player.duration : 0}
            onToggle={toggleAtc}
          />
          <TranscriptLine step={step} mode={textMode} />
          <PttButton
            status={recorder.status}
            elapsedMs={recorder.elapsedMs}
            disabled={!canRecord && !attemptMutation.isPending}
            busy={attemptMutation.isPending}
            onToggle={toggleRecording}
          />
        </div>

        <div className="mx-auto flex max-w-md items-center justify-between">
          <ToggleEye
            label="ATC"
            active={textMode === 'atc'}
            disabled={!step.atcText}
            onClick={() => toggleTextMode('atc')}
          />
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Previous transmission"
            disabled={stepIndex === 0}
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
            disabled={!isStepDone}
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
        onOpenChange={(open) => setOpenDialog(open ? 'feedback' : null)}
        onPlayRecording={player.play}
        onRetry={() => setOpenDialog(null)}
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
