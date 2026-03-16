import { Target, Users, Award, BookOpen, Globe, Heart } from 'lucide-react'

const values = [
  { icon: Target, title: 'Focused Practice', text: 'Every exercise targets real IELTS question types and formats.' },
  { icon: Users, title: 'Expert-Designed', text: 'Materials created by experienced IELTS examiners and tutors.' },
  { icon: Award, title: 'Proven Results', text: 'Our learners consistently achieve their target band scores.' },
  { icon: BookOpen, title: 'Comprehensive', text: 'Full coverage of all four skills with detailed explanations.' },
  { icon: Globe, title: 'Accessible', text: 'Study anytime, anywhere with our web-based platform.' },
  { icon: Heart, title: 'Community', text: 'Join a growing community of dedicated IELTS learners.' },
]

const stats = [
  { value: '10,000+', label: 'Active Learners' },
  { value: '500+', label: 'Practice Exercises' },
  { value: '50+', label: 'Mock Tests' },
  { value: '8.0', label: 'Average Band Score' },
]

export const AboutPage = () => {
  return (
    <div>
      {/* Header */}
      <section className="relative hero-gradient py-20 sm:py-24 overflow-hidden">
        <div className="absolute top-10 right-1/3 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-float" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight animate-fade-in-up">
            About <span className="gradient-text">IELTS Web</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300 animate-fade-in-up stagger-1">
            We're on a mission to make world-class IELTS preparation accessible to every learner.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass p-10">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              IELTS Web was created to bridge the gap between expensive test-prep courses and free but unreliable resources.
              We provide structured, high-quality practice materials that help learners systematically improve across all four IELTS skills.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-t border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className={`text-center opacity-0 animate-fade-in-up stagger-${i + 1}`}>
                <p className="text-3xl sm:text-4xl font-display font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-center text-white mb-14">
            What Sets Us <span className="gradient-text">Apart</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, i) => {
              const Icon = val.icon
              return (
                <div key={val.title} className={`glass-hover p-6 opacity-0 animate-fade-in-up stagger-${(i % 6) + 1}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-white font-display font-semibold mb-2">{val.title}</h3>
                  <p className="text-sm text-gray-400">{val.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
