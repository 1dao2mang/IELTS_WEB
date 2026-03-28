import { useState, useCallback } from 'react'
import { CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react'
import type { Exercise, Question } from '@/types'

interface Props {
  exercise: Exercise
  c: { gradient: string; ring: string; text: string; bg: string }
  submitted: boolean
  onSubmit: (score: number) => void
}

export const ReadingListeningView = ({ exercise, c, submitted, onSubmit }: Props) => {
  const [answers, setAnswers] = useState<Record<string | number, string>>({})
  const [showPassage, setShowPassage] = useState(true)
  const [score, setScore] = useState(0)

  const setAnswer = useCallback((qId: string | number, value: string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }))
  }, [])

  const checkAnswers = () => {
    if (exercise.questions.length === 0) return
    let correct = 0
    exercise.questions.forEach(q => {
      const userAns = (answers[q.id] ?? '').trim().toLowerCase()
      const expected = String(q.correctAnswer).trim().toLowerCase()
      if (userAns === expected) correct++
    })
    const pct = Math.round((correct / exercise.questions.length) * 100)
    setScore(pct)
    onSubmit(pct)
  }

  const renderQuestion = (q: Question, idx: number) => {
    const isCorrect = submitted && (answers[q.id] ?? '').trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()
    const isWrong = submitted && !isCorrect

    return (
      <div key={q.id} className={`glass p-5 transition-all ${submitted ? (isCorrect ? 'ring-1 ring-emerald-500/50' : 'ring-1 ring-rose-500/50') : ''}`}>
        <p className="text-white font-medium mb-3">
          <span className={`inline-block w-7 h-7 text-center leading-7 rounded-lg mr-2 text-sm font-bold bg-gradient-to-br ${c.gradient} text-white`}>
            {idx + 1}
          </span>
          {q.question}
        </p>

        {q.type === 'multiple-choice' && q.options && (
          <div className="space-y-2 ml-9">
            {q.options.map(opt => {
              const selected = answers[q.id] === opt
              return (
                <button
                  key={opt}
                  disabled={submitted}
                  onClick={() => setAnswer(q.id, opt)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200
                    ${selected ? `bg-gradient-to-r ${c.gradient} text-white shadow-lg` : 'bg-white/5 text-gray-300 hover:bg-white/10'}
                    ${submitted && opt === String(q.correctAnswer) ? 'ring-2 ring-emerald-500 bg-emerald-500/20 text-emerald-300' : ''}
                    ${submitted && selected && opt !== String(q.correctAnswer) ? 'ring-2 ring-rose-500 bg-rose-500/20 text-rose-300' : ''}
                  `}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        )}

        {(q.type === 'fill-blank') && (
          <div className="ml-9">
            <input
              type="text"
              disabled={submitted}
              value={answers[q.id] ?? ''}
              onChange={e => setAnswer(q.id, e.target.value)}
              placeholder="Type your answer…"
              className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 ${c.ring} transition-all
                ${submitted && isCorrect ? 'ring-2 ring-emerald-500 border-emerald-500/50' : ''}
                ${submitted && isWrong ? 'ring-2 ring-rose-500 border-rose-500/50' : ''}
              `}
            />
            {submitted && isWrong && (
              <p className="text-emerald-400 text-xs mt-1.5">Correct answer: <strong>{String(q.correctAnswer)}</strong></p>
            )}
          </div>
        )}

        {(q.type === 'true-false' || q.type === 'true-false-notgiven') && (
          <div className="flex gap-2 ml-9">
            {(q.type === 'true-false' ? ['True', 'False'] : ['True', 'False', 'Not Given']).map(opt => {
              const selected = answers[q.id] === opt
              return (
                <button
                  key={opt}
                  disabled={submitted}
                  onClick={() => setAnswer(q.id, opt)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${selected ? `bg-gradient-to-r ${c.gradient} text-white` : 'bg-white/5 text-gray-300 hover:bg-white/10'}
                    ${submitted && opt === String(q.correctAnswer) ? 'ring-2 ring-emerald-500' : ''}
                    ${submitted && selected && opt !== String(q.correctAnswer) ? 'ring-2 ring-rose-500' : ''}
                  `}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        )}

        {submitted && (
          <div className="ml-9 mt-2 flex items-center text-xs">
            {isCorrect
              ? <><CheckCircle2 className="h-4 w-4 text-emerald-400 mr-1" /> <span className="text-emerald-400">Correct</span></>
              : <><XCircle className="h-4 w-4 text-rose-400 mr-1" /> <span className="text-rose-400">Incorrect</span></>}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Passage toggle */}
      {exercise.passage && (
        <div>
          <button onClick={() => setShowPassage(p => !p)} className={`flex items-center gap-2 text-sm font-medium ${c.text} mb-3`}>
            {showPassage ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showPassage ? 'Hide' : 'Show'} {exercise.type === 'listening' ? 'Transcript' : 'Passage'}
          </button>
          {showPassage && (
            <div className="glass p-5 max-h-72 overflow-y-auto text-sm text-gray-300 leading-relaxed whitespace-pre-line scrollbar-thin">
              {exercise.passage}
            </div>
          )}
        </div>
      )}
      {/* Questions */}
      <div className="space-y-4">{exercise.questions.map((q, i) => renderQuestion(q, i))}</div>
      
      {/* Submit / Score */}
      {!submitted ? (
        <button
          onClick={checkAnswers}
          disabled={Object.keys(answers).length === 0}
          className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${c.gradient} hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          Submit Answers
        </button>
      ) : (
        <div className="glass p-6 text-center">
          <p className="text-3xl font-display font-bold text-white mb-1">{score}%</p>
          <p className="text-gray-400 text-sm">
            {score >= 80 ? 'Excellent work! 🎉' : score >= 60 ? 'Good effort — keep practising!' : 'Review the passage and try again.'}
          </p>
        </div>
      )}
    </div>
  )
}
