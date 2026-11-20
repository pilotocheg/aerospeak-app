import { Volume2 } from 'lucide-react'

import { speak } from '@/shared/lib/speech'
import { Button } from '@/shared/ui/button'

type HearExpectedButtonProps = {
  text: string
}

export const HearExpectedButton = ({ text }: HearExpectedButtonProps) => (
  <Button variant="outline" size="sm" onClick={() => speak(text)}>
    <Volume2 />
    Hear expected response
  </Button>
)
