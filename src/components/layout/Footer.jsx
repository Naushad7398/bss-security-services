import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Phone, Mail, MapPin, CheckCircle, ShieldCheck } from 'lucide-react'
import Container from '../common/Container'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0f172a] border-t-4 border-[#c23235] text-slate-300 text-sm">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#c23235] flex items-center justify-center text-white shadow-md shadow-red-900/30">
                <Shield className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-lg font-bold tracking-wider text-white">
                BSS <span className="text-[#c23235]">SURAKSHA</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              BSS Suraksha Services Pvt. Ltd. delivers industry-benchmarked security guarding, electronic surveillance management, and enterprise safety operations across India.
            </p>
            <div className="flex items-center gap-2 text-xs text-red-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#c23235]" />
              <span>PSARA & Statutory Compliant</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-sm tracking-wider uppercase border-l-2 border-[#c23235] pl-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-red-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-red-400 transition-colors">About Company</Link></li>
              <li><Link to="/services" className="hover:text-red-400 transition-colors">Security Solutions</Link></li>
              <li><Link to="/industries" className="hover:text-red-400 transition-colors">Industries Protected</Link></li>
              <li><Link to="/careers" className="hover:text-red-400 transition-colors">Careers & Recruitment</Link></li>
              <li><Link to="/contact" className="hover:text-red-400 transition-colors">Contact Corporate Desk</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-sm tracking-wider uppercase border-l-2 border-[#c23235] pl-2">
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
            <h3 className="text-white font-bold mb-4 text-sm tracking-wider uppercase border-l-2 border-[#c23235] pl-2">
              Corporate Desk
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c23235] shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-relaxed">
                  Headquarters & Central Operations Desk, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c23235] shrink-0" />
                <span>+91 1800-890-BSS (24/7 Helpline)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c23235] shrink-0" />
                <span>contact@bsssuraksha.com</span>
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
