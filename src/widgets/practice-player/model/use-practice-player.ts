import { useCompletePractice, useRunId } from '@/features/practice-session'
import { useRecordToggleKey } from '@/features/record-transmission'
import type { ScenarioDto } from '@/shared/api'
import { useAudioPlayer } from '@/shared/lib/audio'

import { useStepAtc } from './atc/use-step-atc'
import { usePracticeAttempt } from './recording/use-practice-attempt'
import { useClosePractice } from './step/use-close-practice'
import { usePracticeStep } from './step/use-practice-step'
import { useStepNavigation } from './step/use-step-navigation'
import { usePracticeDialogs } from './view/use-practice-dialogs'
import { useTextMode } from './view/use-text-mode'

/** Composes the practice screen: step, ATC transmission, recording, dialogs and navigation. */
export const usePracticePlayer = (scenario: ScenarioDto) => {
  const runId = useRunId()
  const player = useAudioPlayer()
  const practiceStep = usePracticeStep(scenario)
  const { step, stepIndex, lastAttempt, isLastStep, isStepDone, isFinished } = practiceStep
  const dialogs = usePracticeDialogs()
  const transcript = useTextMode()
  const atc = useStepAtc({ player, runId, step, lastAttempt })
  const { sectionId, closePractice } = useClosePractice(scenario)
  const { summary, completePractice } = useCompletePractice(scenario)

  const recording = usePracticeAttempt({ scenario, step, player, onScored: dialogs.openFeedback })
  const { recorder, canRecord, isSubmitting, toggleRecording } = recording

  const isRecording = recorder.status !== 'idle'
  const isRecordKeyEnabled = !dialogs.isAnyDialogOpen && !isFinished && (canRecord || isRecording)
  useRecordToggleKey(isRecordKeyEnabled, toggleRecording)

  const enterStep = () => {
    dialogs.closeDialog()
    transcript.resetTextMode()
  }

  const finishRun = () => {
    player.stop()
    dialogs.closeDialog()
    transcript.resetTextMode()
  }

  const navigation = useStepNavigation({
    scenario,
    stepIndex,
    isLastStep,
    isStepDone,
    isSubmitting,
    onEnterStep: enterStep,
    onFinish: finishRun,
    onRestart: transcript.resetTextMode,
    completePractice,
  })

  /** Retrying from the feedback goes straight to recording the readback. */
  const retry = () => {
    dialogs.closeDialog()
    toggleRecording()
  }

  return {
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
    playRecording: player.play,
  }
}
