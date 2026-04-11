import { useState, useEffect, useRef } from 'react'
import { X, Clock } from 'lucide-react'

import { useProgressStore } from '@/store/progressStore'
import { accent, fmtTime } from '../features/exercise/utils'

import { ReadingListeningView } from '../features/exercise/components/ReadingListeningView'
import { WritingView } from '../features/exercise/components/WritingView'
import { SpeakingView } from '../features/exercise/components/SpeakingView'

export const ExerciseView = ({ exercise, onClose }) => {
  const { addExercise, completeExercise } = useProgressStore()
  const c = accent[exercise.type]

  /* ── state ────────────────────────────────────────────────────────── */
  const [submitted, setSubmitted] = useState(false)
  const [timer, setTimer] = useState(exercise.duration ? exercise.duration * 60 : 0)
  const intervalRef = useRef(null)

  // Register exercise in progress store on first mount
  useEffect(() => {
    addExercise({ id: exercise.id, type: exercise.type, title: exercise.title, completed: false })
  }, [exercise.id, exercise.type, exercise.title, addExercise])

  /* ── body scroll lock while overlay is open ──────────────────────── */
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  /* ── Escape key to close ─────────────────────────────────────────── */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  /* ── countdown timer ─────────────────────────────────────────────── */
  useEffect(() => {
    if (timer <= 0) return
    intervalRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { if (intervalRef.current) clearInterval(intervalRef.current); return 0 }
        return t - 1
      })
    }, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (score) => {
    setSubmitted(true)
    completeExercise(exercise.id, score)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  /* ── body per type ───────────────────────────────────────────────── */
  const renderBody = () => {
    if (exercise.type === 'listening' || exercise.type === 'reading') {
      return <ReadingListeningView exercise={exercise} c={c} submitted={submitted} onSubmit={handleSubmit} />
    }
    if (exercise.type === 'writing') {
      return <WritingView exercise={exercise} c={c} timer={timer} submitted={submitted} onSubmit={handleSubmit} />
    }
    if (exercise.type === 'speaking') {
      return <SpeakingView exercise={exercise} c={c} timer={timer} submitted={submitted} onSubmit={handleSubmit} />
    }
    return null
  }

  /* ── full-screen overlay ─────────────────────────────────────────── */
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="w-full max-w-3xl">
        {/* Header bar */}
        <div className="glass flex items-center justify-between p-4 mb-4 sticky top-0 z-10">
          <div>
            <h2 className="text-white font-display font-bold text-lg leading-tight">{exercise.title}</h2>
            <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                exercise.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400'
                : exercise.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-400'
                : 'bg-rose-500/20 text-rose-400'
              }`}>{exercise.difficulty}</span>
              {exercise.duration && timer > 0 && !submitted && (
                <span className={`flex items-center ${timer < 60 ? 'text-rose-400' : ''}`}>
                  <Clock className="h-3.5 w-3.5 mr-1" />{fmtTime(timer)}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Dynamic Body Router */}
        {renderBody()}
      </div>
    </div>
  )
}
