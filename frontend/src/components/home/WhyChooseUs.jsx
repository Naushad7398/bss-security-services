import React from 'react'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import { FileCheck, ShieldAlert, Cpu, HeartHandshake } from 'lucide-react'

export const WhyChooseUs = () => {
  const reasons = [
    {
      title: 'Statutory & Regulatory Compliance',
      description: 'Strict adherence to PSARA guidelines, labor compliance, ESIC, PF, and state statutory provisions.',
      icon: FileCheck,
    },
    {
      title: 'Trained & Disciplined Personnel',
      description: 'Standardized defense-inspired drills, fire safety certifications, and specialized incident mitigation protocols.',
      icon: ShieldAlert,
    },
    {
      title: 'ManTech Integrated Vigilance',
      description: 'Smart digital check-in systems, QR-code patrolling, and real-time electronic command logs.',
      icon: Cpu,
    },
    {
      title: 'Dedicated Client Support Officers',
      description: 'Designated operations managers for daily coordination, surprise site audits, and seamless escalations.',
      icon: HeartHandshake,
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <Container>
        <SectionTitle
          subtitle="The BSS Security Edge"
          title="Why Leading Enterprises Trust BSS Suraksha"
          description="Combining disciplined manpower with institutional governance to provide round-the-clock safety and operational resilience."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white border border-slate-200 text-left hover:border-amber-500/80 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-slate-950 transition-all duration-200 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default WhyChooseUs
