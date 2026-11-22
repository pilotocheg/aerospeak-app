import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { auth } from '@/shared/lib/firebase'
import { currentUserHasPassword } from '../../api'

export const useHasPasswordProvider = () => {
  const [hasPassword, setHasPassword] = useState(currentUserHasPassword)

  useEffect(
    () =>
      onAuthStateChanged(auth, () => {
        setHasPassword(currentUserHasPassword())
      }),
    [],
  )

  return hasPassword
}
