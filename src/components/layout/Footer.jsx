import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react'
import Container from '../common/Container'

// Import BSS logo from src/assets/images/
const logoModules = import.meta.glob('../../assets/images/logo.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
})
const bssLogoSrc = Object.values(logoModules)[0] || null

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0a192f] border-t-4 border-amber-500 text-slate-300 text-sm">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {bssLogoSrc ? (
                <img
                  src={bssLogoSrc}
                  alt="BSS Suraksha Crest"
                  className="h-11 w-auto object-contain filter drop-shadow-sm"
                />
              ) : (
                <div className="w-9 h-9 rounded bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-md">
                  <Shield className="w-5 h-5 stroke-[2.2]" />
                </div>
              )}
              <span className="text-lg font-black tracking-wider text-white">
                BSS <span className="text-amber-400">SURAKSHA</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              BSS Suraksha Services Pvt. Ltd. delivers industry-benchmarked security guarding, electronic surveillance management, and enterprise safety operations across India.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>PSARA & Statutory Compliant</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-sm tracking-wider uppercase border-l-2 border-amber-500 pl-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Company</Link></li>
              <li><Link to="/services" className="hover:text-amber-400 transition-colors">Security Solutions</Link></li>
              <li><Link to="/industries" className="hover:text-amber-400 transition-colors">Industries Protected</Link></li>
              <li><Link to="/careers" className="hover:text-amber-400 transition-colors">Careers & Recruitment</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Corporate Desk</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-sm tracking-wider uppercase border-l-2 border-amber-500 pl-2">
              Key Solutions
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>Manned Guarding & Perimeter Patrol</li>
              <li>Corporate & Industrial Facility Security</li>
              <li>CCTV & Electronic Monitoring Command</li>
              <li>Event Security & Crowd Logistics</li>
              <li>Executive & VIP Personal Protection</li>
              <li>Security Risk Audits & Compliance</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-sm tracking-wider uppercase border-l-2 border-amber-500 pl-2">
              Corporate Desk
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-relaxed">
                  499D, Andheryari Bagh, Surajkund Colony, Gorakhnath, Gorakhpur, Uttar Pradesh - 273015
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 96641 54689 (24/7 Helpline)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>bsssuraksha@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} BSS Suraksha Services Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Compliance Certifications</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
