import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, ArrowRight, Shield, Clock, Users, Cpu, CheckCircle2 } from 'lucide-react'
import Container from '../common/Container'
import Button from '../common/Button'

// Import BSS logo from src/assets/images/ (e.g. logo.png, logo.svg, logo.webp, logo.jpg)
const logoModules = import.meta.glob('../../assets/images/logo.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
})
const bssLogoSrc = Object.values(logoModules)[0] || null

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const trustIndicators = [
    {
      icon: Clock,
      title: '24/7 Command Center',
      desc: 'Rapid response & active oversight',
    },
    {
      icon: Users,
      title: 'Vetted Defense Cadre',
      desc: 'Strict background checks & rigorous drill',
    },
    {
      icon: Cpu,
      title: 'Smart ManTech Oversight',
      desc: 'Digital patrolling & live sensor feeds',
    },
  ]

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-amber-50/20 border-b border-slate-200">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-slate-200/50 rounded-full blur-[130px]" />
        
        {/* Subtle architectural grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 text-left"
          >
            {/* Small Gold & Navy Badge */}
            <motion.div variants={itemVariants} className="inline-block mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wider uppercase shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="font-extrabold tracking-widest text-[11px]">
                  DISCIPLINED PROTECTION • PSARA COMPLIANT
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.12] mb-6"
            >
              Your Safety.{' '}
              <span className="block mt-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                Our Responsibility.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl leading-relaxed mb-8 font-normal"
            >
              Enterprise-grade security solutions integrating disciplined personnel, ex-defense leadership, and electronic surveillance to safeguard corporate, industrial, and commercial premises across India.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12"
            >
              <Button
                to="/contact"
                variant="primary"
                size="lg"
                className="group uppercase text-xs tracking-wider font-extrabold py-4 px-7 shadow-amber-500/25"
              >
                <span>Request Security Proposal</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>

              <Button
                to="/services"
                variant="secondary"
                size="lg"
                className="text-xs uppercase tracking-wider font-semibold py-4 px-6"
              >
                Explore Solutions
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {trustIndicators.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Column: High-Stature Crest Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center w-full max-w-lg mx-auto lg:max-w-none"
          >
            <div className="absolute inset-0 bg-amber-500/10 rounded-3xl blur-2xl pointer-events-none" />

            {/* Corporate White Stage Card with Gold Border */}
            <div className="relative w-full rounded-3xl bg-white border border-amber-200/90 p-6 sm:p-8 shadow-2xl shadow-slate-300/70 overflow-hidden">
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[11px] font-black tracking-widest text-[#0a192f] uppercase">
                    BSS COMMAND DESK
                  </span>
                </div>

                <div className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>24/7 ACTIVE VIGILANCE</span>
                </div>
              </div>

              {/* Center Official Crest Showcase */}
              <div className="relative flex flex-col items-center justify-center my-6 py-4">
                <div className="relative flex items-center justify-center w-44 h-44 sm:w-52 sm:h-52 rounded-2xl p-2">
                  {bssLogoSrc ? (
                    <img
                      src={bssLogoSrc}
                      alt="BSS Suraksha Services Crest"
                      className="w-full h-full object-contain filter drop-shadow-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 flex items-center justify-center shadow-lg">
                      <ShieldCheck className="w-9 h-9" />
                    </div>
                  )}
                </div>

                <div className="mt-3 text-center">
                  <span className="text-xs font-black tracking-widest uppercase text-amber-700">
                    विश्वास • समर्पण • सुरक्षा
                  </span>
                  <p className="text-xs text-slate-500 mt-1 font-semibold">
                    Trained Guards • Smart Patrol • PSARA Certified
                  </p>
                </div>
              </div>

              {/* Bottom Operational Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900">100% Compliant</div>
                    <div className="text-[10px] text-slate-500">Statutory & Labor Laws</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900">Instant Dispatch</div>
                    <div className="text-[10px] text-slate-500">24/7 Incident Support</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
