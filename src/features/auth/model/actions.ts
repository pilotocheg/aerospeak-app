import { useAuthStore } from './auth-store'

export const useLogin = () => useAuthStore((state) => state.login)

export const useRegister = () => useAuthStore((state) => state.register)

export const useLogout = () => useAuthStore((state) => state.logout)
