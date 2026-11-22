import { FirebaseError } from 'firebase/app'
import { deleteUser } from 'firebase/auth'

import { auth } from '@/shared/lib/firebase'

const ALREADY_DELETED_CODES = ['auth/user-not-found']

export const deleteCurrentFirebaseUser = async () => {
  const user = auth.currentUser
  if (!user) {
    return
  }

  try {
    await deleteUser(user)
  } catch (error) {
    if (error instanceof FirebaseError && ALREADY_DELETED_CODES.includes(error.code)) {
      return
    }
    throw error
  }
}
