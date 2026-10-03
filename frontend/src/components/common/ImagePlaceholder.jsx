import React from 'react'
import { Shield } from 'lucide-react'

export const ImagePlaceholder = ({
  src,
  alt = 'BSS Suraksha Security Operations',
  className = '',
  aspectRatio = 'aspect-[16/9]',
  label = 'BSS Security Operations',
  icon: Icon = Shield,
}) => {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-amber-50/50 border border-slate-200 flex items-center justify-center ${aspectRatio} ${className}`}
    >
      {/* Architectural Security Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative Corporate Framing */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 select-none">
        <div className="w-14 h-14 rounded-2xl bg-white border border-amber-200 text-amber-700 flex items-center justify-center shadow-md mb-3 transition-transform duration-200">
          <Icon className="w-7 h-7 stroke-[1.8]" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
          {label}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-1 font-semibold">
          BSS Suraksha Standards
        </span>
      </div>
    </div>
  )
}

export default ImagePlaceholder
