import React from 'react'
import Container from '../components/common/Container'
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import { industries } from '../data/industries'
import { Building2, ArrowRight } from 'lucide-react'

export const Industries = () => {
  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24">
      <Container>
        <SectionTitle
          subtitle="Sectors & Verticals"
          title="Industries We Protect"
          description="Every sector presents distinctive security challenges. BSS customizes deployment SOPs for each client environment."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className="p-8 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
            >
              <div>
                <div className="w-12 h-12 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{ind.name}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {ind.description}
                </p>
              </div>

              <div>
                <Button to="/contact" variant="outline" size="sm" className="w-full justify-center">
                  Request Solution <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Industries
