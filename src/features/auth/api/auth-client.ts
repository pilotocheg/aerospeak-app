import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
} from 'firebase/auth'

import { auth } from '@/shared/lib/firebase'

import type { LoginInput, RegisterInput } from '../model/types'

export const loginWithEmail = async ({ email, password }: LoginInput) => {
  await signInWithEmailAndPassword(auth, email, password)
}

export const loginWithGoogle = async () => {
  await signInWithPopup(auth, new GoogleAuthProvider())
}

export const registerWithEmail = async ({ name, email, password }: RegisterInput) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  if (userCredential.user) {
    await updateProfile(userCredential.user, { displayName: name })
  }
}

export const logoutCurrentUser = async () => {
  await signOut(auth)
}

export const sendPasswordResetEmail = async (email: string) => {
  await firebaseSendPasswordResetEmail(auth, email)
}
