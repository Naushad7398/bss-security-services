import React from 'react'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import Button from '../common/Button'
import { Award, CheckCircle2 } from 'lucide-react'

export const AboutPreview = () => {
  return (
    <section className="py-16 lg:py-24 bg-slate-900/60 border-b border-slate-800">
      <Container>
        <SectionTitle
          subtitle="About BSS"
          title="Setting Benchmarks in Professional Vigilance"
          description="BSS Suraksha Services Pvt. Ltd. delivers professional security personnel, surveillance management, and disciplined protective services tailored to client requirements."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-8">
          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              We operate with structured standard operating procedures, regular background verifications, ongoing training curriculums, and round-the-clock coordination to safeguard our clients across diverse environments.
            </p>
            <ul className="space-y-2 text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Statutory & Regulatory Compliance</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Experienced Operational Management</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>24/7 Security Coordination & Rapid Response</span>
              </li>
            </ul>
            <div className="pt-2">
              <Button to="/about" variant="outline" size="md">
                Learn More About Us
              </Button>
            </div>
          </div>

          <div className="bg-slate-950 p-8 rounded-lg border border-slate-800 text-center">
            <Award className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Committed to Safety</h3>
            <p className="text-slate-400 text-xs">
              Personnel undergo thorough background screening and structured on-site training to ensure reliable service delivery.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default AboutPreview