import { FirebaseError } from 'firebase/app'
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'

import { auth } from '@/shared/lib/firebase'

import { currentUserHasPassword } from './current-user-has-password'

// Firebase treats a sign-in older than about five minutes as not recent.
const RECENT_SIGN_IN_MS = 4 * 60 * 1000

/** Firebase asks for a recent login before sensitive actions (password change, account deletion). */
export const reauthenticateCurrentUser = async (password?: string) => {
  const user = auth.currentUser
  if (!user) {
    throw new Error('Not signed in')
  }

  if (currentUserHasPassword()) {
    if (!user.email || !password) {
      throw new Error('Password is required')
    }
    await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, password))
    return
  }

  const lastSignInAt = Date.parse(user.metadata.lastSignInTime ?? '')
  if (Number.isNaN(lastSignInAt) || Date.now() - lastSignInAt > RECENT_SIGN_IN_MS) {
    throw new FirebaseError('auth/requires-recent-login', 'The last sign-in is too old')
  }
}
