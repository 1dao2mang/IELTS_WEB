import { create } from 'zustand'
import type { SkillType } from '@/types'

/** Progress tracking for an exercise (different from Exercise in types/) */
interface ExerciseProgress {
  id: string
  type: SkillType
  title: string
  completed: boolean
  score?: number
  completedAt?: Date
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

export const useProgressStore = create<ProgressStore>((set, get) => ({
  exercises: [],
  
  addExercise: exercise =>
    set(state => ({
      exercises: [...state.exercises, exercise],
    })),
  
  completeExercise: (id, score) =>
    set(state => ({
      exercises: state.exercises.map(ex =>
        ex.id === id
          ? { ...ex, completed: true, score, completedAt: new Date() }
          : ex
      ),
    })),
  
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
