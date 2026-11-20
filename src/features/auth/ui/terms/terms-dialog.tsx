import { useState } from 'react'
import { Link } from '@tanstack/react-router'

import { Button } from '@/shared/ui/button'
import { Checkbox } from '@/shared/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { Field, FieldLabel } from '@/shared/ui/field'

import { useAcceptTerms } from '../../model/requests/use-accept-terms'
import { useLogoutToLogin } from '../../model/session/use-logout-to-login'

type TermsDialogProps = {
  uid: string
}

export const TermsDialog = ({ uid }: TermsDialogProps) => {
  const logoutToLogin = useLogoutToLogin()
  const { acceptTerms, isPending } = useAcceptTerms(uid)
  const [accepted, setAccepted] = useState(false)

  return (
    <Dialog open>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>One more step</DialogTitle>
          <DialogDescription>
            AeroSpeak saves your transcripts and scores to track your progress. Your voice recordings are never stored.
          </DialogDescription>
        </DialogHeader>
        <Field orientation="horizontal">
          <Checkbox id="accept-terms" checked={accepted} onCheckedChange={(checked) => setAccepted(checked)} />
          <FieldLabel htmlFor="accept-terms" className="font-normal">
            <span>
              I agree to the{' '}
              <Link to="/terms-and-conditions" target="_blank" rel="noreferrer" className="underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" target="_blank" rel="noreferrer" className="underline">
                Privacy Policy
              </Link>
            </span>
          </FieldLabel>
        </Field>
        <DialogFooter>
          <Button variant="ghost" onClick={logoutToLogin}>
            Log out
          </Button>
          <Button disabled={!accepted || isPending} onClick={acceptTerms}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
