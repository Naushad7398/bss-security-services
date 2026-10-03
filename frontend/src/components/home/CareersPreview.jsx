import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Users, GraduationCap, ShieldCheck, HeartHandshake } from 'lucide-react'
import Container from '../common/Container'
import Button from '../common/Button'
import ImagePlaceholder from '../common/ImagePlaceholder'
import { siteImages } from '../../data/images'

export const CareersPreview = () => {
  const careerHighlights = [
    {
      icon: GraduationCap,
      title: 'Structured Training & Skill Growth',
      desc: 'Ongoing preparation in safety protocols, reporting and facility access.',
    },
    {
      icon: ShieldCheck,
      title: 'Clear Operating Standards',
      desc: 'Disciplined assignments with defined responsibilities and leadership.',
    },
    {
      icon: HeartHandshake,
      title: 'Respectful Work Culture',
      desc: 'Committed to fair operational practices, dignity and personnel welfare.',
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200 relative overflow-hidden">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Panel */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white p-2.5 shadow-xl shadow-slate-200/60">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11]">
                <ImagePlaceholder
                  src={siteImages.careers}
                  alt="Career Opportunities at BSS Suraksha"
                  aspectRatio="aspect-[4/3] sm:aspect-[16/11]"
                  label="Careers at BSS"
                  icon={Users}
                  className="w-full h-full"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-1 -left-1 sm:bottom-6 sm:left-6 bg-white/95 border border-amber-200 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl max-w-[260px] hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black text-slate-900 tracking-wide block uppercase">
                      Dedicated Workforce
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium leading-tight block mt-0.5">
                      Opportunities across guarding & operational roles
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Careers Content */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-widest uppercase mb-4">
              <span>CAREERS AT BSS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
              Career{' '}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                Opportunities
              </span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Explore opportunities to contribute to professional security operations and client-focused service delivery. We value discipline, integrity and commitment to client safety.
            </p>

            <div className="space-y-4 mb-10">
              {careerHighlights.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4 hover:border-amber-500/80 hover:bg-white hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div>
              <Button
                to="/careers"
                variant="primary"
                size="lg"
                className="group uppercase text-xs tracking-wider font-extrabold py-4 px-8 shadow-lg shadow-amber-500/20"
              >
                <span>Join Our Team</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CareersPreview
