import { updatePassword } from 'firebase/auth'

import { auth } from '@/shared/lib/firebase'

import { reauthenticateCurrentUser } from './reauthenticate-current-user'

export const changeCurrentUserPassword = async (currentPassword: string, newPassword: string) => {
  await reauthenticateCurrentUser(currentPassword)
  if (!auth.currentUser) {
    throw new Error('User is not authenticated')
  }
  await updatePassword(auth.currentUser, newPassword)
}
