import { useState } from 'react'
import { Headphones, Clock, ChevronRight, Volume2, Lightbulb } from 'lucide-react'
import { listeningExercises } from '../data/mockData'
import { ExerciseView } from '../components/ExerciseView'
import type { Exercise } from '../types'

const tips = [
  { icon: Volume2, text: 'Listen for keywords first, then focus on context.' },
  { icon: Clock, text: 'Use the 30-second preview to scan questions.' },
  { icon: Lightbulb, text: 'Practice with British, American & Australian accents.' },
]

export const ListeningPage = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  return (
    <div className="min-h-screen">
      {/* ─── Hero ─────────────────────────── */}
      <section className="hero-gradient hero-listening relative pt-32 pb-20 sm:pt-36 sm:pb-24 px-4">
        <div className="orb orb-cyan w-[400px] h-[400px] -top-32 -left-32 animate-float opacity-40" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-glow-cyan">
              <Headphones className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-heading">Listening</h1>
              <p className="text-body text-sm mt-0.5">{listeningExercises.length} exercises available</p>
            </div>
          </div>
          <p className="text-body max-w-2xl leading-relaxed">
            Develop your listening comprehension with authentic IELTS-style audio exercises. Each exercise targets specific question types you'll encounter on exam day.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-14 sm:py-20 space-y-14">
        {/* ─── Tips ────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="glass-hover flex items-start space-x-3 p-5 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${i * 100 + 100}ms` }}
            >
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <tip.icon className="h-4 w-4 text-cyan-400" />
              </div>
              <p className="text-sm text-body leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>

        {/* ─── Exercise List ───────────────── */}
        <div>
          <h2 className="text-xl font-display font-semibold text-heading mb-6">Available Exercises</h2>
          <div className="space-y-3">
            {listeningExercises.map((ex, i) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExercise(ex)}
                className="w-full group gradient-border-card glass-hover flex items-center justify-between p-5 text-left opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${i * 80 + 200}ms` }}
              >
                <div className="flex items-center space-x-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <Headphones className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-heading truncate group-hover:text-cyan-400 transition-colors">
                      {ex.title}
                    </h3>
                    <p className="text-xs text-sub mt-0.5 truncate">{ex.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 shrink-0 ml-4">
                  <span className="hidden sm:inline text-xs text-faint px-2.5 py-1 rounded-lg bg-surface-subtle border border-subtle">
                    {ex.difficulty}
                  </span>
                  <ChevronRight className="h-4 w-4 text-faint group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exercise overlay */}
      {selectedExercise && (
        <ExerciseView
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  )
}


