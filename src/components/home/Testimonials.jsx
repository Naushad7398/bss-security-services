import React from 'react'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import { testimonials } from '../../data/testimonials'
import { Star, Quote } from 'lucide-react'

export const Testimonials = () => {
  return (
    <section className="py-16 lg:py-24 bg-slate-950 border-b border-slate-800">
      <Container>
        <SectionTitle
          subtitle="Client Trust"
          title="What Our Partners Say"
          description="Hear from enterprise operations leaders and facility directors who rely on BSS Security Services daily."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-lg bg-slate-900/40 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-amber-500/30 mb-3" />
                <p className="text-slate-300 text-sm italic mb-6 leading-relaxed">
                  "{item.feedback}"
                </p>
              </div>

              <div>
                <div className="flex gap-1 text-amber-400 mb-2">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="font-semibold text-white text-sm">{item.clientName}</div>
                <div className="text-xs text-slate-400">
                  {item.designation}, {item.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Testimonials
