import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

import { auth } from '@/shared/lib/firebase'

import type { RegisterInput } from '../model/types'

export const registerWithEmail = async ({ name, email, password }: RegisterInput) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  if (userCredential.user) {
    await updateProfile(userCredential.user, { displayName: name })
  }
}
