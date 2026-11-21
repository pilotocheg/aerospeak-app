import {
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from 'firebase/auth'

import { auth } from '@/shared/lib/firebase'

import { currentUserHasPassword } from './current-user-has-password'

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

  await reauthenticateWithPopup(user, new GoogleAuthProvider())
}
