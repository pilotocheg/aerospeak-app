import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { auth } from '@/shared/lib/firebase'

export const loginWithGoogle = async () => {
  await signInWithPopup(auth, new GoogleAuthProvider())
}
