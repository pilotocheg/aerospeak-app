import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

const createDefaultUser = (email: string, name?: string): User => ({
  id: crypto.randomUUID(),
  name: name ?? email.split('@')[0],
  email,
  role: 'Student',
})

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: ({ email, password }) => {
        if (!email || !password) {
          return
        }

        set({
          user: createDefaultUser(email),
          isAuthenticated: true,
        })
      },
      register: ({ name, email, password, role }) => {
        if (!name || !email || !password) {
          return
        }

        set({
          user: {
            id: crypto.randomUUID(),
            name,
            email,
            role,
          },
          isAuthenticated: true,
        })
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'aerospeak-auth',
    },
  ),
)
