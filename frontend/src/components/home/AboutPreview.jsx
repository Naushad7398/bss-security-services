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
            <p className="text-base text-slate-900 font-semibold">
              Founded on the values of विश्वास (Trust), समर्पण (Dedication), and सुरक्षा (Protection), we integrate structured SOPs, strict defense vetting, and round-the-clock coordination.
            </p>
            <ul className="space-y-2.5 text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="font-medium">100% Statutory & PSARA Regulatory Compliance</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="font-medium">Ex-Defense & Experienced Security Management</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="font-medium">24/7 Central Control Room Coordination & Rapid Emergency Dispatch</span>
              </li>
            </ul>
            <div className="pt-3">
              <Button to="/about" variant="outline" size="md">
                Learn More About Our Company
              </Button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-amber-200/90 shadow-md text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Award className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Committed to Enterprise Safety</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
              Every personnel undergoes rigorous physical drills, background clearance verification, and continuous emergency response certifications.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Certified Guarding Protocols</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default AboutPreview
