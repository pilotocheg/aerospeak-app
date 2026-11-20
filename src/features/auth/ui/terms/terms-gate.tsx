import { useUidAwaitingTerms } from '../../model/session/use-uid-awaiting-terms'
import { TermsDialog } from './terms-dialog'

/** Blocks the app until the signed-in user has a backend profile with accepted terms (`POST /me`). */
export const TermsGate = () => {
  const uid = useUidAwaitingTerms()
  return uid ? <TermsDialog uid={uid} /> : null
}
