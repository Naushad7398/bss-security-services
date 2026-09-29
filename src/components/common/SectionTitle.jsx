import React from 'react'

export const SectionTitle = ({
  subtitle,
  title,
  description,
  align = 'center',
  className = '',
}) => {
  const alignmentClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center mx-auto'

  return (
    <div className={`max-w-3xl mb-12 ${alignmentClass} ${className}`}>
      {subtitle && (
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-400 mb-3 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
          {subtitle}
        </span>
      )}
      {title && (
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 mb-4">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionTitle