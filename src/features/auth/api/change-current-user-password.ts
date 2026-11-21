import { updatePassword } from 'firebase/auth'

import { auth } from '@/shared/lib/firebase'

import { reauthenticateCurrentUser } from './reauthenticate-current-user'

export const changeCurrentUserPassword = async (currentPassword: string, newPassword: string) => {
  await reauthenticateCurrentUser(currentPassword)
  if (auth.currentUser) {
    await updatePassword(auth.currentUser, newPassword)
  }
}
