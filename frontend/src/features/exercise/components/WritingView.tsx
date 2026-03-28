import { useState } from 'react'
import { ChevronRight, Clock, Send, CheckCircle2, Eye, EyeOff } from 'lucide-react'
import type { Exercise } from '@/types'
import { fmtTime } from '../utils'

interface Props {
  exercise: Exercise
  c: { gradient: string; ring: string; text: string; bg: string }
  timer: number
  submitted: boolean
  onSubmit: (score: number) => void
}

export const WritingView = ({ exercise, c, timer, submitted, onSubmit }: Props) => {
  const [essay, setEssay] = useState('')
  const [showModelAnswer, setShowModelAnswer] = useState(false)

  const handleWritingSubmit = () => {
    // Writing isn't auto-scored — give 100% completion marks
    onSubmit(100)
  }

  return (
    <div className="space-y-6">
      {exercise.prompt && (
        <div className="glass p-5">
          <h3 className={`text-sm font-semibold ${c.text} mb-2 uppercase tracking-wider`}>Writing Prompt</h3>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">{exercise.prompt}</p>
        </div>
      )}
      {exercise.criteria && (
        <div className="glass p-4">
          <h3 className={`text-sm font-semibold ${c.text} mb-2 uppercase tracking-wider`}>Assessment Criteria</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            {exercise.criteria.map(cr => <li key={cr} className="flex items-start"><ChevronRight className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />{cr}</li>)}
          </ul>
        </div>
      )}
      <textarea
        value={essay}
        onChange={e => setEssay(e.target.value)}
        disabled={submitted}
        rows={12}
        placeholder="Start writing your response here…"
        className={`w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-gray-200 placeholder:text-gray-500 text-sm leading-relaxed focus:outline-none focus:ring-2 ${c.ring} resize-y transition-all`}
      />
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{essay.split(/\s+/).filter(Boolean).length} words</span>
        {exercise.duration && <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1" />{fmtTime(timer)}</span>}
      </div>
      {!submitted ? (
        <button
          onClick={handleWritingSubmit}
          disabled={essay.trim().length < 20}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${c.gradient} hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <Send className="h-4 w-4" /> Submit Essay
        </button>
      ) : (
        <div className="space-y-4">
          <div className="glass p-6 text-center">
            <CheckCircle2 className={`h-8 w-8 ${c.text} mx-auto mb-2`} />
            <p className="text-white font-display font-bold text-lg">Essay Submitted!</p>
            <p className="text-gray-400 text-sm mt-1">Compare your response with the model answer below.</p>
          </div>
          {exercise.modelAnswer && (
            <div>
              <button onClick={() => setShowModelAnswer(v => !v)} className={`flex items-center gap-2 text-sm font-medium ${c.text} mb-3`}>
                {showModelAnswer ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showModelAnswer ? 'Hide' : 'Show'} Model Answer
              </button>
              {showModelAnswer && (
                <div className="glass p-5 text-sm text-gray-300 leading-relaxed whitespace-pre-line max-h-80 overflow-y-auto">
                  {exercise.modelAnswer}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
