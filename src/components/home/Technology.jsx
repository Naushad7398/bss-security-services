import React from 'react'
import { motion } from 'framer-motion'
import {
  Cctv,
  Smartphone,
  Lock,
  BarChart3,
  Cpu,
  ArrowRight,
  ShieldAlert,
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
    <section className="py-20 lg:py-28 bg-[#070b14] border-b border-slate-800/80 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase mb-4">
            <span>TECHNOLOGY INTEGRATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-5">
            Technology Supporting{' '}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Human Vigilance
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Modern security operations combine trained personnel with surveillance, communication and digital coordination tools to support visibility and operational awareness.
          </p>
        </div>

        {/* Visual + 4 Feature Blocks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-2 shadow-2xl shadow-black/80">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] sm:aspect-square">
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
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md hidden sm:flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Surveillance Readiness
                  </span>
                </div>
                <span className="text-[11px] font-mono text-amber-400 font-semibold">
                  24/7 Desk
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
                  className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/90 hover:border-amber-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
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
