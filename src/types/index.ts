export interface User {
  id: string
  name: string
  email: string
  targetScore?: number
  createdAt: Date
}

export interface Exercise {
  id: string
  type: 'listening' | 'reading' | 'writing' | 'speaking'
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration?: number
  questions?: number
}

export interface Question {
  id: number | string
  type: 'multiple-choice' | 'fill-blank' | 'true-false' | 'heading-match' | 'true-false-notgiven'
  question: string
  options?: string[]
  correctAnswer: string | number | boolean
}

export interface ExerciseResult {
  exerciseId: string
  userId: string
  score: number
  answers: unknown[]
  completedAt: Date
}

export interface ProgressStats {
  total: number
  completed: number
  averageScore: number
}

export type SkillType = 'listening' | 'reading' | 'writing' | 'speaking'
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced'
