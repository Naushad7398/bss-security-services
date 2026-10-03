import React, { useState } from 'react'
import Container from '../components/common/Container'
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { contactApi } from '../services/api'

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceRequired: 'Manned Guarding',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [successData, setSuccessData] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMessage('')
    setSuccessData(null)

    try {
      const response = await contactApi.submitQuery({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.serviceRequired,
        message: formData.message.trim(),
      })
      setSuccessData(response)
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceRequired: 'Manned Guarding',
        message: '',
      })
    } catch (err) {
      setErrorMessage(
        err.message || 'Failed to submit consultation request. Please try again or call our 24/7 helpline.'
      )
    } finally {
      setSubmitting(false)
    }
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
          {/* Left Column: Headquarters & Assistance */}
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-5 border-l-4 border-amber-500 pl-3">
                Corporate Headquarters
              </h3>
              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    499D, Andheryari Bagh, Surajkund Colony, Gorakhnath, Gorakhpur, Uttar Pradesh - 273015
                  </span>
                </div>
                <div className="flex items-center gap-3.5">
                  <Phone className="w-5 h-5 text-amber-600 shrink-0" />
                  <span className="font-semibold">Toll-Free Helpline: +91 96641 54689</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <Mail className="w-5 h-5 text-amber-600 shrink-0" />
                  <span className="font-semibold">Official Email: bsssuraksha@gmail.com</span>
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

          {/* Right Column: Request Form */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md">
            <h3 className="text-2xl font-black text-slate-900 mb-6">Request a Security Consultation</h3>

            {/* Success notification */}
            {successData && (
              <div className="p-5 mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs leading-relaxed space-y-2">
                <div className="flex items-center gap-2 font-black text-sm text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Enquiry Registered Successfully</span>
                </div>
                <p>
                  Thank you, <span className="font-bold">{successData.name}</span>. Your security consultation enquiry{' '}
                  <span className="font-mono font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                    #CQ-{String(successData.id).padStart(3, '0')}
                  </span>{' '}
                  has been routed to our operations command desk. A senior security deployment manager will connect with you shortly.
                </p>
              </div>
            )}

            {/* Error notification */}
            {errorMessage && (
              <div className="p-4 mb-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
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
                    Phone Number <span className="text-rose-500">*</span>
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
                    Email Address <span className="text-rose-500">*</span>
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
                  <option value="Physical Security & Manned Guarding">Physical Security & Manned Guarding</option>
                  <option value="Executive & VIP Protection">Executive & VIP Protection</option>
                  <option value="Electronic Surveillance & CCTV">Electronic Surveillance & CCTV</option>
                  <option value="Event Security Management">Event Security Management</option>
                  <option value="Corporate Risk & Security Audit">Corporate Risk & Security Audit</option>
                  <option value="Cash in Transit & Valuables">Cash in Transit & Valuables</option>
                  <option value="Other Security Solution">Other Security Solution</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Premises / Requirement Details <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Provide brief details about your premises, location, or security needs..."
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors"
                  required
                ></textarea>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={submitting}
                  className="w-full justify-center py-3.5 text-sm font-black uppercase tracking-wider disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  <span>{submitting ? 'Submitting Consultation...' : 'Submit Consultation Request'}</span>
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
