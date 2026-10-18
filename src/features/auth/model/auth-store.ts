import { create } from 'zustand'

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

// Local mock until the backend has auth endpoints: any non-empty credentials log in.
// Not persisted on purpose, so a reload returns to the login screen.
export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  login: ({ email, password }) => {
    if (!email || !password) {
      return
    }

    set({
      user: { id: crypto.randomUUID(), name: email.split('@')[0], email, role: 'Student' },
      isAuthenticated: true,
    })
  },
  register: ({ name, email, password, role }) => {
    if (!name || !email || !password) {
      return
    }

    set({
      user: { id: crypto.randomUUID(), name, email, role },
      isAuthenticated: true,
    })
  },
  logout: () => {
    set({ user: null, isAuthenticated: false })
  },
}))
