import React from 'react'
import Container from '../common/Container'
import { Users, Building, ShieldCheck, Clock } from 'lucide-react'

export const Stats = () => {
  const statsList = [
    { label: 'Security Command & Support', value: '24/7', suffix: 'Vigilance', icon: Clock },
    { label: 'Trained & Vetted Personnel', value: '100%', suffix: 'Verified', icon: Users },
    { label: 'Corporate & Industrial Sites', value: '500+', suffix: 'Premises', icon: Building },
    { label: 'Regulatory & Statutory Compliance', value: 'PSARA', suffix: 'Certified', icon: ShieldCheck },
  ]

  return (
    <section className="py-16 bg-[#0f172a] text-white border-y border-slate-800">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#c23235] bg-red-950/60 px-3 py-1 rounded-full border border-red-800/40">
            FACTS & FIGURES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3">
            Scale, Compliance & Operational Reach
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {statsList.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-[#c23235]/60 transition-colors"
              >
                <Icon className="w-8 h-8 text-[#c23235] mx-auto mb-3" />
                <div className="text-3xl sm:text-4xl font-black text-white mb-1 tracking-tight">
                  <span className="text-[#c23235]">{stat.value}</span>
                </div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-0.5">
                  {stat.suffix}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default Stats
