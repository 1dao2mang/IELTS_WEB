import { useState } from 'react'
import { Mic, CheckCircle2, Eye, EyeOff } from 'lucide-react'

import { fmtTime } from '../utils'

export const SpeakingView = ({ exercise, c, timer, submitted, onSubmit }) => {
  const [currentFollowUp, setCurrentFollowUp] = useState(0)
  const [showSampleAnswer, setShowSampleAnswer] = useState(false)

  const handleSpeakingDone = () => {
    onSubmit(100)
  }

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
      {exercise.duration && !submitted && (
        <div className="text-center">
          <p className={`text-5xl font-mono font-bold ${timer < 30 ? 'text-rose-400 animate-pulse' : 'text-white'}`}>
            {fmtTime(timer)}
          </p>
          <p className="text-gray-500 text-sm mt-1">Speak until the timer runs out</p>
        </div>
      )}

      {!submitted ? (
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
                  onClick={() => setCurrentFollowUp(f => f + 1)}
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
