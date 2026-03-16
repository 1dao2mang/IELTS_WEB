import { apiService } from './api'
import type { Exercise, Question } from '@/types'

export interface ExerciseResult {
  exerciseId: string
  score: number
  answers: unknown[]
  completedAt: Date
}

class ExerciseService {
  async getExercises(type?: Exercise['type']): Promise<Exercise[]> {
    const endpoint = type ? `/exercises?type=${type}` : '/exercises'
    return apiService.get<Exercise[]>(endpoint)
  }

  async getExerciseById(id: string): Promise<Exercise> {
    return apiService.get<Exercise>(`/exercises/${id}`)
  }

  async submitExercise(result: ExerciseResult): Promise<{ success: boolean; score: number }> {
    return apiService.post<{ success: boolean; score: number }>('/exercises/submit', result)
  }

  async getUserResults(userId: string): Promise<ExerciseResult[]> {
    return apiService.get<ExerciseResult[]>(`/users/${userId}/results`)
  }

  /** Placeholder mock data – real exercises live in `src/data/mockData.ts` */
  getMockExercises(type?: Exercise['type']): Exercise[] {
    const q = (id: number, question: string, correct: string, opts?: string[]): Question => ({
      id,
      type: opts ? 'multiple-choice' : 'fill-blank',
      question,
      options: opts,
      correctAnswer: correct,
    })

    const allExercises: Exercise[] = [
      {
        id: 'legacy-1',
        type: 'listening',
        title: 'Academic Lecture - Climate Change',
        description: 'Listen to a university lecture about climate change impacts',
        difficulty: 'Intermediate',
        duration: 5,
        questions: [q(1, 'Which gas is most mentioned?', 'CO₂', ['CH₄', 'CO₂', 'N₂O', 'O₃'])],
      },
      {
        id: 'legacy-2',
        type: 'reading',
        title: 'The History of Artificial Intelligence',
        description: 'Read about the development of AI through the decades',
        difficulty: 'Advanced',
        duration: 20,
        questions: [q(1, 'When did the term AI originate?', '1956', ['1943', '1956', '1960', '1970'])],
      },
      {
        id: 'legacy-3',
        type: 'writing',
        title: 'Opinion Essay - Technology in Education',
        description: 'Write about the impact of technology on modern education',
        difficulty: 'Intermediate',
        duration: 40,
        questions: [],
        prompt: 'Some people believe technology has made learning easier. To what extent do you agree or disagree?',
      },
      {
        id: 'legacy-4',
        type: 'speaking',
        title: 'Part 2 - Describe a Memorable Journey',
        description: 'Speak about a journey that was meaningful to you',
        difficulty: 'Beginner',
        duration: 3,
        questions: [],
        cueCard: 'Describe a memorable journey you have made. You should say: where you went, when you went there, who you went with, and explain why it was memorable.',
      },
    ]

    return type ? allExercises.filter(ex => ex.type === type) : allExercises
  }
}

export const exerciseService = new ExerciseService()
