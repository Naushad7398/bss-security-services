import React from 'react'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import Button from '../common/Button'
import { industries } from '../../data/industries'
import { Building2, ArrowRight } from 'lucide-react'

export const Industries = () => {
  return (
    <section className="py-16 lg:py-24 bg-slate-900/40 border-b border-slate-800">
      <Container>
        <SectionTitle
          subtitle="Sectors We Protect"
          title="Industries We Serve"
          description="Customized security solutions designed to address the unique risk profile of each industry sector."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className="p-6 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-colors"
            >
              <div className="w-10 h-10 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{ind.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{ind.description}</p>
              <Button to="/industries" variant="ghost" size="sm" className="px-0 text-amber-400 hover:text-amber-300">
                Learn More <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Industries
