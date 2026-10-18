import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

import { submitAttempt } from '@/entities/attempt'
import { guestQueryOptions } from '@/entities/guest'
import { useRecordScenarioResult } from '@/entities/progress'
import { getBriefingValue, scenarioDeployedQueryOptions } from '@/entities/scenario'
import {
  buildSummary,
  useAddAttempt,
  useAttemptsByStep,
  useFinishPractice,
  useGoToStep,
  useIsFinished,
  useStartPractice,
  useStepIndex,
} from '@/features/practice-session'
import { PttButton, usePushToTalkKey, useRecorder, type Recording } from '@/features/record-transmission'
import type { ScenarioDto } from '@/shared/api'
import { LOCAL_SCORING_FALLBACK } from '@/shared/config/features'
import { useAudioPlayer } from '@/shared/lib/audio'
import { stopSpeaking } from '@/shared/lib/speech'
import { Button } from '@/shared/ui/button'

import { AerodromeChart } from './aerodrome-chart'
import { AtcButton } from './atc-button'
import { BriefingStrip } from './briefing-strip'
import { FeedbackDialog } from './feedback-dialog'
import { HelpDialog } from './help-dialog'
import { PracticeHeader } from './practice-header'
import { ScoreBar } from './score-bar'
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

  const { data: guestId } = useQuery(guestQueryOptions())
  const { data: isDeployed } = useQuery(scenarioDeployedQueryOptions(scenario.id))
  const scoreLocally = isDeployed === false && LOCAL_SCORING_FALLBACK

  const attemptMutation = useMutation({
    mutationFn: submitAttempt,
    onError: (error) => toast.error(error.message),
  })

  const handleRecorded = (recording: Recording) => {
    if (!guestId && !scoreLocally) {
      toast.error('Not connected to the server yet. Try again in a moment.')
      return
    }
    attemptMutation.mutate(
      {
        guestId: guestId ?? '',
        scenarioId: scenario.id,
        step,
        audio: recording.blob,
        localTranscript: recording.transcript,
        scoreLocally,
      },
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
    withTranscript: scoreLocally,
    onRecorded: handleRecorded,
    onError: (error) => toast.error(error.message),
  })

  const canRecord = isDeployed !== undefined && (scoreLocally || Boolean(guestId)) && !attemptMutation.isPending

  const pressTalk = () => {
    if (!canRecord) {
      return
    }
    player.stop()
    stopSpeaking()
    recorder.start()
  }

  usePushToTalkKey(canRecord && openDialog === null && !isFinished, pressTalk, recorder.stop)

  const enterStep = (index: number) => {
    const next = scenario.steps[index]
    goToStep(index)
    setTextMode('prompt')
    setOpenDialog(null)
    if (next.atcAudio) {
      player.play(next.atcAudio)
    } else {
      player.stop()
    }
  }

  const finish = () => {
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
    <div className="flex h-dvh flex-col bg-background">
      <PracticeHeader
        scenarioId={scenario.id}
        title={scenario.title}
        stepIndex={stepIndex}
        stepCount={scenario.steps.length}
        onHelp={() => setOpenDialog('help')}
      />
      <BriefingStrip briefing={scenario.briefing ?? []} />
      <AerodromeChart
        airport={getBriefingValue(scenario, 'Airport')}
        position={getBriefingValue(scenario, 'Position')}
      />

      <div className="shrink-0 space-y-3 border-t bg-black px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-8">
        <ScoreBar score={lastAttempt?.result.score} />
        <div className="h-5 text-center">
          {lastAttempt && (
            <button
              type="button"
              className="text-sm text-primary hover:underline"
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
            onPress={pressTalk}
            onRelease={recorder.stop}
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
        onClose={() => navigate({ to: '/', search: { scenario: scenario.id } })}
      />
    </div>
  )
}
