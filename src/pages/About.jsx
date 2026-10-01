import React from 'react'
import Container from '../components/common/Container'
import SectionTitle from '../components/common/SectionTitle'
import { Shield, Target, Eye, Award, CheckCircle2 } from 'lucide-react'

export const About = () => {
  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-slate-50 min-h-screen">
      <Container>
        <SectionTitle
          subtitle="Corporate Profile & Philosophy"
          title="About BSS Suraksha Services Pvt. Ltd."
          description="A premier security management enterprise modeled after India's industry leaders, committed to delivering disciplined guarding, electronic surveillance, and risk mitigation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#c23235] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-[#c23235] flex items-center justify-center mb-5 border border-red-100">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To be India's most dependable and respected security solutions provider, recognized for operational integrity, modern ManTech integration, and exemplary service reliability.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#c23235] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-[#c23235] flex items-center justify-center mb-5 border border-red-100">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To protect our clients' assets, personnel, and infrastructure through disciplined execution, proactive vigilance, strict statutory compliance, and technology-empowered teams.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-md text-center max-w-3xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#c23235] flex items-center justify-center mx-auto mb-4 border border-red-100">
            <Shield className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-bold text-slate-900 mb-3">Leadership & Operational Excellence</h4>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto mb-6">
            Led by seasoned security management professionals and defense veterans, BSS Suraksha adheres strictly to PSARA regulations, labor safety laws, and structured on-site supervision.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#c23235] shrink-0" />
              <span>PSARA Certified Protocols</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#c23235] shrink-0" />
              <span>Multi-Level Background Checks</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#c23235] shrink-0" />
              <span>24/7 Operations Desk</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default About
