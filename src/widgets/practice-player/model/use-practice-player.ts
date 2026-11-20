import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { getAtcTransmission } from '@/entities/scenario'
import { findSectionByPackId } from '@/entities/section'
import {
  buildSummary,
  useAttemptsByStep,
  useCompletePractice,
  useGoToStep,
  useIsFinished,
  useRunId,
  useStartPractice,
  useStepIndex,
} from '@/features/practice-session'
import { useRecordToggleKey } from '@/features/record-transmission'
import type { ScenarioDto } from '@/shared/api'
import { useAudioPlayer } from '@/shared/lib/audio'

import { useAtcPlayback } from './use-atc-playback'
import { usePracticeAttempt } from './use-practice-attempt'
import { useStepAtcAutoplay } from './use-step-atc-autoplay'

export type TextMode = 'prompt' | 'atc' | 'response'

type OpenDialog = 'help' | 'feedback' | null

/** State and handlers of the practice screen: steps, ATC playback, recording, dialogs, finishing. */
export const usePracticePlayer = (scenario: ScenarioDto) => {
  const navigate = useNavigate()
  const stepIndex = useStepIndex()
  const runId = useRunId()
  const attemptsByStep = useAttemptsByStep()
  const isFinished = useIsFinished()
  const goToStep = useGoToStep()
  const completePractice = useCompletePractice()
  const startPractice = useStartPractice()
  const player = useAudioPlayer()

  const [textMode, setTextMode] = useState<TextMode>('prompt')
  const [openDialog, setOpenDialog] = useState<OpenDialog>(null)

  const step = scenario.steps[stepIndex]
  const attempts = attemptsByStep[step.id] ?? []
  const lastAttempt = attempts.at(-1)
  const isLastStep = stepIndex === scenario.steps.length - 1
  const isStepDone = attempts.length > 0
  const sectionId = findSectionByPackId(scenario.packId)?.id
  const summary = buildSummary(scenario, attemptsByStep)

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
    completePractice(scenario)
  }

  return {
    step,
    stepIndex,
    attempts,
    lastAttempt,
    isLastStep,
    isStepDone,
    isFinished,
    sectionId,
    summary,
    atc,
    atcPlayback,
    player,
    recorder,
    canRecord,
    isSubmitting,
    toggleRecording,
    textMode,
    openDialog,
    setOpenDialog,
    toggleTextMode: (mode: TextMode) => setTextMode((current) => (current === mode ? 'prompt' : mode)),
    goPrevious: () => enterStep(stepIndex - 1),
    goNext: () => (isLastStep ? finish() : enterStep(stepIndex + 1)),
    /** Retrying from the feedback goes straight to recording the readback. */
    retry: () => {
      setOpenDialog(null)
      toggleRecording()
    },
    repeat: () => {
      startPractice(scenario.id)
      setTextMode('prompt')
    },
    close: () =>
      sectionId
        ? navigate({ to: '/lessons/$sectionId', params: { sectionId }, search: { scenario: scenario.id } })
        : navigate({ to: '/lessons' }),
  }
}
