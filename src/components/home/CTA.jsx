import React from 'react'
import Container from '../common/Container'
import Button from '../common/Button'
import { ShieldCheck, ArrowRight } from 'lucide-react'

export const CTA = () => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-[#9e1d23] via-[#c23235] to-[#8c1216] text-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex p-3 rounded-full bg-white/10 text-white mb-2 backdrop-blur-sm border border-white/20">
            <ShieldCheck className="w-9 h-9" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Ready to Upgrade Your Security Standards?
          </h2>

          <p className="text-red-100 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Schedule a comprehensive site security audit with our senior security consultants and receive an enterprise-grade protection proposal.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-3">
            <Button
              to="/contact"
              variant="white"
              size="lg"
              className="px-7 py-3.5 font-extrabold uppercase text-xs tracking-wider shadow-xl group cursor-pointer"
            >
              <span className="text-[#c23235]">Request a Site Audit</span>
              <ArrowRight className="w-4 h-4 ml-1.5 text-[#c23235] transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            <Button
              to="/services"
              variant="outlineWhite"
              size="lg"
              className="px-7 py-3.5 font-bold uppercase text-xs tracking-wider"
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
