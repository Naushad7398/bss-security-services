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
    <section className="py-20 lg:py-28 bg-[#050811] border-b border-slate-800/80 relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Image Panel */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-2 shadow-2xl shadow-black/80">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] sm:aspect-[16/11]">
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
              <div className="absolute -bottom-1 -left-1 sm:bottom-6 sm:left-6 bg-slate-900/95 border border-amber-500/30 backdrop-blur-md rounded-xl p-4 sm:p-5 shadow-2xl max-w-[260px] hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-white tracking-wide block uppercase">
                      Dedicated Workforce
                    </span>
                    <span className="text-[10px] text-slate-400 leading-tight block mt-0.5">
                      Opportunities across security & operational roles
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Careers Content */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase mb-4">
              <span>CAREERS AT BSS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-6">
              Career{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Opportunities
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              Explore opportunities to contribute to professional security operations and client-focused service delivery. We value discipline, integrity and commitment to client safety.
            </p>

            <div className="space-y-4 mb-10">
              {careerHighlights.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 flex items-start gap-4 hover:border-slate-700/80 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
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
                className="group uppercase text-xs tracking-wider font-bold py-4 px-8 shadow-lg shadow-amber-500/20"
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
