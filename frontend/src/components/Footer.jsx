import { Link } from 'react-router-dom';
import { GraduationCap, Github, Twitter, Mail } from 'lucide-react';

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
];

export const Footer = () => {
  return (
    <footer className="relative mt-auto bg-slate-50 dark:bg-slate-900 border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="group inline-flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                IELTS<span className="text-primary">Web</span>
              </span>
            </Link>
            <p className="mt-6 text-base text-muted-foreground max-w-sm leading-relaxed">
              Your comprehensive platform for IELTS preparation. Practice all four skills and track your progress toward your target band score.
            </p>
            {/* Social icons */}
            <div className="flex items-center space-x-4 mt-6">
              {[Github, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-slate-800 border border-border text-muted-foreground transition-all duration-200 hover:text-primary hover:border-primary hover:shadow-md hover:-translate-y-1"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(group => (
            <div key={group.heading}>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                {group.heading}
              </h3>
              <ul className="space-y-4">
                {group.items.map(item => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} IELTS Web. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

