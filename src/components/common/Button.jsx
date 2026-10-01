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
      'bg-[#c23235] hover:bg-[#a81c22] text-white font-semibold shadow-md shadow-red-900/15 border border-[#b01e21] hover:shadow-lg hover:shadow-red-900/25',
    secondary:
      'bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 shadow-sm',
    outline:
      'border-2 border-[#c23235] text-[#c23235] hover:bg-[#c23235] hover:text-white font-semibold',
    outlineWhite:
      'border-2 border-white text-white hover:bg-white/15 font-bold',
    white:
      'bg-white hover:bg-slate-100 text-[#c23235] hover:text-[#9e1d23] font-bold shadow-md shadow-black/15 border border-white',
    ghost:
      'text-slate-700 hover:text-[#c23235] hover:bg-red-50/80',
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
