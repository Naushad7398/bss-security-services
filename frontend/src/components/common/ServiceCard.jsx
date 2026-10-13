import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const serviceImages = {
  'manned-guarding': '/d13a5f1d-fc0b-424c-8e4f-87f094ea3997.png',
  'corporate-industrial-security': '/655cb435-3ba5-45ad-8e22-af09915c935a.png',
  'event-security': '/8d191839-0001-4408-b7f1-688c2b8d800a.png',
  'cctv-surveillance': '/3715ab99-650f-4e65-b6b2-22cbcb8792fc.png',
  'executive-protection': '/d193dc9a-4c7a-474d-beee-76ce5d6a3df9.png',
  'security-risk-assessment': '/c5f6e92b-7436-4022-a87b-b5291729209b.png',
}

const ServiceCard = ({ service, IconComponent, action = 'learn' }) => {
  const isLearnMore = action === 'learn'

  return (
    <article className="group relative isolate flex min-h-[430px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0a192f] shadow-lg shadow-slate-950/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/25">
      <img
        src={serviceImages[service.slug]}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a192f]/20 via-[#0a192f]/65 to-[#061426]"
        aria-hidden="true"
      />

      <div className="flex h-full flex-1 flex-col p-7 sm:p-8">
        <div className="mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-200/80 bg-amber-50 text-amber-700 shadow-sm">
          <IconComponent className="h-6 w-6" />
        </div>

        <h3 className="mb-3 text-xl font-bold leading-tight text-white">
          {service.title}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-slate-200">
          {service.shortDescription}
        </p>

        <div className="border-t border-white/25 pt-4">
          {service.features && (
            <ul className="space-y-2.5 text-xs text-slate-100">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-auto border-t border-white/25 pt-5">
          {isLearnMore ? (
            <Link
              to="/services"
              className="group/link inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 transition-colors hover:text-amber-300"
            >
              <span>Learn More</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
            </Link>
          ) : (
            <Link
              to="/contact"
              className="group/link inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-amber-400/70 px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-amber-300 transition-colors hover:bg-amber-400 hover:text-slate-950"
            >
              <span>Enquire Service</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

export default ServiceCard
