import { auth } from '@/shared/lib/firebase'

/** `Authorization: Bearer <Firebase ID token>` for the signed-in user, or nothing. */
export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const token = await auth.currentUser?.getIdToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}
