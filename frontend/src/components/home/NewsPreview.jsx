import React from 'react'
import { motion } from 'framer-motion'
import { Newspaper, ArrowRight, Calendar, FileText } from 'lucide-react'
import Container from '../common/Container'
import Button from '../common/Button'
import ImagePlaceholder from '../common/ImagePlaceholder'
import { siteImages } from '../../data/images'

export const NewsPreview = () => {
  const articles = [
    {
      category: 'Company Update',
      title: 'Operational Standards & Field Readiness',
      summary:
        'Official company updates, standard operating procedures, and service announcements will be published here.',
      image: siteImages.news[0],
      tag: 'Announcement',
    },
    {
      category: 'Security Insights',
      title: 'Key Considerations for Industrial Premises Protection',
      summary:
        'Practical security observations and perimeter management considerations for safeguarding commercial assets.',
      image: siteImages.news[1],
      tag: 'Best Practices',
    },
    {
      category: 'Industry Update',
      title: 'Integrated Surveillance & On-Site Vigilance Coordination',
      summary:
        'Exploring how electronic surveillance and manned security coordination enhance situational awareness.',
      image: siteImages.news[2],
      tag: 'Industry Trends',
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200 relative overflow-hidden">
      <Container className="relative z-10">
        {/* Header with Title and "View All Updates" button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-widest uppercase mb-4">
              <span>UPDATES & PERSPECTIVES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-4">
              News & Insights
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Operational updates, security advisories, and industry insights from BSS Suraksha Services.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              to="/about"
              variant="secondary"
              size="md"
              className="uppercase text-xs tracking-wider font-bold py-3 px-6 whitespace-nowrap"
            >
              <span>View All Updates</span>
            </Button>
          </div>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="group rounded-3xl bg-white border border-slate-200 hover:border-amber-500/80 shadow-sm hover:shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-200"
            >
              <div>
                {/* Image Placeholder */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-200">
                  <ImagePlaceholder
                    src={item.image}
                    alt={item.title}
                    label={item.category}
                    icon={FileText}
                    aspectRatio="aspect-[16/10]"
                    className="w-full h-full"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 border border-amber-200 shadow-sm text-amber-800 text-[11px] font-extrabold tracking-wider uppercase">
                    {item.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 uppercase tracking-wider font-bold mb-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Editorial Notice</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-amber-700 transition-colors mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Card Link */}
              <div className="p-6 sm:p-7 pt-0 border-t border-slate-100 mt-4">
                <div className="flex items-center justify-between pt-4">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Content Coming Soon
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default NewsPreview
