import { GoogleAuthProvider, signInWithCredential, type UserCredential } from 'firebase/auth'

import { auth } from '@/shared/lib/firebase'

export const signInWithGoogleIdToken = async (idToken: string): Promise<UserCredential> => {
  const credential = GoogleAuthProvider.credential(idToken)
  return signInWithCredential(auth, credential)
}
