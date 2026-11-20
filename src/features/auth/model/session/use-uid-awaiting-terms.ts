import { useUser } from '../selectors'
import { useCurrentUserProfile } from '../requests/use-current-user-profile'

/** The signed-in user's id while their backend profile has no accepted terms, otherwise null. */
export const useUidAwaitingTerms = () => {
  const user = useUser()
  const { data: profile, isSuccess } = useCurrentUserProfile()
  return user && isSuccess && !profile?.termsAcceptedAt ? user.id : null
}
