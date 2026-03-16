import { Link } from 'react-router-dom'
import { Headphones, BookOpenText, PenTool, Mic, ArrowRight, Star, Users, Award, CheckCircle } from 'lucide-react'

const skills = [
  {
    title: 'Listening',
    description: 'Sharpen your ear with real IELTS-style audio exercises and practice tests.',
    icon: Headphones,
    path: '/listening',
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'shadow-glow-cyan',
    delay: 'stagger-1',
  },
  {
    title: 'Reading',
    description: 'Boost comprehension speed and accuracy with Academic & General passages.',
    icon: BookOpenText,
    path: '/reading',
    gradient: 'from-emerald-500 to-teal-400',
    glow: 'shadow-glow-emerald',
    delay: 'stagger-2',
  },
  {
    title: 'Writing',
    description: 'Master Task 1 & Task 2 essays with structured guidance and model answers.',
    icon: PenTool,
    path: '/writing',
    gradient: 'from-violet-500 to-purple-400',
    glow: 'shadow-glow-violet',
    delay: 'stagger-3',
  },
  {
    title: 'Speaking',
    description: 'Build confidence for all three parts with prompts and sample responses.',
    icon: Mic,
    path: '/speaking',
    gradient: 'from-amber-500 to-orange-400',
    glow: 'shadow-glow-amber',
    delay: 'stagger-4',
  },
]

const features = [
  { icon: Star, title: 'Expert Content', text: 'Materials designed by IELTS examiners and language experts.' },
  { icon: Users, title: 'Community', text: 'Join thousands of learners preparing for their IELTS exam.' },
  { icon: Award, title: 'Band 7+ Focus', text: 'Targeted strategies to help you reach your desired band score.' },
  { icon: CheckCircle, title: 'Full Coverage', text: 'All four skills covered with real exam-format practice.' },
]

export const HomePage = () => {
  return (
    <div>
      {/* ─── Hero Section ─── */}
      <section className="relative hero-gradient py-24 sm:py-32 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-float-delayed" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-white/10 text-cyan-400 border border-cyan-400/20 mb-6 backdrop-blur-sm">
              🎓 Your Path to IELTS Success
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold tracking-tight text-balance">
              Master Your{' '}
              <span className="gradient-text">IELTS Skills</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed">
              Comprehensive practice materials for Listening, Reading, Writing, and Speaking — everything you need to achieve your target band score.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-2">
            <Link
              to="/practice"
              className="btn-gradient inline-flex items-center space-x-2 px-8 py-3.5 text-base font-semibold rounded-xl"
            >
              <span>Start Practicing</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center space-x-2 px-8 py-3.5 text-base font-semibold rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            >
              <span>Learn More</span>
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-xl mx-auto animate-fade-in-up stagger-3">
            {[
              { value: '10K+', label: 'Learners' },
              { value: '500+', label: 'Exercises' },
              { value: '8.0', label: 'Avg. Band' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-display font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Skills Grid ─── */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
              All Four Skills,{' '}
              <span className="gradient-text">One Platform</span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
              Focused practice modules for every section of the IELTS exam.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map(skill => {
              const Icon = skill.icon
              return (
                <Link
                  key={skill.title}
                  to={skill.path}
                  className={`group glass-hover p-6 opacity-0 animate-fade-in-up ${skill.delay}`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center mb-4 ${skill.glow} transition-shadow duration-300 group-hover:scale-110`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-white mb-2">{skill.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{skill.description}</p>
                  <span className="inline-flex items-center text-sm text-cyan-400 mt-4 group-hover:translate-x-1 transition-transform">
                    Practice <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="py-20 sm:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
              Why Choose{' '}
              <span className="gradient-text">IELTS Web</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon
              return (
                <div
                  key={feat.title}
                  className={`glass p-6 text-center opacity-0 animate-fade-in-up stagger-${i + 1}`}
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-white font-display font-semibold mb-2">{feat.title}</h3>
                  <p className="text-sm text-gray-400">{feat.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass p-10 sm:p-14 border-cyan-500/20">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Ready to Boost Your Score?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Start your IELTS preparation today with our expert-designed practice materials.
            </p>
            <Link
              to="/practice"
              className="btn-gradient inline-flex items-center space-x-2 px-8 py-3.5 text-base font-semibold rounded-xl animate-glow-pulse"
            >
              <span>Begin Practice Tests</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
