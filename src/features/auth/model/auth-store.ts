import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


import { auth } from '@/shared/lib/firebase'

export type UserRole = 'Student' | 'Mentor'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
}

export type LoginInput = {
  email: string
  password: string
}

export type RegisterInput = {
  name: string
  email: string
  password: string
  role: UserRole
}

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (payload: LoginInput) => Promise<void>
  register: (payload: RegisterInput) => Promise<void>
  logout: () => Promise<void>
  initAuthListener: () => () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      login: async ({ email, password }) => {
        set({ isLoading: true }, false, 'auth/login-start')
        try {
          await signInWithEmailAndPassword(auth, email, password)
        } finally {
          set({ isLoading: false }, false, 'auth/login-end')
        }
      },

      register: async ({ name, email, password }) => {
        set({ isLoading: true }, false, 'auth/register-start')
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          if (userCredential.user) {
            await updateProfile(userCredential.user, { displayName: name })
          }
        } finally {
          set({ isLoading: false }, false, 'auth/register-end')
        }
      },

      logout: async () => {
        set({ isLoading: true }, false, 'auth/logout-start')
        try {
          await signOut(auth)
          set(
            {
              user: null,
              isAuthenticated: false,
              isLoading: false,
            },
            false,
            'auth/logout-success',
          )
        } catch {
          set({ isLoading: false }, false, 'auth/logout-error')
        }
      },

      initAuthListener: () => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            set(
              {
                user: {
                  id: firebaseUser.uid,
                  name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
                  email: firebaseUser.email || '',
                  role: 'Student',
                },
                isAuthenticated: true,
                isLoading: false,
              },
              false,
              'auth/state-changed-authenticated',
            )
          } else {
            set(
              {
                user: null,
                isAuthenticated: false,
                isLoading: false,
              },
              false,
              'auth/state-changed-unauthenticated',
            )
          }
        })

        return unsubscribe
      },
    }),
    { name: 'AuthStore' },
  ),
)