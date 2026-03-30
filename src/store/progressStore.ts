import { create } from 'zustand'
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
