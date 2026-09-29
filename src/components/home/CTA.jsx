import React from 'react'
import Container from '../common/Container'
import Button from '../common/Button'
import { ShieldCheck, ArrowRight } from 'lucide-react'

export const CTA = () => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-amber-600/10 via-slate-900 to-amber-600/10 border-b border-slate-800">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-400 mb-2">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Upgrade Your Security Standards?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Schedule a comprehensive site security assessment with our senior security consultants and receive a tailored vigilance proposal.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button to="/contact" variant="primary" size="lg">
              Request a Site Audit
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button to="/services" variant="outline" size="lg">
              Explore All Services
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CTA
