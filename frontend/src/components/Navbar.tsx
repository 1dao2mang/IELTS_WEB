import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GraduationCap, Menu, X, Sun, Moon, User as UserIcon } from 'lucide-react'
import { useThemeStore, useAuthStore } from '@/store'

const links = [
  { label: 'Home', path: '/' },
  { label: 'Practice', path: '/practice' },
  { label: 'Listening', path: '/listening' },
  { label: 'Reading', path: '/reading' },
  { label: 'Writing', path: '/writing' },
  { label: 'Speaking', path: '/speaking' },
  { label: 'Progress', path: '/progress' },
]

export const Navbar = () => {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggle } = useThemeStore()
  const { user, isAuthenticated } = useAuthStore()

  // Detect scroll for navbar shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-2xl shadow-heavy'
          : 'bg-transparent'
      }`}
      style={scrolled ? { backgroundColor: 'var(--nav-bg-scrolled)', borderBottom: '1px solid var(--border-nav)' } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="group flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-glow-cyan transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-lg">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-display font-bold tracking-tight" style={{ color: 'var(--text-heading)' }}>
              IELTS<span className="gradient-text">Web</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map(link => {
              const isActive = pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-300`}
                  style={{
                    color: isActive ? 'var(--text-nav-active)' : 'var(--text-nav-inactive)',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-link-hover)'
                      e.currentTarget.style.backgroundColor = 'var(--hover-link-bg)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-nav-inactive)'
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  {link.label}
                  {/* Animated underline for active link */}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-scale-in" />
                  )}
                </Link>
              )
            })}

            {/* ─── Theme Toggle ─────────────────────────── */}
            <button
              onClick={toggle}
              className="theme-toggle ml-2"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark'
                ? <Sun className="h-[18px] w-[18px]" />
                : <Moon className="h-[18px] w-[18px]" />}
            </button>

            {/* ─── User Profile Info ────────────────── */}
            {isAuthenticated && user && (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-[var(--border-nav)]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-md">
                  <UserIcon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium hidden lg:inline-block" style={{ color: 'var(--text-heading)' }}>
                  {user.name}
                </span>
              </div>
            )}
          </div>

          {/* Mobile right side: theme toggle + menu toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggle}
              className="theme-toggle"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark'
                ? <Sun className="h-[18px] w-[18px]" />
                : <Moon className="h-[18px] w-[18px]" />}
            </button>
            <button
              onClick={() => setOpen(prev => !prev)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{
                color: 'var(--text-nav-inactive)',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--text-link-hover)'
                e.currentTarget.style.backgroundColor = 'var(--hover-link-bg)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-nav-inactive)'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="md:hidden backdrop-blur-2xl animate-slide-down"
          style={{
            backgroundColor: 'var(--mobile-menu-bg)',
            borderTop: '1px solid var(--border-nav)',
          }}
        >
          <div className="px-4 py-3 space-y-1">
            {links.map((link, i) => {
              const isActive = pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    animationDelay: `${i * 50}ms`,
                    color: isActive ? 'var(--text-nav-active)' : 'var(--text-nav-inactive)',
                    backgroundColor: isActive ? 'var(--active-link-bg)' : 'transparent',
                  }}
                  className="block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 opacity-0 animate-fade-in-up"
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
