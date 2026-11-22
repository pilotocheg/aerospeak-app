type PttAnnouncementProps = {
  isRecording: boolean
  isBusy: boolean
}

/**
 * Polite live region for screen readers: says when recording starts and when the attempt is
 * being scored. The visible label ticks every second, so it cannot be the live region itself.
 */
export const PttAnnouncement = ({ isRecording, isBusy }: PttAnnouncementProps) => {
  const announcement = getAnnouncement(isRecording, isBusy)

  return (
    <span role="status" aria-live="polite" className="sr-only">
      {announcement}
    </span>
  )
}

const getAnnouncement = (isRecording: boolean, isBusy: boolean) => {
  if (isRecording) return 'Recording'
  if (isBusy) return 'Scoring your readback'
  return ''
}
