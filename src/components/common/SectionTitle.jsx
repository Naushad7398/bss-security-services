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
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#c23235] mb-3 px-3.5 py-1 rounded-full bg-red-50 border border-red-200">
          {subtitle}
        </span>
      )}
      {title && (
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 mb-4">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
