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
    <section className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-widest uppercase mb-4">
            <span>BSS AT A GLANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-4">
            Operational Scale & Consistency
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Key operational indicators structured around transparent governance, disciplined execution, and client accountability.
          </p>
        </div>

        {/* 6 Metric Slots */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {factItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-mono tracking-tight mb-2">
                    {item.value}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 tracking-wide uppercase leading-tight mb-1">
                    {item.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Verification Note */}
        <div className="mt-8 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 max-w-2xl shadow-xs">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            Verified company statistics and certifications will be published here upon official audit validation.
          </span>
        </div>
      </Container>
    </section>
  )
}

export default Facts
