import React from 'react'
import Container from '../common/Container'
import Button from '../common/Button'
import { ShieldCheck, ArrowRight } from 'lucide-react'

export const CTA = () => {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-white via-amber-50/25 to-slate-50 border-y border-slate-200 text-slate-900 relative overflow-hidden">
      {/* Subtle ambient gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-amber-50 text-amber-700 mb-2 border border-amber-200/90 shadow-xs">
            <ShieldCheck className="w-9 h-9" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950">
            Ready to Upgrade Your Security Standards?
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Schedule a comprehensive site security audit with our senior security consultants and receive an enterprise-grade protection proposal.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button
              to="/contact"
              variant="primary"
              size="lg"
              className="px-8 py-4 font-black uppercase text-xs tracking-wider shadow-lg shadow-amber-500/25 group rounded-xl"
            >
              <span>Request a Site Audit</span>
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            <Button
              to="/services"
              variant="secondary"
              size="lg"
              className="px-8 py-4 font-bold uppercase text-xs tracking-wider rounded-xl"
            >
              Explore All Solutions
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CTA
