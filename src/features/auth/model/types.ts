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

export type PasswordResetInput = { email: string }
