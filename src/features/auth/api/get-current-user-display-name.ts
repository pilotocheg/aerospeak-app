import { auth } from '@/shared/lib/firebase'

/** The Firebase display name, trimmed to what `POST /me` accepts. */
export const getCurrentUserDisplayName = () => auth.currentUser?.displayName?.trim().slice(0, 80) || undefined
