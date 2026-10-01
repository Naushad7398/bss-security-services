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
      className={`relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#070b14] to-slate-900 border border-slate-800/80 flex items-center justify-center ${aspectRatio} ${className}`}
    >
      {/* Architectural Security Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #f59e0b 1px, transparent 1px), linear-gradient(to bottom, #f59e0b 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Subtle radial center lighting */}
      <div className="absolute inset-0 bg-radial from-amber-500/[0.04] via-transparent to-transparent pointer-events-none" />

      {/* Decorative Corporate Framing */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 select-none">
        <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700/80 text-amber-400 flex items-center justify-center shadow-lg shadow-black/60 mb-3 group-hover:scale-105 transition-transform duration-200">
          <Icon className="w-7 h-7 stroke-[1.8]" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
          {label}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">
          BSS Suraksha Standards
        </span>
      </div>
    </div>
  )
}

export default ImagePlaceholder
