import { useEffect } from 'react'
import { initAuthSession } from '@/features/auth/model/actions'

export const useAuthSession = () => {
  useEffect(() => {
    const unsubscribe = initAuthSession()
    return () => unsubscribe()
  }, [])
}