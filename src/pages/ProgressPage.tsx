import {
  Headphones, BookOpen, PenTool, MessageCircle,
  TrendingUp, Target, Award
} from 'lucide-react'

const skillData = [
  {
    label: 'Listening',
    icon: Headphones,
    score: 7.0,
    progress: 65,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    label: 'Reading',
    icon: BookOpen,
    score: 6.5,
    progress: 55,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    label: 'Writing',
    icon: PenTool,
    score: 6.0,
    progress: 40,
    color: 'violet',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    label: 'Speaking',
    icon: MessageCircle,
    score: 6.5,
    progress: 50,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
  },
]

const colorClasses: Record<string, { bg: string; text: string; bar: string }> = {
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', bar: 'bg-gradient-to-r from-cyan-500 to-blue-500' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', bar: 'bg-gradient-to-r from-emerald-500 to-teal-500' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', bar: 'bg-gradient-to-r from-violet-500 to-purple-500' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', bar: 'bg-gradient-to-r from-amber-500 to-orange-500' },
}

const overallBand = (
  skillData.reduce((sum, s) => sum + s.score, 0) / skillData.length
).toFixed(1)

export const ProgressPage = () => {
  return (
    <div className="min-h-screen">
      {/* ─── Hero ─────────────────────────── */}
      <section className="hero-gradient relative pt-32 pb-20 sm:pt-36 sm:pb-24 px-4">
        <div className="orb orb-emerald w-[350px] h-[350px] -top-28 -right-28 animate-float opacity-35" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-heading">Your Progress</h1>
              <p className="text-muted text-sm mt-0.5">Track your improvement over time</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-14 sm:py-20 space-y-12">
        {/* ─── Overall Score ───────────────── */}
        <div className="glass p-8 sm:p-10 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center mb-5 shadow-glow-cyan">
            <span className="text-3xl font-display font-bold text-white">{overallBand}</span>
          </div>
          <h2 className="text-lg font-display font-semibold text-heading">Overall Band Score</h2>
          <p className="text-sm text-muted mt-1">Based on your practice performance</p>

          <div className="grid grid-cols-3 gap-8 mt-8">
            <div>
              <Target className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
              <div className="text-xl font-bold text-heading">24</div>
              <div className="text-xs text-muted">Completed</div>
            </div>
            <div>
              <Award className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
              <div className="text-xl font-bold text-heading">78%</div>
              <div className="text-xs text-muted">Accuracy</div>
            </div>
            <div>
              <TrendingUp className="h-5 w-5 text-violet-400 mx-auto mb-1" />
              <div className="text-xl font-bold text-heading">+0.5</div>
              <div className="text-xs text-muted">Improvement</div>
            </div>
          </div>
        </div>

        {/* ─── Skill Breakdown ─────────────── */}
        <div>
          <h2 className="text-xl font-display font-semibold text-heading mb-6">Skill Breakdown</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillData.map((skill, i) => {
              const c = colorClasses[skill.color]
              return (
                <div
                  key={i}
                  className="glass-hover p-6 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${i * 100 + 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                        <skill.icon className={`h-5 w-5 ${c.text}`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-heading">{skill.label}</h3>
                        <p className="text-xs text-muted">{skill.progress}% complete</p>
                      </div>
                    </div>
                    <div className={`text-2xl font-display font-bold ${c.text}`}>
                      {skill.score}
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="progress-bar">
                    <div
                      className={`progress-bar-fill ${c.bar}`}
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ─── Tips ────────────────────────── */}
        <div className="glass p-6 sm:p-8">
          <h2 className="text-lg font-display font-semibold text-heading mb-4">Recommendations</h2>
          <ul className="space-y-3 text-sm text-body leading-relaxed">
            <li className="flex items-start space-x-3">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />
              <span><span className="text-heading font-medium">Writing</span> needs the most attention — focus on Task 2 essay structure and cohesion.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <span><span className="text-heading font-medium">Listening</span> is your strongest skill — keep practicing to maintain it.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
              <span>Try to complete at least <span className="text-heading font-medium">3 exercises per day</span> for consistent improvement.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}


