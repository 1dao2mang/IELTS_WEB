export interface User {
  id: string
  name: string
  email: string
  targetScore?: number
  createdAt: Date
}

export interface Question {
  id: number | string
  type: 'multiple-choice' | 'fill-blank' | 'true-false' | 'heading-match' | 'true-false-notgiven'
  question: string
  options?: string[]
  correctAnswer: string | number | boolean
}

export interface Exercise {
  id: string
  type: SkillType
  title: string
  description: string
  difficulty: DifficultyLevel
  duration?: number
  /** Text passage for reading, transcript for listening */
  passage?: string
  /** Writing prompt text */
  prompt?: string
  /** Model answer for writing exercises */
  modelAnswer?: string
  /** Speaking cue card text */
  cueCard?: string
  /** Follow-up questions for speaking */
  followUpQuestions?: string[]
  /** Sample answers for speaking */
  sampleAnswers?: string[]
  /** Evaluation criteria for writing */
  criteria?: string[]
  /** Questions for this exercise (listening/reading) */
  questions: Question[]
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
