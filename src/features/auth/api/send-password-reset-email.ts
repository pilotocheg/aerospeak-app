import { sendPasswordResetEmail as firebaseSendPasswordResetEmail } from 'firebase/auth'

import { auth } from '@/shared/lib/firebase'

export const sendPasswordResetEmail = async (email: string) => {
  await firebaseSendPasswordResetEmail(auth, email)
}
