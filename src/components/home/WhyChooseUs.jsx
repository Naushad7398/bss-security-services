import React from 'react'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import { FileCheck, ShieldAlert, Cpu, HeartHandshake } from 'lucide-react'

export const WhyChooseUs = () => {
  const reasons = [
    {
      title: 'Statutory & Regulatory Compliance',
      description: 'Adherence to standard labor laws, statutory requirements, and security guidelines.',
      icon: FileCheck,
    },
    {
      title: 'Trained & Disciplined Personnel',
      description: 'Structured training modules covering emergency preparedness, fire safety, and on-site vigilance.',
      icon: ShieldAlert,
    },
    {
      title: 'Technology-Integrated Vigilance',
      description: 'Deployment of digital check-ins, scheduled patrolling, and systematic incident reporting.',
      icon: Cpu,
    },
    {
      title: 'Dedicated Client Support Officers',
      description: 'Designated point of contact for operational coordination, site reviews, and escalation handling.',
      icon: HeartHandshake,
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-slate-950 border-b border-slate-800">
      <Container>
        <SectionTitle
          subtitle="Why Choose Us"
          title="The BSS Security Advantage"
          description="We combine disciplined personnel with modern vigilance practices to support round-the-clock safety and peace of mind."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-lg bg-slate-900/40 border border-slate-800 text-left hover:border-amber-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default WhyChooseUs