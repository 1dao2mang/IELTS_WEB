import React, { ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  title?: string
  subtitle?: string
  footer?: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  className,
  hover = false,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-soft overflow-hidden',
        hover && 'transition-all duration-300 hover:shadow-medium hover:-translate-y-1',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200">
          {title && <h3 className="text-xl font-semibold text-gray-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  )
}
