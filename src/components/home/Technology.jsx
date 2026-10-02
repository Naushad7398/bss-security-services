import React from 'react'
import { motion } from 'framer-motion'
import {
  Cctv,
  Smartphone,
  Lock,
  BarChart3,
  Cpu,
  ArrowRight,
} from 'lucide-react'
import Container from '../common/Container'
import Button from '../common/Button'
import ImagePlaceholder from '../common/ImagePlaceholder'
import { siteImages } from '../../data/images'

export const Technology = () => {
  const techFeatures = [
    {
      icon: Cctv,
      title: 'CCTV Monitoring & Control Desk',
      desc: 'Centralized electronic surveillance, perimeter scanning and visual incident verification.',
    },
    {
      icon: Smartphone,
      title: 'Digital Coordination & Reporting',
      desc: 'Structured shift logging, checkpoint validation and real-time operational communications.',
    },
    {
      icon: Lock,
      title: 'Access Management Support',
      desc: 'Visitor validation, credential verification and organized entry/exit management.',
    },
    {
      icon: BarChart3,
      title: 'Operational Visibility & Logging',
      desc: 'Accurate daily event records, duty handover logs and immediate escalation reporting.',
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-widest uppercase mb-4">
            <span>TECHNOLOGY INTEGRATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-5">
            Technology Supporting{' '}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
              Human Vigilance
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Modern security operations combine trained personnel with surveillance, communication and digital coordination tools to support visibility and operational awareness.
          </p>
        </div>

        {/* Visual + 4 Feature Blocks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white p-2.5 shadow-xl shadow-slate-200/60">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-square">
                <ImagePlaceholder
                  src={siteImages.technology}
                  alt="Security Technology Integration at BSS"
                  aspectRatio="aspect-[4/3] sm:aspect-square"
                  label="Surveillance & Coordination"
                  icon={Cpu}
                  className="w-full h-full"
                />
              </div>

              {/* Status Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md hidden sm:flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Surveillance Readiness
                  </span>
                </div>
                <span className="text-[11px] font-mono text-amber-700 font-bold">
                  24/7 Active
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Feature Blocks */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {techFeatures.map((feat, idx) => {
              const Icon = feat.icon
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/80 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 tracking-tight">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                    <span>Operational Standard</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Technology
