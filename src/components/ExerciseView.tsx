import { useState, useEffect, useCallback, useRef } from 'react'
import { X, Clock, CheckCircle2, XCircle, ChevronRight, Eye, EyeOff, Send, Mic } from 'lucide-react'
import type { Exercise, Question, SkillType } from '@/types'
import { useProgressStore } from '@/store/progressStore'

/* ── colour accents per skill ──────────────────────────────────────── */
const accent: Record<SkillType, { gradient: string; ring: string; text: string; bg: string }> = {
  listening: { gradient: 'from-blue-500 to-cyan-400', ring: 'ring-cyan-500/40', text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  reading:   { gradient: 'from-emerald-500 to-teal-400', ring: 'ring-emerald-500/40', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  writing:   { gradient: 'from-violet-500 to-purple-400', ring: 'ring-violet-500/40', text: 'text-violet-400', bg: 'bg-violet-500/10' },
  speaking:  { gradient: 'from-amber-500 to-orange-400', ring: 'ring-amber-500/40', text: 'text-amber-400', bg: 'bg-amber-500/10' },
}

interface Props {
  exercise: Exercise
  onClose: () => void
}

export const ExerciseView = ({ exercise, onClose }: Props) => {
  const { addExercise, completeExercise } = useProgressStore()
  const c = accent[exercise.type]

  /* ── state ────────────────────────────────────────────────────────── */
  const [answers, setAnswers] = useState<Record<string | number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(exercise.duration ? exercise.duration * 60 : 0)
  const [showPassage, setShowPassage] = useState(true)
  const [essay, setEssay] = useState('')
  const [showModelAnswer, setShowModelAnswer] = useState(false)
  const [currentFollowUp, setCurrentFollowUp] = useState(0)
  const [showSampleAnswer, setShowSampleAnswer] = useState(false)
  const [speakingDone, setSpeakingDone] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Register exercise in progress store on first mount
  useEffect(() => {
    addExercise({ id: exercise.id, type: exercise.type, title: exercise.title, completed: false })
  }, [exercise.id, exercise.type, exercise.title, addExercise])

  /* ── countdown timer ─────────────────────────────────────────────── */
  useEffect(() => {
    if (timer <= 0) return
    intervalRef.current = setInterval(() => setTimer(t => (t > 0 ? t - 1 : 0)), 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [timer > 0]) // eslint-disable-line react-hooks/exhaustive-deps

  const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  /* ── answer helpers ──────────────────────────────────────────────── */
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
    setSubmitted(true)
    completeExercise(exercise.id, pct)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const handleWritingSubmit = () => {
    // Writing isn't auto-scored — give full marks for completing
    setSubmitted(true)
    completeExercise(exercise.id, 100)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const handleSpeakingDone = () => {
    setSpeakingDone(true)
    setSubmitted(true)
    completeExercise(exercise.id, 100)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  /* ── question renderer ───────────────────────────────────────────── */
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

  /* ── body per type ───────────────────────────────────────────────── */
  const renderBody = () => {
    // Listening / Reading — passage + quiz
    if (exercise.type === 'listening' || exercise.type === 'reading') {
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
          {/* Submit */}
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

    // Writing — prompt + textarea + model answer
    if (exercise.type === 'writing') {
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

    // Speaking — cue card + timer + follow-ups
    if (exercise.type === 'speaking') {
      return (
        <div className="space-y-6">
          {exercise.cueCard && (
            <div className="glass p-6 border-l-4 border-amber-500">
              <h3 className={`text-sm font-semibold ${c.text} mb-3 uppercase tracking-wider flex items-center gap-2`}>
                <Mic className="h-4 w-4" /> Cue Card
              </h3>
              <p className="text-gray-300 whitespace-pre-line leading-relaxed text-sm">{exercise.cueCard}</p>
            </div>
          )}

          {/* Timer display */}
          {exercise.duration && !speakingDone && (
            <div className="text-center">
              <p className={`text-5xl font-mono font-bold ${timer < 30 ? 'text-rose-400 animate-pulse' : 'text-white'}`}>
                {fmtTime(timer)}
              </p>
              <p className="text-gray-500 text-sm mt-1">Speak until the timer runs out</p>
            </div>
          )}

          {!speakingDone ? (
            <button
              onClick={handleSpeakingDone}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${c.gradient} hover:shadow-lg transition-all`}
            >
              <CheckCircle2 className="h-5 w-5" /> I'm Done Speaking
            </button>
          ) : (
            <div className="space-y-6">
              <div className="glass p-5 text-center">
                <CheckCircle2 className={`h-8 w-8 ${c.text} mx-auto mb-2`} />
                <p className="text-white font-display font-bold">Well done!</p>
              </div>

              {/* Follow-up questions */}
              {exercise.followUpQuestions && exercise.followUpQuestions.length > 0 && (
                <div className="space-y-3">
                  <h3 className={`text-sm font-semibold ${c.text} uppercase tracking-wider`}>Follow-up Questions</h3>
                  {exercise.followUpQuestions.map((fq, i) => (
                    <div key={i} className="glass p-4">
                      <p className="text-gray-300 text-sm">{i + 1}. {fq}</p>
                      {currentFollowUp > i && exercise.sampleAnswers?.[i] && (
                        <p className="text-gray-500 text-xs mt-2 italic">Sample: {exercise.sampleAnswers[i]}</p>
                      )}
                    </div>
                  ))}
                  {currentFollowUp < exercise.followUpQuestions.length && (
                    <button
                      onClick={() => {
                        setCurrentFollowUp(f => f + 1)
                        setShowSampleAnswer(false)
                      }}
                      className={`text-sm ${c.text} hover:underline`}
                    >
                      Show sample answer for Q{currentFollowUp + 1}
                    </button>
                  )}
                </div>
              )}

              {exercise.sampleAnswers && exercise.sampleAnswers.length > 0 && !exercise.followUpQuestions?.length && (
                <div>
                  <button onClick={() => setShowSampleAnswer(v => !v)} className={`flex items-center gap-2 text-sm font-medium ${c.text}`}>
                    {showSampleAnswer ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showSampleAnswer ? 'Hide' : 'Show'} Sample Answer
                  </button>
                  {showSampleAnswer && (
                    <div className="glass p-5 mt-3 text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                      {exercise.sampleAnswers.join('\n\n')}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )
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

        {/* Body */}
        {renderBody()}
      </div>
    </div>
  )
}
