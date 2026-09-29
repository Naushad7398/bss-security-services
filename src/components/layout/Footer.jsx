import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Phone, Mail, MapPin, CheckCircle } from 'lucide-react'
import Container from '../common/Container'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-amber-500 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20">
                <Shield className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-lg font-bold tracking-wider text-white">
                BSS <span className="text-amber-400">SURAKSHA</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              BSS Suraksha Services Pvt. Ltd. provides professional security guarding, surveillance management, and specialized protection solutions.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium">
              <CheckCircle className="w-4 h-4" />
              <span>Professional Security Solutions</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Company</Link></li>
              <li><Link to="/services" className="hover:text-amber-400 transition-colors">Security Services</Link></li>
              <li><Link to="/industries" className="hover:text-amber-400 transition-colors">Industries Served</Link></li>
              <li><Link to="/careers" className="hover:text-amber-400 transition-colors">Careers & Recruitment</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
              Key Services
            </h3>
            <ul className="space-y-2 text-xs">
              <li>Manned Guarding & Patrol</li>
              <li>Executive & VIP Protection</li>
              <li>Electronic Surveillance & CCTV</li>
              <li>Event Security & Crowd Control</li>
              <li>Corporate Risk & Audit</li>
              <li>Cash in Transit Logistics</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
              Corporate Office
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>[Company Address]</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>contact@example.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {currentYear} BSS Security Services Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Sitemap</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer