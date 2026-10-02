import React, { useState } from 'react'
import Container from '../components/common/Container'
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react'

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceRequired: 'Manned Guarding',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting contact form data:', formData)
    alert('Thank you for contacting BSS Security Services. Our operations desk will connect with you shortly.')
  }

  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-slate-50 min-h-screen">
      <Container>
        <SectionTitle
          subtitle="Direct Corporate Communication"
          title="Contact BSS Suraksha Services"
          description="Speak directly with our security deployment specialists or schedule an on-site safety and vulnerability assessment."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-5 border-l-4 border-amber-500 pl-3">
                Corporate Headquarters
              </h3>
              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Headquarters & Central Operations Desk, India
                  </span>
                </div>
                <div className="flex items-center gap-3.5">
                  <Phone className="w-5 h-5 text-amber-600 shrink-0" />
                  <span className="font-semibold">Toll-Free Helpline: +91 1800-890-BSS</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <Mail className="w-5 h-5 text-amber-600 shrink-0" />
                  <span className="font-semibold">Official Email: contact@bsssuraksha.com</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>24/7 Rapid Incident Command Desk</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-slate-900 font-bold text-sm">24/7 Security Assistance</h4>
                <p className="text-slate-600 text-xs mt-0.5">
                  Our operational control centers monitor, log, and coordinate real-time responses round the clock.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md">
            <h3 className="text-2xl font-black text-slate-900 mb-6">Request a Security Consultation</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Service Vertical Required
                </label>
                <select
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors"
                >
                  <option value="Manned Guarding">Physical Security & Manned Guarding</option>
                  <option value="Executive Protection">Executive & VIP Protection</option>
                  <option value="Electronic Surveillance">Electronic Surveillance & CCTV</option>
                  <option value="Event Security">Event Security Management</option>
                  <option value="Corporate Investigation">Corporate Risk & Security Audit</option>
                  <option value="Cash Logistics">Cash in Transit & Valuables</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Premises / Requirement Details
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Provide brief details about your premises, location, or security needs..."
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors"
                ></textarea>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full justify-center py-3.5 text-sm font-black uppercase tracking-wider">
                  Submit Consultation Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Contact
