import { Link } from 'react-router-dom'
import { Target, Users, Sparkles, ArrowRight } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Exam-Focused',
    desc: 'Every exercise mirrors real IELTS question types and difficulty levels.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    desc: 'Built by IELTS trainers and refined by thousands of student interactions.',
  },
  {
    icon: Sparkles,
    title: 'Always Free',
    desc: 'Quality IELTS preparation should be accessible to everyone, everywhere.',
  },
]

export const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* ─── Hero ─────────────────────────── */}
      <section className="hero-gradient relative pt-32 pb-20 sm:pt-36 sm:pb-24 px-4">
        <div className="orb orb-violet w-[350px] h-[350px] -top-28 -left-28 animate-float opacity-35" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-heading">
            About <span className="gradient-text">IELTS Web</span>
          </h1>
          <p className="mt-5 text-body max-w-xl mx-auto leading-relaxed">
            We believe everyone deserves access to high-quality IELTS preparation. Our platform combines proven exam strategies with modern technology to help you reach your target band score.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20 space-y-16">
        {/* ─── Our Values ─────────────────── */}
        <div>
          <h2 className="text-2xl font-display font-semibold text-heading text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <div
                key={i}
                className="glass-hover p-7 text-center opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${i * 120 + 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-theme-card flex items-center justify-center mx-auto mb-5">
                  <v.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-base font-semibold text-heading mb-2">{v.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Story ──────────────────────── */}
        <div className="glass p-8 sm:p-10">
          <h2 className="text-xl font-display font-semibold text-heading mb-4">Our Story</h2>
          <div className="prose prose-sm prose-invert max-w-none">
            <p className="text-body leading-relaxed">
              IELTS Web started as a simple idea: create the best free IELTS practice platform on the internet.
              Too many students around the world face barriers — expensive courses, limited access to quality materials,
              and outdated preparation methods.
            </p>
            <p className="text-body leading-relaxed mt-4">
              Our team of experienced IELTS trainers, software engineers, and language specialists work together to
              create exercises that accurately reflect the real exam experience. Every question is carefully
              crafted to build the skills you need for test day and beyond.
            </p>
          </div>
        </div>

        {/* ─── CTA ────────────────────────── */}
        <div className="text-center">
          <Link
            to="/practice"
            className="btn-gradient px-8 py-3.5 text-sm inline-flex items-center space-x-2"
          >
            <span>Start Practicing</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}


