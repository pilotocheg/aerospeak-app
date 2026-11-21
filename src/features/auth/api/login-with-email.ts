import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '@/shared/lib/firebase'

import type { LoginInput } from '../model/types'

export const loginWithEmail = async ({ email, password }: LoginInput) => {
  await signInWithEmailAndPassword(auth, email, password)
}
