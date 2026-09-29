import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed tracking-wide'

  const variants = {
    primary:
      'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-semibold shadow-lg shadow-amber-500/25 border border-amber-300/40 hover:shadow-amber-500/40',
    secondary:
      'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 shadow-sm',
    outline:
      'border border-amber-500/80 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400 hover:text-amber-300',
    ghost:
      'text-slate-300 hover:text-white hover:bg-slate-800/60',
  }

  const sizes = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  }

  const buttonClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`

  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.015 }}
      whileTap={{ scale: disabled ? 1 : 0.985 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button
