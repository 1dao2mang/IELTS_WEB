import { useState } from 'react'
import { Mic, Clock, ArrowRight, MessageCircle, User, Lightbulb } from 'lucide-react'
import { speakingExercises } from '@/data/mockData'
import { ExerciseView } from '@/components/ExerciseView'
import type { Exercise } from '@/types'

const tips = [
  { icon: MessageCircle, title: 'Fluency Matters', text: 'Speak naturally without long pauses — fillers are OK in moderation.' },
  { icon: User, title: 'Be Yourself', text: 'Share genuine opinions and real examples from your experience.' },
  { icon: Lightbulb, title: 'Extend Answers', text: 'Don\'t give one-word answers — explain, give reasons, and compare.' },
]

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-emerald-500/20 text-emerald-400',
  Intermediate: 'bg-amber-500/20 text-amber-400',
  Advanced: 'bg-rose-500/20 text-rose-400',
}

export const SpeakingPage = () => {
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null)

  return (
    <div>
      {/* Header */}
      <section className="relative hero-gradient py-20 sm:py-24 overflow-hidden">
        <div className="absolute bottom-10 right-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-float" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-400 shadow-glow-amber mb-6">
            <Mic className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight animate-fade-in-up">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">Speaking</span> Practice
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300 animate-fade-in-up stagger-1">
            Build confidence and fluency for all three parts of the speaking test.
          </p>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {tips.map((tip, i) => {
              const Icon = tip.icon
              return (
                <div key={tip.title} className={`glass p-6 opacity-0 animate-fade-in-up stagger-${i + 1}`}>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5 text-amber-400" />
                  </div>
                  <h3 className="text-white font-display font-semibold mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray-400">{tip.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Speaking Parts */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8">
            Speaking <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">Parts</span>
          </h2>
          <div className="space-y-4">
            {speakingExercises.map(ex => (
              <div
                key={ex.id}
                className="glass-hover p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{ex.title}</h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-400 mt-0.5">
                      <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1" />{ex.duration} min</span>
                      {ex.followUpQuestions && (
                        <span>{ex.followUpQuestions.length} follow-up Q's</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[ex.difficulty] ?? 'bg-blue-500/20 text-blue-400'}`}>
                    {ex.difficulty}
                  </span>
                  <button
                    onClick={() => setActiveExercise(ex)}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 text-sm rounded-lg font-medium hover:shadow-glow-amber hover:scale-[1.02] transition-all duration-300"
                  >
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exercise Overlay */}
      {activeExercise && (
        <ExerciseView exercise={activeExercise} onClose={() => setActiveExercise(null)} />
      )}
    </div>
  )
}
