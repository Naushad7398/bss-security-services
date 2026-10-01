import React from 'react'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import Button from '../common/Button'
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react'

export const AboutPreview = () => {
  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <Container>
        <SectionTitle
          subtitle="About BSS Suraksha"
          title="Setting Benchmarks in Professional Vigilance"
          description="BSS Suraksha Services Pvt. Ltd. delivers professionally trained security personnel, electronic surveillance management, and disciplined protective services across India."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-8">
          <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
            <p className="text-base text-slate-800 font-medium">
              Modeled after India's premier security enterprises, we combine structured standard operating procedures, regular background verifications, and round-the-clock coordination.
            </p>
            <ul className="space-y-2.5 text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#c23235] shrink-0" />
                <span className="font-medium">100% Statutory & PSARA Regulatory Compliance</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#c23235] shrink-0" />
                <span className="font-medium">Ex-Defense & Experienced Operational Management</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#c23235] shrink-0" />
                <span className="font-medium">24/7 Central Control Room Coordination & Emergency Response</span>
              </li>
            </ul>
            <div className="pt-3">
              <Button to="/about" variant="outline" size="md">
                Learn More About Our Company
              </Button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#c23235] flex items-center justify-center mx-auto mb-4 border border-red-100">
              <Award className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Committed to Enterprise Safety</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
              Every personnel undergoes comprehensive multi-tier background screening, physical conditioning, and structured fire & emergency training modules.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#c23235]" />
              <span>Certified Guarding Protocols</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default AboutPreview
