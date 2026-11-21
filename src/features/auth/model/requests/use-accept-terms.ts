import { toast } from 'sonner'

import { useRegisterUserProfileMutation } from '@/entities/user'

import { getCurrentUserDisplayName } from '../../api'

/** Finishes registration (`POST /me`) with accepted terms. */
export const useAcceptTerms = (uid: string) => {
  const registerProfile = useRegisterUserProfileMutation(uid)

  const acceptTerms = () =>
    // The ID token may not carry a name set right after sign-up, so send the display name explicitly.
    registerProfile.mutate(
      { acceptTerms: true, name: getCurrentUserDisplayName() },
      { onError: () => toast.error('Could not finish registration. Please try again.') },
    )

  return { acceptTerms, isPending: registerProfile.isPending }
}
