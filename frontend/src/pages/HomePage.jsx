import { Link } from 'react-router-dom'
import { Headphones, BookOpen, PenTool, MessageCircle, Star, Target, ArrowRight, Zap, Award, TrendingUp, Users, Clock } from 'lucide-react'

const skills = [
  {
    icon, label: 'Listening', path: '/listening',
    desc: 'Train your ears with authentic IELTS audio exercises.',
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'group-hover:shadow-glow-cyan',
  },
  {
    icon, label: 'Reading', path: '/reading',
    desc: 'Boost comprehension with real exam-style passages.',
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'group-hover:shadow-glow-emerald',
  },
  {
    icon, label: 'Writing', path: '/writing',
    desc: 'Perfect Task 1 & 2 with structured practice.',
    gradient: 'from-violet-500 to-purple-600',
    glow: 'group-hover:shadow-glow-violet',
  },
  {
    icon, label: 'Speaking', path: '/speaking',
    desc: 'Build fluency for all three speaking parts.',
    gradient: 'from-amber-500 to-orange-600',
    glow: 'group-hover:shadow-glow-amber',
  },
]

const stats = [
  { icon, value: '10K+', label: 'Active learners' },
  { icon, value: '500+', label: 'Practice exercises' },
  { icon, value: '7.5+', label: 'Avg band score' },
  { icon, value: '24/7', label: 'Always available' },
]

const features = [
  {
    icon,
    title: 'Instant Feedback',
    desc: 'Get real-time scores and detailed explanations after every exercise.',
  },
  {
    icon,
    title: 'Progress Tracking',
    desc: 'Visualize your improvement over time with detailed analytics.',
  },
  {
    icon,
    title: 'Exam-Realistic',
    desc: 'Practice with real IELTS format questions across all difficulty levels.',
  },
]

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* ─── Hero ────────────────────────────────── */}
      <section className="hero-gradient relative pt-32 pb-24 sm:pt-40 sm:pb-32 px-4">
        {/* Decorative orbs */}
        <div className="orb orb-cyan w-[500px] h-[500px] -top-40 -left-40 animate-float opacity-50" />
        <div className="orb orb-violet w-[400px] h-[400px] top-20 -right-32 animate-float-delayed opacity-40" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] mb-8 animate-fade-in">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-glow-pulse" />
            <span className="text-xs font-medium text-cyan-400 tracking-wide uppercase">Free IELTS Prep Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-heading leading-tight tracking-tight opacity-0 animate-fade-in-up">
            Achieve Your <span className="gradient-text">Dream</span> Band Score
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-body max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up stagger-2">
            Master all four IELTS skills with interactive exercises, real-time feedback, and personalized progress tracking.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up stagger-3">
            <Link
              to="/practice"
              className="btn-gradient px-8 py-3.5 text-sm w-full sm:w-auto inline-flex items-center justify-center space-x-2"
            >
              <span>Start Practicing</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="btn-outline px-8 py-3.5 text-sm w-full sm:w-auto justify-center"
            >
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats ───────────────────────────────── */}
      <section className="relative -mt-12 z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <stat.icon className="h-5 w-5 text-cyan-400 mx-auto mb-2 transition-transform duration-300 group-hover:scale-110" />
                <div className="text-2xl sm:text-3xl font-display font-bold text-heading text-glow-cyan">
                  {stat.value}
                </div>
                <div className="text-xs text-sub mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Skill Cards ─────────────────────────── */}
      <section className="py-24 sm:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-heading">
              Four Skills, <span className="gradient-text">One Platform</span>
            </h2>
            <p className="mt-4 text-sub max-w-lg mx-auto">
              Comprehensive practice modules designed to match the real IELTS exam format.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((skill, i) => (
              <Link
                key={skill.path}
                to={skill.path}
                className={`group gradient-border-card glass-hover p-6 flex flex-col opacity-0 animate-fade-in-up`}
                style={{ animationDelay: `${i * 100 + 200}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${skill.glow}`}>
                  <skill.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-heading mb-2">{skill.label}</h3>
                <p className="text-sm text-sub leading-relaxed flex-1">{skill.desc}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-body group-hover:text-cyan-400 transition-colors">
                  <span>Practice now</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ────────────────────────────── */}
      <section className="py-24 px-4 relative">
        <div className="orb orb-emerald w-[300px] h-[300px] bottom-10 -left-20 animate-float-slow opacity-30" />

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-heading">
              Why Choose <span className="gradient-text">IELTS Web</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="glass-hover p-7 text-center opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${i * 120 + 200}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center mx-auto mb-5 group">
                  <f.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-base font-semibold text-heading mb-2">{f.title}</h3>
                <p className="text-sm text-sub leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="gradient-border-card p-10 sm:p-14 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] to-violet-500/[0.04]" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-heading mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-body mb-8 max-w-md mx-auto">
                Join thousands of students who have improved their IELTS scores with our platform.
              </p>
              <Link
                to="/practice"
                className="btn-gradient px-8 py-3.5 text-sm inline-flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

