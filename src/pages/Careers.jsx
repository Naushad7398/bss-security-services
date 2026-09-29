import React from 'react'
import Container from '../components/common/Container'
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import { Briefcase, ShieldCheck } from 'lucide-react'

export const Careers = () => {
  const openings = [
    {
      role: 'Security Guards (Male & Female)',
      location: 'Multiple Locations',
      qualification: '10th / 12th Pass, Physical Fitness Standards',
      type: 'Full Time',
    },
    {
      role: 'Security Field Supervisor',
      location: 'Regional Hubs',
      qualification: 'Graduate / Relevant Security Experience Preferred',
      type: 'Full Time',
    },
    {
      role: 'CCTV & Control Room Operator',
      location: 'Central Monitoring Station',
      qualification: 'Technical certification / Surveillance monitoring experience',
      type: 'Shift Basis',
    },
    {
      role: 'Armed Security Officer (PSO)',
      location: 'Corporate HQ & VIP Escorts',
      qualification: 'Valid Arms License & Certified Security Background',
      type: 'Full Time',
    },
  ]

  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24">
      <Container>
        <SectionTitle
          subtitle="Join Our Force"
          title="Careers at BSS Suraksha Services"
          description="Build a rewarding career with a disciplined and growth-oriented security organization."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
          {openings.map((job, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white">{job.role}</h3>
                  <span className="text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded border border-amber-500/20">
                    {job.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-2">Location: {job.location}</p>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Eligibility: {job.qualification}
                </p>
              </div>

              <div>
                <Button to="/contact" variant="outline" size="sm">
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-950 p-8 rounded-lg border border-slate-800 text-center max-w-2xl mx-auto">
          <ShieldCheck className="w-10 h-10 text-amber-400 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-white mb-2">Fair Employment & Benefits</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            We provide on-time compensation, statutory compliance, continuous training programs, and career growth opportunities.
          </p>
        </div>
      </Container>
    </div>
  )
}

export default Careers