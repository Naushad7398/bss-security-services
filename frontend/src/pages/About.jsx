import React from 'react'
import Container from '../components/common/Container'
import SectionTitle from '../components/common/SectionTitle'
import { Shield, Target, Eye, CheckCircle2 } from 'lucide-react'

export const About = () => {
  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-slate-50 min-h-screen">
      <Container>
        <SectionTitle
          subtitle="Corporate Profile & Philosophy"
          title="About BSS Suraksha Services Pvt. Ltd."
          description="A premier security management enterprise committed to delivering disciplined guarding, electronic surveillance, and risk mitigation across India."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div
            className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-amber-500/80 transition-colors"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.18) 0%, rgba(15, 23, 42, 0.82) 100%), url("/35ec1218-7430-42af-8087-49445c335e68.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-5 border border-amber-200">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-sm text-white leading-relaxed">
              To be India's most dependable and respected security solutions provider, recognized for operational integrity, modern ManTech integration, and exemplary service reliability.
            </p>
          </div>

          <div
            className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-amber-500/80 transition-colors"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.18) 0%, rgba(15, 23, 42, 0.82) 100%), url("/3e7bbedf-d371-4809-bb75-4972b4b8e419.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-5 border border-amber-200">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-sm text-white leading-relaxed">
              To protect our clients' assets, personnel, and infrastructure through disciplined execution, proactive vigilance, strict statutory compliance, and technology-empowered teams.
            </p>
          </div>
        </div>

        <div
          className="bg-white p-8 sm:p-10 rounded-3xl border border-amber-200/80 shadow-md text-center max-w-3xl mx-auto"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.18) 0%, rgba(15, 23, 42, 0.82) 100%), url("/923ecd33-d151-4137-9434-d60406259406.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <Shield className="w-9 h-9" />
          </div>
          <h4 className="text-2xl font-black text-white mb-3">Leadership & Operational Excellence</h4>
          <p className="text-sm sm:text-base text-white leading-relaxed max-w-xl mx-auto mb-6">
            Led by seasoned security management professionals and defense veterans, BSS Suraksha adheres strictly to PSARA regulations, labor safety laws, and structured on-site supervision.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-amber-200/50 text-left">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span>PSARA Certified Protocols</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Multi-Level Background Checks</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span>24/7 Operations Desk</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default About
