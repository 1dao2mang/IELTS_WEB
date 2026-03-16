import type { ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  title?: string
  hover?: boolean
  className?: string
  glowColor?: 'cyan' | 'blue' | 'violet' | 'emerald' | 'amber'
}

const glowMap = {
  cyan: 'hover:shadow-glow-cyan',
  blue: 'hover:shadow-glow-blue',
  violet: 'hover:shadow-glow-violet',
  emerald: 'hover:shadow-glow-emerald',
  amber: 'hover:shadow-glow-amber',
}

export const Card = ({ children, title, hover, className, glowColor = 'cyan' }: CardProps) => {
  return (
    <div
      className={clsx(
        'bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300',
        hover && [
          'hover:bg-white/10 hover:border-white/20 hover:-translate-y-1',
          glowMap[glowColor],
        ],
        className
      )}
    >
      {title && (
        <h3 className="text-lg font-display font-semibold text-white mb-4">{title}</h3>
      )}
      {children}
    </div>
  )
}
