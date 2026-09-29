import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, ArrowRight, Shield, Clock, Users, SlidersHorizontal } from 'lucide-react'
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
      title: '24/7 Security Support',
      desc: 'Rapid response & continuous assistance',
    },
    {
      icon: Users,
      title: 'Trained Professionals',
      desc: 'Trained & verified security personnel',
    },
    {
      icon: SlidersHorizontal,
      title: 'Customized Security Solutions',
      desc: 'Tailored for enterprise & client premises',
    },
  ]

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#070b14]">
      {/* Background Cinematic Treatment */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep ambient radial glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] sm:h-[600px] bg-gradient-to-tr from-amber-500/10 via-amber-600/5 to-transparent rounded-full blur-[130px] opacity-70" />
        <div className="absolute -top-32 right-0 w-[400px] h-[400px] bg-blue-950/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[350px] bg-slate-900/40 rounded-full blur-[120px]" />

        {/* Subtle geometric grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Vignette dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/50 via-transparent to-[#070b14]" />
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
            {/* Small Badge */}
            <motion.div variants={itemVariants} className="inline-block mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase shadow-sm shadow-amber-500/10 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="font-bold tracking-widest text-[11px]">
                  TRUSTED SECURITY SOLUTIONS
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-black tracking-tight text-white leading-[1.1] mb-6"
            >
              Your Safety.{' '}
              <span className="block mt-1 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Our Responsibility.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed mb-8 font-normal"
            >
              Professional security solutions designed to protect people, property and businesses with discipline, vigilance and reliability.
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
                className="group uppercase text-xs tracking-wider font-bold py-4 px-7 shadow-amber-500/30"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>

              <Button
                to="/services"
                variant="secondary"
                size="lg"
                className="text-xs uppercase tracking-wider font-semibold py-4 px-6 border-slate-700/80 hover:border-amber-500/40 hover:text-white"
              >
                Explore Our Services
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {trustIndicators.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500/20 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Column: Premium Corporate Security Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center w-full max-w-lg mx-auto lg:max-w-none"
          >
            {/* Ambient Gold Glow Backdrop */}
            <motion.div
              animate={{ opacity: [0.3, 0.55, 0.3], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-amber-600/10 to-transparent rounded-3xl blur-3xl pointer-events-none"
            />

            {/* Main Corporate Glassmorphism Panel */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="relative w-full rounded-2xl bg-gradient-to-b from-slate-900/95 via-slate-900/85 to-[#070b14]/95 border border-slate-800/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/90 overflow-hidden"
            >
              {/* Header: Security Status Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-[11px] font-bold tracking-widest text-slate-300 uppercase">
                    SECURITY OPERATIONS
                  </span>
                </div>

                <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>VIGILANCE & RESPONSE</span>
                </div>
              </div>

              {/* Center: Premium Logo Stage with Subtle Gold Rings */}
              <div className="relative flex flex-col items-center justify-center my-6 py-6 border-y border-slate-800/80">
                {/* Gold Glow Rings */}
                <div className="relative flex items-center justify-center w-36 h-36 sm:w-40 sm:h-40 rounded-2xl bg-slate-950/90 border border-amber-500/30 p-4 shadow-xl shadow-black/80">
                  {/* Subtle pulsing background glow behind logo */}
                  <motion.div
                    animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-amber-500/20 via-amber-400/15 to-transparent blur-md pointer-events-none"
                  />
                  <div className="absolute inset-0 rounded-2xl border border-amber-400/20 pointer-events-none" />

                  {bssLogoSrc ? (
                    <img
                      src={bssLogoSrc}
                      alt="BSS Suraksha Services Logo"
                      className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_4px_16px_rgba(245,158,11,0.25)]"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/25 mb-2">
                        <ShieldCheck className="w-8 h-8 stroke-[2.2]" />
                      </div>
                      <span className="text-xs font-black tracking-wider text-white">
                        BSS <span className="text-amber-400">SURAKSHA</span>
                      </span>
                      <span className="text-[8px] tracking-widest text-slate-400 uppercase mt-0.5">
                        Services Pvt. Ltd.
                      </span>
                    </div>
                  )}
                </div>

                {/* Subtitle Under Logo */}
                <div className="mt-4 text-center">
                  <span className="text-[11px] font-bold tracking-widest text-amber-400 uppercase">
                    PROFESSIONAL PROTECTION
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Discipline • Vigilance • Reliability
                  </p>
                </div>
              </div>

              {/* Minimal Shield / Security Feature Cards */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white tracking-wide">
                      SECURITY SERVICES
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Standard Protocols
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white tracking-wide">
                      24/7 SUPPORT
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Operational Assistance
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Live Readiness Pill */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Central Control Desk</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping inline-block" />
                  Live Operational Readiness
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default Hero