import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  targetScore: number
}

interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const useUserStore = create<UserStore>(set => ({
  user: null,
  isAuthenticated: false,
  setUser: user => set({ user, isAuthenticated: !!user }),
  login: user => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))
