import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { getUserProfileQueryOptions, useRegisterUserProfileMutation } from '@/entities/user'
import { auth } from '@/shared/lib/firebase'
import { Button } from '@/shared/ui/button'
import { Checkbox } from '@/shared/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { Field, FieldLabel } from '@/shared/ui/field'

import { useLogout } from '../model/actions'
import { useUser } from '../model/selectors'

type TermsDialogProps = {
  uid: string
}

const TermsDialog = ({ uid }: TermsDialogProps) => {
  const navigate = useNavigate()
  const logout = useLogout()
  const registerProfile = useRegisterUserProfileMutation(uid)
  const [accepted, setAccepted] = useState(false)

  const handleContinue = () => {
    // The ID token may not carry a name set right after sign-up, so send the display name explicitly.
    const name = auth.currentUser?.displayName?.trim().slice(0, 80) || undefined
    registerProfile.mutate(
      { acceptTerms: true, name },
      { onError: () => toast.error('Could not finish registration. Please try again.') },
    )
  }

  const handleLogout = async () => {
    await logout()
    await navigate({ to: '/login', replace: true })
  }

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
          <Button variant="ghost" onClick={handleLogout}>
            Log out
          </Button>
          <Button disabled={!accepted || registerProfile.isPending} onClick={handleContinue}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/** Blocks the app until the signed-in user has a backend profile with accepted terms (`POST /me`). */
export const TermsGate = () => {
  const user = useUser()
  const { data: profile, isSuccess } = useQuery({
    ...getUserProfileQueryOptions(user?.id ?? ''),
    enabled: Boolean(user),
  })

  if (!user || !isSuccess || profile?.termsAcceptedAt) {
    return null
  }
  return <TermsDialog uid={user.id} />
}
