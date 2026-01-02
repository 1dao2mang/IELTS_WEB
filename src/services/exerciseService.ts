import { apiService } from './api'
import type { Exercise as BaseExercise } from '@/types'

/** Extended Exercise with content for API responses */
export interface Exercise extends BaseExercise {
  content: unknown // Can be audio URL, text, prompts, etc.
}

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

  // Mock data for demo
  getMockExercises(type?: Exercise['type']): Exercise[] {
    const allExercises: Exercise[] = [
      {
        id: '1',
        type: 'listening',
        title: 'Academic Lecture - Climate Change',
        description: 'Listen to a university lecture about climate change impacts',
        difficulty: 'Intermediate',
        duration: 5,
        questions: 10,
        content: { audioUrl: '/audio/climate-change.mp3' },
      },
      {
        id: '2',
        type: 'reading',
        title: 'The History of Artificial Intelligence',
        description: 'Read about the development of AI through the decades',
        difficulty: 'Advanced',
        duration: 20,
        questions: 13,
        content: { text: 'Sample reading passage...' },
      },
      {
        id: '3',
        type: 'writing',
        title: 'Opinion Essay - Technology in Education',
        description: 'Write about the impact of technology on modern education',
        difficulty: 'Intermediate',
        duration: 40,
        content: {
          prompt:
            'Some people believe technology has made learning easier. To what extent do you agree or disagree?',
        },
      },
      {
        id: '4',
        type: 'speaking',
        title: 'Part 2 - Describe a Memorable Journey',
        description: 'Speak about a journey that was meaningful to you',
        difficulty: 'Beginner',
        duration: 3,
        content: {
          cueCard: {
            topic: 'Describe a memorable journey you have made',
            points: [
              'Where you went',
              'When you went there',
              'Who you went with',
              'Why it was memorable',
            ],
          },
        },
      },
    ]

    return type ? allExercises.filter(ex => ex.type === type) : allExercises
  }
}

export const exerciseService = new ExerciseService()
