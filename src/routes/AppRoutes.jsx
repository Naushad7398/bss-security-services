import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Services from '../pages/Services'
import Industries from '../pages/Industries'
import Careers from '../pages/Careers'
import Contact from '../pages/Contact'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/industries" element={<Industries />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default AppRoutes
