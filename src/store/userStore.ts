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
  hydrate: () => void
}

const TOKEN_KEY = 'ielts_auth_token'
const USER_KEY = 'ielts_user_data'

export const useUserStore = create<UserStore>(set => ({
  user: null,
  isAuthenticated: false,
  setUser: user => set({ user, isAuthenticated: !!user }),
  login: user => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    set({ user, isAuthenticated: true })
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    set({ user: null, isAuthenticated: false })
  },
  hydrate: () => {
    const token = localStorage.getItem(TOKEN_KEY)
    const userData = localStorage.getItem(USER_KEY)
    if (token && userData) {
      try {
        const user = JSON.parse(userData) as User
        set({ user, isAuthenticated: true })
      } catch {
        localStorage.removeItem(USER_KEY)
        localStorage.removeItem(TOKEN_KEY)
        set({ user: null, isAuthenticated: false })
      }
    }
  },
}))
