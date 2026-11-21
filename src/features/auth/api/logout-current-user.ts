import { signOut, updateCurrentUser } from 'firebase/auth'

import { auth } from '@/shared/lib/firebase'

/** Signs out; if Firebase fails, drops the user from this browser anyway so logout never gets stuck. */
export const logoutCurrentUser = async () => {
  try {
    await signOut(auth)
  } catch {
    await updateCurrentUser(auth, null).catch(() => undefined)
  }
}
