import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Headphones, BookOpen, PenTool, MessageCircle, ArrowRight, Target, Clock, ChevronRight } from 'lucide-react'
import { useTestStore } from '@/store'

const colorClasses = {
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', glow: 'shadow-glow-cyan' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', glow: 'shadow-glow-emerald' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', glow: 'shadow-glow-violet' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', glow: 'shadow-glow-amber' },
}
import { ExerciseView } from '../components/ExerciseView'

export const PracticePage = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [filter, setFilter] = useState<string | null>(null)
  const { exercises, isLoading, fetchTests } = useTestStore()

  React.useEffect(() => {
    fetchTests('listening')
    fetchTests('reading')
    fetchTests('writing')
    fetchTests('speaking')
  }, [fetchTests])

  const categories = React.useMemo(() => [
    {
      id: 'listening',
      label: 'Listening',
      icon,
      color: 'cyan',
      gradient: 'from-cyan-500 to-blue-600',
      exercises: exercises.listening,
      isLoading: isLoading.listening
    },
    {
      id: 'reading',
      label: 'Reading',
      icon,
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-600',
      exercises: exercises.reading,
      isLoading: isLoading.reading
    },
    {
      id: 'writing',
      label: 'Writing',
      icon,
      color: 'violet',
      gradient: 'from-violet-500 to-purple-600',
      exercises: exercises.writing,
      isLoading: isLoading.writing
    },
    {
      id: 'speaking',
      label: 'Speaking',
      icon,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-600',
      exercises: exercises.speaking,
      isLoading: isLoading.speaking
    },
  ], [exercises, isLoading])

  const filteredCategories = filter
    ? categories.filter(c => c.id === filter)
    : categories

  return (
    <div className="min-h-screen">
      {/* ─── Hero ─────────────────────────── */}
      <section className="hero-gradient relative pt-32 pb-20 sm:pt-36 sm:pb-24 px-4">
        <div className="orb orb-cyan w-[350px] h-[350px] -top-28 -left-28 animate-float opacity-35" />
        <div className="orb orb-violet w-[300px] h-[300px] -top-10 -right-24 animate-float-delayed opacity-30" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
              <Target className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-heading">Practice Hub</h1>
              <p className="text-muted text-sm mt-0.5">All exercises in one place</p>
            </div>
          </div>
          <p className="text-body max-w-2xl leading-relaxed">
            Browse and practice exercises across all four IELTS skills. Filter by skill type and track your progress as you complete each one.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-14 sm:py-20">
        {/* ─── Filters ────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 text-xs font-medium rounded-lg border transition-all duration-200 ${
              !filter
                ? 'bg-theme-card border-theme-border text-heading'
                : 'border-theme-border text-muted hover:text-heading hover:bg-theme-card-hover'
            }`}
          >
            All Skills
          </button>
          {categories.map(cat => {
            const c = colorClasses[cat.color]
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg border transition-all duration-200 flex items-center space-x-1.5 ${
                  filter === cat.id
                    ? `${c.bg} border-transparent ${c.text}`
                    : 'border-theme-border text-muted hover:text-heading hover:bg-theme-card-hover'
                }`}
              >
                <cat.icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* ─── Category Sections ──────────── */}
        <div className="space-y-16">
          {filteredCategories.map(cat => {
            const c = colorClasses[cat.color]
            return (
              <section key={cat.id}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center`}>
                      <cat.icon className={`h-4 w-4 ${c.text}`} />
                    </div>
                    <h2 className="text-lg font-display font-semibold text-heading">{cat.label}</h2>
                    <span className="text-xs text-muted">({cat.exercises.length})</span>
                  </div>
                  <Link
                    to={`/${cat.id}`}
                    className={`text-xs font-medium ${c.text} hover:underline flex items-center space-x-1`}
                  >
                    <span>View all</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="space-y-2.5">
                  {cat.isLoading ? (
                    <div className={`text-sm py-4 ${c.text} animate-pulse`}>Loading {cat.label} exercises...</div>
                  ) : cat.exercises.map(ex => (
                    <button
                      key={ex.id}
                      onClick={() => setSelectedExercise(ex)}
                      className="w-full group gradient-border-card glass-hover flex items-center justify-between p-4 sm:p-5 text-left"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                          <cat.icon className={`h-4 w-4 ${c.text}`} />
                        </div>
                        <div className="min-w-0">
                          <h3 className={`text-sm font-medium text-heading truncate group-hover:${c.text} transition-colors`}>
                            {ex.title}
                          </h3>
                          <div className="flex items-center space-x-3 mt-0.5">
                            <span className="text-xs text-muted flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{ex.duration}m</span>
                            </span>
                            <span className="text-xs text-muted">{ex.difficulty}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted group-hover:text-heading group-hover:translate-x-0.5 transition-all shrink-0 ml-3" />
                    </button>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>

      {selectedExercise && (
        <ExerciseView
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  )
}

