import { updateProfile } from 'firebase/auth'

import { auth } from '@/shared/lib/firebase'

export const changeCurrentUserUsername = async (newUsername: string) => {
  if (!auth.currentUser) {
    throw new Error('User is not authenticated')
  }
  await updateProfile(auth.currentUser, { displayName: newUsername })
}
