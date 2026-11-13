import { useState } from 'react'

import { useGrantVoiceConsentMutation } from '@/entities/user'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

type ConsentBannerProps = {
  uid: string
}

export const ConsentBanner = ({ uid }: ConsentBannerProps) => {
  const mutation = useGrantVoiceConsentMutation(uid)
  const [error, setError] = useState<string | null>(null)

  const handleConsent = async () => {
    setError(null)
    try {
      await mutation.mutateAsync()
    } catch {
      setError('Could not save voice consent. Please try again.')
    }
  }

  return (
    <Card className="border-primary/30 bg-primary/5 mb-4">
      <CardHeader>
        <CardTitle>Voice consent required</CardTitle>
        <CardDescription>
          AeroSpeak records your microphone to score your radio calls. Grant consent to start practicing.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button onClick={handleConsent} disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving…' : 'I consent'}
        </Button>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </CardContent>
    </Card>
  )
}
