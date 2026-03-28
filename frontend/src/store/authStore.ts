import { create } from 'zustand'
import { authService } from '@/services/auth.service'
import type { User } from '@/types'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  fetchUser: () => Promise<void>
}

// Mock fallback user
const MOCK_USER: User = {
  id: 'guest_001',
  name: 'IELTS Student',
  email: 'student@ieltsweb.com',
  targetScore: 7.5,
  createdAt: new Date(),
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  fetchUser: async () => {
    try {
      set({ isLoading: true })
      const res = await authService.getMe()
      
      // If BE returns success
      if (res && res.success && res.data) {
        set({
          user: {
            id: String(res.data.id),
            name: res.data.fullName || 'Student',
            email: res.data.email,
            createdAt: new Date(res.data.createdAt),
          },
          isAuthenticated: true,
          isLoading: false
        })
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.warn("Failed to fetch user from API. Falling back to Mock Guest User.")
      // Fallback to MOCK_USER
      set({
        user: MOCK_USER,
        isAuthenticated: true, // Let them use the app
        isLoading: false
      })
    }
  }
}))
