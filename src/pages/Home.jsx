import React from 'react'
import Hero from '../components/home/Hero'
import AboutPreview from '../components/home/AboutPreview'
import ServicesPreview from '../components/home/ServicesPreview'
import Stats from '../components/home/Stats'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Industries from '../components/home/Industries'
import Testimonials from '../components/home/Testimonials'
import CTA from '../components/home/CTA'

export const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <Stats />
      <WhyChooseUs />
      <Industries />
      <Testimonials />
      <CTA />
    </div>
  )
}

export default Home
