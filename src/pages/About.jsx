import React from 'react'
import Container from '../components/common/Container'
import SectionTitle from '../components/common/SectionTitle'
import { Shield, Target, Eye } from 'lucide-react'

export const About = () => {
  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24">
      <Container>
        <SectionTitle
          subtitle="Corporate Profile"
          title="About BSS Suraksha Services Pvt. Ltd."
          description="A professional security management enterprise committed to delivering disciplined guarding, surveillance, and risk mitigation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="p-8 rounded-lg bg-slate-900 border border-slate-800">
            <div className="w-10 h-10 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              To be a dependable and respected security solutions provider, recognized for operational integrity, modern practices, and service reliability.
            </p>
          </div>

          <div className="p-8 rounded-lg bg-slate-900 border border-slate-800">
            <div className="w-10 h-10 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              To protect our clients' assets, personnel, and premises through disciplined execution, proactive vigilance, and full statutory compliance.
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-8 rounded-lg border border-slate-800 text-center max-w-2xl mx-auto">
          <Shield className="w-12 h-12 text-amber-400 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-white mb-2">Leadership & Experience</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            Led by seasoned security management professionals committed to operational discipline, customer safety, and statutory compliance.
          </p>
        </div>
      </Container>
    </div>
  )
}

export default About