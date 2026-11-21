import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { auth } from '@/shared/lib/firebase'
import { currentUserHasPassword } from '../../api'
/** False for users who signed in only with Google: they have no password to change or confirm. */

export const useHasPasswordProvider = () => {
  const [hasPassword, setHasPassword] = useState(() => currentUserHasPassword())

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      const result = user?.providerData.some((provider) => provider.providerId === 'password') ?? false
      setHasPassword(result)
    })
  }, [])

  return hasPassword
}
