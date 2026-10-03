import React from 'react'
import Container from '../components/common/Container'
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import { Briefcase, ShieldCheck } from 'lucide-react'

export const Careers = () => {
  const openings = [
    {
      role: 'Security Guards (Male & Female)',
      location: 'Multiple Locations Across India',
      qualification: '10th / 12th Pass, Physical Fitness Standards',
      type: 'Full Time',
    },
    {
      role: 'Security Field Supervisor',
      location: 'Regional Hubs & Metro Branches',
      qualification: 'Graduate / Relevant Security Experience Preferred',
      type: 'Full Time',
    },
    {
      role: 'CCTV & Control Room Operator',
      location: 'Central Monitoring Command Station',
      qualification: 'Technical certification / Surveillance monitoring experience',
      type: 'Shift Basis',
    },
    {
      role: 'Armed Security Officer (PSO)',
      location: 'Corporate HQ & VIP Escorts',
      qualification: 'Valid Arms License & Certified Defense/Security Background',
      type: 'Full Time',
    },
  ]

  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-slate-50 min-h-screen">
      <Container>
        <SectionTitle
          subtitle="Join India's Disciplined Security Force"
          title="Careers at BSS Suraksha Services"
          description="Build an honorable and rewarding career with a disciplined, professionally run security organization that values its workforce."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
          {openings.map((job, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-amber-500/80 hover:shadow-md transition-all duration-200"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-slate-900">{job.role}</h3>
                  <span className="text-xs bg-amber-50 text-amber-900 px-2.5 py-1 rounded-md border border-amber-200 font-extrabold">
                    {job.type}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-2 font-medium">📍 Location: {job.location}</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  <strong className="text-slate-800">Eligibility:</strong> {job.qualification}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Button to="/contact" variant="outline" size="sm" className="w-full justify-center">
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-amber-200/80 shadow-md text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <h4 className="text-xl font-black text-slate-900 mb-2">Fair Employment & Benefits</h4>
          <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
            Like India's top security institutions, we provide 100% on-time statutory compensation, PF & ESIC coverage, uniforms, lodging support, and clear promotion pathways for dedicated personnel.
          </p>
        </div>
      </Container>
    </div>
  )
}

export default Careers
