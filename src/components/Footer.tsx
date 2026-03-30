import { Link } from 'react-router-dom'
import { GraduationCap, Github, Twitter, Mail } from 'lucide-react'

const footerLinks = [
  {
    heading: 'Skills',
    items: [
      { label: 'Listening', path: '/listening' },
      { label: 'Reading', path: '/reading' },
      { label: 'Writing', path: '/writing' },
      { label: 'Speaking', path: '/speaking' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { label: 'Practice Tests', path: '/practice' },
      { label: 'Progress Tracker', path: '/progress' },
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' },
    ],
  },
]

export const Footer = () => {
  return (
    <footer className="relative mt-auto">
      {/* Gradient divider */}
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="group inline-flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-display font-bold" style={{ color: 'var(--text-heading)' }}>
                IELTS<span className="gradient-text">Web</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-tertiary)' }}>
              Your comprehensive platform for IELTS preparation. Practice all four skills and track your progress toward your target band score.
            </p>
            {/* Social icons */}
            <div className="flex items-center space-x-3 mt-5">
              {[Github, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:text-cyan-400 hover:border-cyan-500/30"
                  style={{
                    backgroundColor: 'var(--social-bg)',
                    border: '1px solid var(--social-border)',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(group => (
            <div key={group.heading}>
              <h3
                className="text-xs font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {group.heading}
              </h3>
              <ul className="space-y-2.5">
                {group.items.map(item => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="group relative text-sm transition-colors duration-300 inline-block"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-link-hover)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)' }}
                    >
                      {item.label}
                      {/* Underline slide-in */}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-footer)' }}>
            &copy; {new Date().getFullYear()} IELTS Web. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-xs" style={{ color: 'var(--text-footer)' }}>
            <Link to="/about" className="hover:opacity-70 transition-opacity">Privacy</Link>
            <Link to="/about" className="hover:opacity-70 transition-opacity">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
