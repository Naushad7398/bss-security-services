import React from 'react'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import { testimonials } from '../../data/testimonials'
import { Star, Quote } from 'lucide-react'

export const Testimonials = () => {
  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <Container>
        <SectionTitle
          subtitle="Client Confidence"
          title="What Our Partners Say"
          description="Hear from enterprise operations heads, facility directors, and commercial estate managers who count on BSS Suraksha."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-[#c23235]/40 mb-3" />
                <p className="text-slate-700 text-sm italic mb-6 leading-relaxed">
                  "{item.feedback}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex gap-1 text-amber-500 mb-2">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="font-bold text-slate-900 text-sm">{item.clientName}</div>
                <div className="text-xs text-slate-500 font-medium">
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
