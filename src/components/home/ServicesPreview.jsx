import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Shield,
  Building2,
  Users,
  Video,
  UserCheck,
  FileSearch,
  ArrowRight,
} from 'lucide-react'
import Container from '../common/Container'
import Button from '../common/Button'
import { services } from '../../data/services'

const iconMap = {
  Shield,
  Building2,
  Users,
  Video,
  UserCheck,
  FileSearch,
}

export const ServicesPreview = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="relative py-20 lg:py-28 bg-[#070b14] border-b border-slate-800/80 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-400 mb-3 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
            OUR SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-1 mb-5">
            Security Solutions Built Around Your Needs
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Professional security services designed around the people, premises and operational requirements of every client.
          </p>
        </div>

        {/* 6 Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Shield

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/75 to-slate-950/95 border border-slate-800/90 hover:border-amber-500/40 p-7 sm:p-8 backdrop-blur-sm shadow-xl shadow-black/40 flex flex-col justify-between transition-colors duration-200"
              >
                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6 group-hover:bg-amber-500/20 group-hover:border-amber-400/40 transition-colors duration-200">
                    <IconComponent className="w-6 h-6 transition-transform duration-200 group-hover:scale-105" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors duration-150">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  {/* 3 Key Feature Points */}
                  {service.features && (
                    <ul className="space-y-2.5 mb-8 text-xs text-slate-300 border-t border-slate-800/70 pt-4">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Learn More Action */}
                <div className="pt-2">
                  <Link
                    to="/services"
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors gap-1.5 group/link"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Section Footer Centered CTA */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-slate-800/80 text-center max-w-xl mx-auto space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Need a Customized Security Plan?
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Speak with our security team to discuss specific premises protection and vigilance requirements.
          </p>
          <div className="pt-2">
            <Button
              to="/contact"
              variant="primary"
              size="md"
              className="px-6 py-3 text-xs uppercase tracking-wider font-bold shadow-amber-500/20"
            >
              Request a Consultation
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ServicesPreview