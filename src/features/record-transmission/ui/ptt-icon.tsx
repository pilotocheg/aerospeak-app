import { Loader2, Mic, Square } from 'lucide-react'

type PttIconProps = {
  isRecording: boolean
  isBusy: boolean
}

export const PttIcon = ({ isRecording, isBusy }: PttIconProps) => {
  if (isBusy) return <Loader2 className="size-7 animate-spin" />
  if (isRecording) return <Square className="size-6" />
  return <Mic className="size-7" />
}
