import React from 'react'
import { Users, Building, ShieldCheck, Clock, MapPin, Award, Info } from 'lucide-react'
import Container from '../common/Container'

export const Facts = () => {
  const factItems = [
    {
      label: 'Security Personnel Deployed',
      value: '—',
      icon: Users,
      description: 'Active personnel across client posts',
    },
    {
      label: 'Client Locations Served',
      value: '—',
      icon: Building,
      description: 'Commercial, industrial & residential sites',
    },
    {
      label: 'Operational Deployments',
      value: '—',
      icon: MapPin,
      description: 'Structured assignments and duty points',
    },
    {
      label: 'Years of Experience',
      value: '—',
      icon: Clock,
      description: 'Vigilance and operational delivery',
    },
    {
      label: 'Service Specializations',
      value: '—',
      icon: ShieldCheck,
      description: 'Comprehensive security categories',
    },
    {
      label: 'Standardized Operating Protocols',
      value: '—',
      icon: Award,
      description: 'Standard operating procedures adhered',
    },
  ]

  return (
    <section className="py-20 lg:py-24 bg-[#070b14] border-b border-slate-800/80 relative overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase mb-4">
            <span>BSS AT A GLANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4">
            Operational Scale & Consistency
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Key operational indicators structured around transparent management, disciplined execution and client accountability.
          </p>
        </div>

        {/* 6 Clean Corporate Placeholder Metric Slots */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {factItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/90 hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono tracking-tight mb-2">
                    {item.value}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide uppercase leading-tight mb-1">
                    {item.label}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Verification Note (Transparent, Zero Unsupported Claims) */}
        <div className="mt-8 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 max-w-2xl">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            Verified company statistics and certifications will be published here upon official audit validation.
          </span>
        </div>
      </Container>
    </section>
  )
}

export default Facts
