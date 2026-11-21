import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '@/shared/lib/firebase'

import type { User } from '../model/types'

const toUser = (firebaseUser: { uid: string; displayName: string | null; email: string | null }): User => ({
  id: firebaseUser.uid,
  name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
  email: firebaseUser.email || '',
  role: 'Student',
})

export const observeAuthState = (onChange: (user: User | null) => void) =>
  onAuthStateChanged(auth, (firebaseUser) => {
    onChange(firebaseUser ? toUser(firebaseUser) : null)
  })
