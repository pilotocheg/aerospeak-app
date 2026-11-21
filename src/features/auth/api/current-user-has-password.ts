import { auth } from '@/shared/lib/firebase'

/** False for users who signed in only with Google: they have no password to change. */
export const currentUserHasPassword = () =>
  auth.currentUser?.providerData.some((provider) => provider.providerId === 'password') ?? false
