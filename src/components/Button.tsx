import type { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  fullWidth?: boolean
}

const variants = {
  primary:
    'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-glow-cyan hover:scale-[1.02] focus:ring-cyan-500',
  secondary:
    'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:shadow-glow-violet hover:scale-[1.02] focus:ring-violet-500',
  outline:
    'border border-white/20 text-white hover:bg-white/10 hover:border-white/30 focus:ring-white/30',
  ghost:
    'text-gray-300 hover:text-white hover:bg-white/10 focus:ring-white/20',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3 text-base rounded-xl',
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-medium transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
