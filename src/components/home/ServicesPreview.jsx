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
    <section className="relative py-20 lg:py-28 bg-white border-b border-slate-200 overflow-hidden">
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#c23235] mb-3 px-3.5 py-1 rounded-full bg-red-50 border border-red-200">
            BUSINESS LINES & SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-1 mb-5">
            Security Solutions Built Around Your Needs
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Modeled with the precision of market leaders, our solutions protect personnel, premises, and core commercial assets across India.
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
                className="group relative rounded-2xl bg-white border border-slate-200 hover:border-[#c23235] p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 text-[#c23235] flex items-center justify-center mb-6 group-hover:bg-[#c23235] group-hover:text-white transition-colors duration-200">
                    <IconComponent className="w-6 h-6 transition-transform duration-200 group-hover:scale-105" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#c23235] transition-colors duration-150">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  {/* 3 Key Feature Points */}
                  {service.features && (
                    <ul className="space-y-2.5 mb-8 text-xs text-slate-700 border-t border-slate-100 pt-4">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c23235] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Learn More Action */}
                <div className="pt-2 border-t border-slate-100">
                  <Link
                    to="/services"
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#c23235] hover:text-[#9e1d23] transition-colors gap-1.5 group/link"
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
        <div className="mt-16 sm:mt-20 pt-10 border-t border-slate-200 text-center max-w-xl mx-auto space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Need a Customized Security Plan?
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Connect with our corporate security coordinators to design a tailored security deployment for your site.
          </p>
          <div className="pt-2">
            <Button
              to="/contact"
              variant="primary"
              size="md"
              className="px-6 py-3 text-xs uppercase tracking-wider font-bold"
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
