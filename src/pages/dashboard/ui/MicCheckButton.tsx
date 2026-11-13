import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/shared/ui/button'

export const MicCheckButton = () => {
  const [checking, setChecking] = useState(false)

  const handleCheck = async () => {
    setChecking(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach((track) => track.stop())
      toast.success('Microphone is ready.')
    } catch {
      toast.error('Microphone access denied or unavailable.')
    } finally {
      setChecking(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleCheck} disabled={checking}>
      {checking ? 'Checking…' : 'Mic check'}
    </Button>
  )
}

