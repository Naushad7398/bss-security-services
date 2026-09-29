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
    // Ready for Spring Boot REST API integration: POST /api/v1/contact
    console.log('Submitting contact form data:', formData)
    alert('Thank you for contacting BSS Security Services. Our operations desk will connect with you shortly.')
  }

  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24">
      <Container>
        <SectionTitle
          subtitle="Get in Touch"
          title="Contact BSS Suraksha Services"
          description="Speak with our security deployment specialists or request an on-site security assessment."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-slate-900 border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4">Corporate Office</h3>
              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>[Company Address]</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Phone: +91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Email: contact@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>24/7 Security Support & Response Desk</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-4">
              <ShieldCheck className="w-10 h-10 text-amber-400 shrink-0" />
              <div>
                <h4 className="text-white font-semibold text-sm">Security Assistance</h4>
                <p className="text-slate-400 text-xs">
                  Operational support desk available for client inquiries and service coordination.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-lg bg-slate-900 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6">Request a Security Consultation</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-2.5 rounded bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full px-4 py-2.5 rounded bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Service Required
                </label>
                <select
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
                >
                  <option value="Manned Guarding">Physical Security & Manned Guarding</option>
                  <option value="Executive Protection">Executive & VIP Protection</option>
                  <option value="Electronic Surveillance">Electronic Surveillance & CCTV</option>
                  <option value="Event Security">Event Security Management</option>
                  <option value="Corporate Investigation">Corporate Risk & Audit</option>
                  <option value="Cash Logistics">Cash in Transit & Valuables</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Requirement Details
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Provide brief details about your premises, location, or security needs..."
                  className="w-full px-4 py-2.5 rounded bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
                ></textarea>
              </div>

              <Button type="submit" variant="primary" className="w-full justify-center">
                Submit Consultation Request
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Contact