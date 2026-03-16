import { Link } from 'react-router-dom'
import { Headphones, BookOpenText, PenTool, Mic, Clock, Target, ArrowRight, Trophy, CheckCircle2 } from 'lucide-react'
import { listeningExercises, readingExercises, writingExercises, speakingExercises } from '@/data/mockData'
import { useProgressStore } from '@/store/progressStore'

const modules = [
  {
    title: 'Listening',
    icon: Headphones,
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'shadow-glow-cyan',
    path: '/listening',
    count: listeningExercises.length,
    time: '30-40 min each',
  },
  {
    title: 'Reading',
    icon: BookOpenText,
    gradient: 'from-emerald-500 to-teal-400',
    glow: 'shadow-glow-emerald',
    path: '/reading',
    count: readingExercises.length,
    time: '60 min each',
  },
  {
    title: 'Writing',
    icon: PenTool,
    gradient: 'from-violet-500 to-purple-400',
    glow: 'shadow-glow-violet',
    path: '/writing',
    count: writingExercises.length,
    time: '60 min each',
  },
  {
    title: 'Speaking',
    icon: Mic,
    gradient: 'from-amber-500 to-orange-400',
    glow: 'shadow-glow-amber',
    path: '/speaking',
    count: speakingExercises.length,
    time: '11-14 min each',
  },
]

export const PracticePage = () => {
  const { exercises: completed } = useProgressStore()
  const completedCount = completed.filter(e => e.completed).length
  const totalExercises = listeningExercises.length + readingExercises.length + writingExercises.length + speakingExercises.length

  return (
    <div>
      {/* Header */}
      <section className="relative hero-gradient py-20 sm:py-24 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-glow-cyan mb-6">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight animate-fade-in-up">
            <span className="gradient-text">Practice</span> Hub
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300 animate-fade-in-up stagger-1">
            Choose a skill and start your exam-format practice sessions.
          </p>
        </div>
      </section>

      {/* Progress summary */}
      {completedCount > 0 && (
        <section className="py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass p-6 flex flex-col sm:flex-row items-center gap-6">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-white font-display font-semibold text-lg">
                  {completedCount} of {totalExercises} exercises completed
                </p>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
                    style={{ width: `${Math.round((completedCount / totalExercises) * 100)}%` }}
                  />
                </div>
              </div>
              <p className="text-2xl font-display font-bold text-white">
                {Math.round((completedCount / totalExercises) * 100)}%
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Modules */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {modules.map((mod, i) => {
              const Icon = mod.icon
              return (
                <Link
                  key={mod.title}
                  to={mod.path}
                  className={`group glass-hover p-8 opacity-0 animate-fade-in-up stagger-${i + 1}`}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mod.gradient} flex items-center justify-center mb-5 ${mod.glow} transition-all duration-300 group-hover:scale-110`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">{mod.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center"><Target className="h-4 w-4 mr-1" />{mod.count} exercises</span>
                    <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />{mod.time}</span>
                  </div>
                  <span className="inline-flex items-center text-sm text-cyan-400 group-hover:translate-x-1 transition-transform">
                    Go to practice <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Full Mock CTA */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass p-10 border-cyan-500/20">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
              Take a Full Mock Test
            </h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Simulate the real IELTS experience with timed tests across all four skills.
            </p>
            <button className="btn-gradient px-8 py-3 text-base font-semibold rounded-xl animate-glow-pulse">
              Start Full Test
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
