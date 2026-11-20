import { formatTime } from '@/shared/lib/format-time'

type PttLabelProps = {
  isRecording: boolean
  isBusy: boolean
  disabled?: boolean
  elapsedMs: number
}

export const PttLabel = ({ isRecording, isBusy, disabled, elapsedMs }: PttLabelProps) => {
  if (isRecording) return formatTime(elapsedMs / 1000)
  if (isBusy) return 'Scoring…'
  if (disabled) return 'Connecting…'
  return (
    <>
      Tap<span className="hidden sm:inline"> · Space</span>
    </>
  )
}
