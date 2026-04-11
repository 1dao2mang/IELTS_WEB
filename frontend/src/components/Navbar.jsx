import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, Sun, Moon, User } from 'lucide-react';
import { useThemeStore, useAuthStore } from '@/store';

const links = [
  { label: 'Home', path: '/' },
  { label: 'Practice', path: '/practice' },
  { label: 'Listening', path: '/listening' },
  { label: 'Reading', path: '/reading' },
  { label: 'Writing', path: '/writing' },
  { label: 'Speaking', path: '/speaking' },
  { label: 'Progress', path: '/progress' },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useThemeStore();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-border shadow-sm'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="group flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              IELTS<span className="text-primary">Web</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center flex-1 ml-10">
            <div className="flex space-x-1">
              {links.map(link => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggle}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-slate-700" />}
            </button>

            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3 pl-4 border-l border-border">
                <span className="text-sm font-semibold text-foreground">
                  {user.name}
                </span>
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-sm">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
            ) : (
               <Link to="/login" className="btn-primary">
                 Bắt đầu học
               </Link>
            )}
          </div>

          {/* Mobile Right */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggle} className="p-2">
              {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-slate-700" />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-border animate-slide-down">
          <div className="px-4 py-2 space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {!isAuthenticated && (
              <Link to="/login" className="block w-full text-center btn-primary mt-4">
                Bắt đầu học
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

