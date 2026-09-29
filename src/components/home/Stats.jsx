import React from 'react'
import Container from '../common/Container'
import { Users, Building, ShieldCheck, Clock } from 'lucide-react'

export const Stats = () => {
  const statsList = [
    { label: 'Security Support', value: '24/7', icon: Clock },
    { label: 'Trained Professionals', value: 'Verified', icon: Users },
    { label: 'Customized Solutions', value: 'Tailored', icon: Building },
    { label: 'Compliance & Safety', value: 'Standard', icon: ShieldCheck },
  ]

  return (
    <section className="py-12 bg-slate-900 border-b border-slate-800">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {statsList.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="p-4">
                <Icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-400 tracking-wide uppercase">
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