import React from 'react'
import Container from '../components/common/Container'
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import { services } from '../data/services'
import {
  Shield,
  Building2,
  Users,
  Video,
  UserCheck,
  FileSearch,
  ArrowRight,
} from 'lucide-react'

const iconMap = {
  Shield,
  Building2,
  Users,
  Video,
  UserCheck,
  FileSearch,
}

export const Services = () => {
  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[#070b14]">
      <Container>
        <SectionTitle
          subtitle="Our Capabilities"
          title="Security Services & Protective Solutions"
          description="Professional security services designed around the people, premises and operational requirements of every client."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Shield

            return (
              <div
                key={service.id}
                className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  {service.features && (
                    <ul className="space-y-2 mb-6 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800/60">
                  <Button to="/contact" variant="outline" size="sm" className="w-full justify-center">
                    Enquire Service <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </div>
  )
}

export default Services