import React from 'react'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import Button from '../common/Button'
import { industries } from '../../data/industries'
import { Building2, ArrowRight } from 'lucide-react'

export const Industries = () => {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <Container>
        <SectionTitle
          subtitle="Sectors We Safeguard"
          title="Industries We Serve"
          description="Customized security blueprints tailored to match the unique compliance and risk profile of each industry sector."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className="p-7 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/80 hover:shadow-lg transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-slate-950 transition-all duration-200 shadow-xs">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {ind.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {ind.description}
                </p>
              </div>
              <div>
                <Button to="/industries" variant="ghost" size="sm" className="px-0 text-amber-700 hover:text-amber-800 font-bold">
                  Sector Solutions <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Industries
