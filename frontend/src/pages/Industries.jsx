import React from 'react'
import Container from '../components/common/Container'
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import { industries } from '../data/industries'
import { Building2, ArrowRight } from 'lucide-react'

const industryImages = [
  '/2599c8df-31a6-45c3-aa82-a6fef236e686.png',
  '/09c69507-5027-450b-86c9-711d31372e55.png',
  '/bcb58afc-eaff-4b29-9ca2-d9be90803fbb.png',
  '/d2541b84-f213-4d18-8292-cea61d24ee5a.png',
  '/3d0055a4-a514-4f1c-a123-8cf3410bd6e9.png',
  '/fd0fbdde-6e3e-4872-8ff8-7e45cd3022bb.png',
]

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
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.18) 0%, rgba(15, 23, 42, 0.82) 100%), url("${industryImages[ind.id - 1]}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-slate-950 transition-all duration-200 shadow-xs">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                  {ind.name}
                </h3>
                <p className="text-sm text-white leading-relaxed mb-6">
                  {ind.description}
                </p>
              </div>

              <div className="pt-4 border-t border-amber-200/50">
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
