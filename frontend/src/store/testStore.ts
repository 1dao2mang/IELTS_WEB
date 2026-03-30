import { create } from 'zustand'
import { testService } from '@/services/test.service'
import { getExercisesByType } from '@/data/mockData'
import type { Exercise, SkillType } from '@/types'
import type { ITestDTO } from '@/types/dto'

interface TestStore {
  exercises: Record<SkillType, Exercise[]>
  isLoading: Record<SkillType, boolean>
  fetchTests: (type: SkillType) => Promise<void>
}

export const useTestStore = create<TestStore>((set, get) => ({
  exercises: {
    listening: [],
    reading: [],
    writing: [],
    speaking: []
  },
  isLoading: {
    listening: true,
    reading: true,
    writing: true,
    speaking: true
  },

  fetchTests: async (type: SkillType) => {
    // If we already loaded data, skip (optional, but good for performance)
    if (get().exercises[type].length > 0) return;

    set(state => ({
      isLoading: { ...state.isLoading, [type]: true }
    }))

    try {
      // In BE, the endpoint is /tests, we might pass { type } as a query param
      const res = await testService.getTests({ type })
      
      // If BE returns a valid array of tests
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        // Map backend model to FE model 
        const mappedData: Exercise[] = res.data.map((item: ITestDTO) => ({
          id: String(item.id),
          type: type,
          title: item.title || 'Untitled Exercise',
          description: item.description || 'No description provided.',
          difficulty: item.difficulty || 'Intermediate',
          duration: item.timeLimit || 20,
          passage: item.content || undefined,
          prompt: item.prompt || undefined,
          questions: item.questions || []
        }))

        set(state => ({
          exercises: { ...state.exercises, [type]: mappedData },
          isLoading: { ...state.isLoading, [type]: false }
        }))
      } else {
        throw new Error('No tests returned from backend')
      }
    } catch (err) {
      console.warn(`[API Fallback] Failed to fetch ${type} tests from backend. Loading mock data...`)
      
      const mockData = getExercisesByType(type)
      set(state => ({
        exercises: { ...state.exercises, [type]: mockData },
        isLoading: { ...state.isLoading, [type]: false }
      }))
    }
  }
}))
