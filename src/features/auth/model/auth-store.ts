import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

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
  login: (payload: LoginInput) => void
  register: (payload: RegisterInput) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        login: ({ email, password }) => {
          if (!email || !password) {
            return
          }

          set(
            {
              user: { id: crypto.randomUUID(), name: email.split('@')[0], email, role: 'Student' },
              isAuthenticated: true,
            },
            false,
            'auth/login',
          )
        },
        register: ({ name, email, password, role }) => {
          if (!name || !email || !password) {
            return
          }

          set(
            {
              user: { id: crypto.randomUUID(), name, email, role },
              isAuthenticated: true,
            },
            false,
            'auth/register',
          )
        },
        logout: () => {
          set({ user: null, isAuthenticated: false }, false, 'auth/logout')
        },
      }),
      {
        name: 'aerospeak-auth-storage',
      },
    ),
    { name: 'AuthStore' },
  ),
)