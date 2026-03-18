import { create } from 'zustand'

type Theme = 'dark' | 'light'

interface ThemeStore {
  theme: Theme
  toggle: () => void
  set: (t: Theme) => void
}

const STORAGE_KEY = 'ielts_theme'

function loadTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* noop */
  }
  // Respect OS preference
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light'
  }
  return 'dark'
}

function applyTheme(t: Theme) {
  const root = document.documentElement
  root.setAttribute('data-theme', t)
  localStorage.setItem(STORAGE_KEY, t)
}

const initial = loadTheme()
applyTheme(initial)

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: initial,

  toggle: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    set({ theme: next })
  },

  set: (t: Theme) => {
    applyTheme(t)
    set({ theme: t })
  },
}))
