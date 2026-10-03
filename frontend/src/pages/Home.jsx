import React from 'react'
import Hero from '../components/home/Hero'
import AboutPreview from '../components/home/AboutPreview'
import ServicesPreview from '../components/home/ServicesPreview'
import Facts from '../components/home/Facts'
import CareersPreview from '../components/home/CareersPreview'
import Technology from '../components/home/Technology'
import NewsPreview from '../components/home/NewsPreview'
import CTA from '../components/home/CTA'

export const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <Facts />
      <CareersPreview />
      <Technology />
      <NewsPreview />
      <CTA />
    </div>
  )
}

export default Home

