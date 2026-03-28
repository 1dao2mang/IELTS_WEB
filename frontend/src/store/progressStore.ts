import { create } from 'zustand'
import { progressService } from '@/services/progress.service'
import type { SkillType } from '@/types'

/** Progress tracking for an exercise (different from Exercise in types/) */
interface ExerciseProgress {
  id: string
  type: SkillType
  title: string
  completed: boolean
  score?: number
  completedAt?: string
}

interface ProgressStore {
  exercises: ExerciseProgress[]
  addExercise: (exercise: ExerciseProgress) => void
  completeExercise: (id: string, score: number) => void
  getProgressByType: (type: SkillType) => {
    total: number
    completed: number
    averageScore: number
  }
  syncWithBackend: () => Promise<void>
}

const STORAGE_KEY = 'ielts_progress'

function loadProgress(): ExerciseProgress[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveProgress(exercises: ExerciseProgress[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises))
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  exercises: loadProgress(),

  syncWithBackend: async () => {
    try {
      const res = await progressService.getAttempts()
      if (res && res.data && Array.isArray(res.data)) {
        const { exercises } = get()
        const backendExercises: ExerciseProgress[] = res.data.map((attempt: any) => ({
          id: String(attempt.testId || attempt.id),
          type: (attempt.skill || 'listening') as SkillType,
          title: attempt.testTitle || `Exercise ${attempt.id}`,
          completed: true,
          score: attempt.score || 0,
          completedAt: attempt.completedAt || new Date().toISOString()
        }))

        // Merge backend exercises with local, prioritizing backend data
        const merged = [...exercises]
        backendExercises.forEach(be => {
          const index = merged.findIndex(le => le.id === be.id)
          if (index !== -1) {
            merged[index] = { ...merged[index], ...be }
          } else {
            merged.push(be)
          }
        })

        saveProgress(merged)
        set({ exercises: merged })
      }
    } catch(err) {
      console.warn('[API Fallback] Could not sync progress from backend, relying on local storage.', err);
    }
  },

  addExercise: exercise => {
    const { exercises } = get()
    const existing = exercises.find(ex => ex.id === exercise.id)
    // Upsert — update if already present, else append
    const updated = existing
      ? exercises.map(ex => (ex.id === exercise.id ? { ...ex, ...exercise } : ex))
      : [...exercises, exercise]
    saveProgress(updated)
    set({ exercises: updated })
  },

  completeExercise: (id, score) => {
    const { exercises } = get()
    // Only update if exercise exists and not already completed
    if (!exercises.some(ex => ex.id === id)) return
    const updated = exercises.map(ex =>
      ex.id === id ? { ...ex, completed: true, score, completedAt: new Date().toISOString() } : ex
    )
    saveProgress(updated)
    set({ exercises: updated })
  },

  getProgressByType: type => {
    const { exercises } = get()
    const filtered = exercises.filter(ex => ex.type === type)
    const completed = filtered.filter(ex => ex.completed)
    const averageScore =
      completed.length > 0
        ? completed.reduce((sum, ex) => sum + (ex.score || 0), 0) / completed.length
        : 0

    return {
      total: filtered.length,
      completed: completed.length,
      averageScore,
    }
  },
}))
