import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 disabled:bg-primary-300',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 disabled:bg-secondary-300',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 disabled:border-primary-300 disabled:text-primary-300',
    ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500 disabled:text-primary-300',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        disabled && 'cursor-not-allowed opacity-60',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
