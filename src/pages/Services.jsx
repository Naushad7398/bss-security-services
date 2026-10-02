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
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-slate-50 min-h-screen">
      <Container>
        <SectionTitle
          subtitle="Enterprise Solutions & Capabilities"
          title="Security Services & Protective Solutions"
          description="Tailored security services engineered around the operational requirements, premises geometry, and compliance mandates of each client."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Shield

            return (
              <div
                key={service.id}
                className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-amber-500/80 hover:shadow-xl transition-all duration-200 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-slate-950 transition-all duration-200 shadow-xs">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  {service.features && (
                    <ul className="space-y-2.5 mb-6 text-xs text-slate-700 border-t border-slate-100 pt-4">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100">
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
