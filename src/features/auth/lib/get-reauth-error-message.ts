import { FirebaseError } from 'firebase/app'

/** Turns a Firebase error from a re-authenticated action into a message for a toast. */
export const getReauthErrorMessage = (error: unknown, fallback: string) => {
  if (!(error instanceof FirebaseError)) {
    return fallback
  }

  switch (error.code) {
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'The password is incorrect'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later'
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Confirmation was cancelled'
    case 'auth/weak-password':
      return 'The new password is too weak'
    default:
      return fallback
  }
}
