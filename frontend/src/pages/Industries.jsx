import React from 'react'
import Container from '../components/common/Container'
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import { industries } from '../data/industries'
import { Building2, ArrowRight } from 'lucide-react'

export const Industries = () => {
  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-slate-50 min-h-screen">
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
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-amber-500/80 hover:shadow-xl transition-all duration-200 group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-slate-950 transition-all duration-200 shadow-xs">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-700 transition-colors">
                  {ind.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {ind.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
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
