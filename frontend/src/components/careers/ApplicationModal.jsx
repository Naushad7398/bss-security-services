import React, { useState, useEffect } from 'react'
import { X, Upload, AlertCircle, CheckCircle2, Loader2, Shield, FileText } from 'lucide-react'
import Button from '../common/Button'
import { applicationsApi } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx']

export const ApplicationModal = ({ job, isOpen, onClose }) => {
  const { user, isAdmin } = useAuth()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: '',
    coverLetter: '',
  })
  const [resumeFile, setResumeFile] = useState(null)
  const [validationErrors, setValidationErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successResponse, setSuccessResponse] = useState(null)

  // Initialize or prefill fields with authenticated user data
  useEffect(() => {
    if (job && isOpen) {
      setFormData({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        education: '',
        experience: job.experience || '',
        skills: '',
        coverLetter: '',
      })
      setResumeFile(null)
      setValidationErrors({})
      setError('')
      setSuccessResponse(null)
    }
  }, [job, isOpen, user])

  if (!isOpen || !job) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }))
    }
    if (error) setError('')
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()

    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setValidationErrors((prev) => ({
        ...prev,
        resume: 'Invalid format. Only PDF, DOC, or DOCX files are accepted.',
      }))
      setResumeFile(null)
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setValidationErrors((prev) => ({
        ...prev,
        resume: 'File size exceeds the 5MB limit. Please upload a smaller file.',
      }))
      setResumeFile(null)
      return
    }

    setResumeFile(file)
    setValidationErrors((prev) => ({ ...prev, resume: '' }))
    if (error) setError('')
  }

  const validate = () => {
    const errors = {}

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required'
    } else if (formData.fullName.trim().length > 150) {
      errors.fullName = 'Full name must not exceed 150 characters'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address'
    } else if (formData.email.trim().length > 150) {
      errors.email = 'Email must not exceed 150 characters'
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required'
    } else if (formData.phone.trim().length > 20) {
      errors.phone = 'Phone number must not exceed 20 characters'
    }

    if (!formData.education.trim()) {
      errors.education = 'Highest education/qualification is required'
    } else if (formData.education.trim().length > 255) {
      errors.education = 'Education must not exceed 255 characters'
    }

    if (!formData.experience.trim()) {
      errors.experience = 'Experience summary is required'
    } else if (formData.experience.trim().length > 255) {
      errors.experience = 'Experience must not exceed 255 characters'
    }

    if (!resumeFile) {
      errors.resume = 'Resume file (PDF, DOC, or DOCX) is required'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setError('')

    try {
      // Build FormData payload strictly matching backend CreateApplicationRequest
      const data = new FormData()
      data.append('fullName', formData.fullName.trim())
      data.append('email', formData.email.trim().toLowerCase())
      data.append('phone', formData.phone.trim())
      data.append('education', formData.education.trim())
      data.append('experience', formData.experience.trim())

      if (formData.skills?.trim()) {
        data.append('skills', formData.skills.trim())
      }
      if (formData.coverLetter?.trim()) {
        data.append('coverLetter', formData.coverLetter.trim())
      }
      data.append('resume', resumeFile)

      const response = await applicationsApi.apply(job.id, data)
      setSuccessResponse(response)
    } catch (err) {
      if (err.status === 409) {
        setError('You have already applied for this position.')
      } else if (err.status === 403) {
        setError('Only registered applicants can submit job applications.')
      } else {
        setError(err.message || 'Application submission failed. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#0a192f] text-white px-6 sm:px-8 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 id="application-modal-title" className="text-base sm:text-lg font-black tracking-wide text-white">
                Apply for Position
              </h2>
              <p className="text-xs text-amber-400 font-semibold">{job.title}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close application modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[calc(85vh-80px)] overflow-y-auto">
          {/* Admin Warning Guard */}
          {isAdmin ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Administrator Access Detected</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                Administrator accounts cannot submit candidate applications. Please switch to an applicant account to apply, or manage jobs from the Admin portal.
              </p>
              <div className="flex justify-center gap-3">
                <Button onClick={onClose} variant="secondary" size="md">
                  Close
                </Button>
                <Button to="/admin" variant="primary" size="md">
                  Go to Admin Portal
                </Button>
              </div>
            </div>
          ) : successResponse ? (
            /* Success Confirmation View */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Application Submitted!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-4">
                Your application for <strong className="text-slate-900">{job.title}</strong> has been received by our recruitment desk.
              </p>
              {successResponse.id && (
                <div className="inline-block bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-700 font-semibold mb-6">
                  Application Reference: #{successResponse.id}
                </div>
              )}
              <div className="flex justify-center">
                <Button onClick={onClose} variant="primary" size="md">
                  Done
                </Button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Error Banner */}
              {error && (
                <div
                  role="alert"
                  className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{error}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  disabled={submitting}
                  className={`w-full px-4 py-2.5 rounded-lg bg-slate-50 border text-slate-900 text-sm focus:outline-none transition-colors ${
                    validationErrors.fullName
                      ? 'border-red-400 focus:border-red-500 ring-1 ring-red-500/20'
                      : 'border-slate-300 focus:border-amber-500'
                  }`}
                />
                {validationErrors.fullName && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{validationErrors.fullName}</p>
                )}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    disabled={submitting}
                    className={`w-full px-4 py-2.5 rounded-lg bg-slate-50 border text-slate-900 text-sm focus:outline-none transition-colors ${
                      validationErrors.email
                        ? 'border-red-400 focus:border-red-500 ring-1 ring-red-500/20'
                        : 'border-slate-300 focus:border-amber-500'
                    }`}
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{validationErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 9876543210"
                    disabled={submitting}
                    className={`w-full px-4 py-2.5 rounded-lg bg-slate-50 border text-slate-900 text-sm focus:outline-none transition-colors ${
                      validationErrors.phone
                        ? 'border-red-400 focus:border-red-500 ring-1 ring-red-500/20'
                        : 'border-slate-300 focus:border-amber-500'
                    }`}
                  />
                  {validationErrors.phone && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{validationErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* Education & Experience Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Highest Education *
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="e.g. 12th Pass / Graduate"
                    disabled={submitting}
                    className={`w-full px-4 py-2.5 rounded-lg bg-slate-50 border text-slate-900 text-sm focus:outline-none transition-colors ${
                      validationErrors.education
                        ? 'border-red-400 focus:border-red-500 ring-1 ring-red-500/20'
                        : 'border-slate-300 focus:border-amber-500'
                    }`}
                  />
                  {validationErrors.education && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{validationErrors.education}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Relevant Experience *
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 2 years security / Fresher"
                    disabled={submitting}
                    className={`w-full px-4 py-2.5 rounded-lg bg-slate-50 border text-slate-900 text-sm focus:outline-none transition-colors ${
                      validationErrors.experience
                        ? 'border-red-400 focus:border-red-500 ring-1 ring-red-500/20'
                        : 'border-slate-300 focus:border-amber-500'
                    }`}
                  />
                  {validationErrors.experience && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{validationErrors.experience}</p>
                  )}
                </div>
              </div>

              {/* Key Skills */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Key Skills (Optional)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. CCTV, Access Control, Fire Safety, First Aid"
                  disabled={submitting}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Cover Letter / Note (Optional)
                </label>
                <textarea
                  name="coverLetter"
                  rows={3}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Briefly state why you are well suited for this role..."
                  disabled={submitting}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-amber-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Resume File Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Upload Resume / CV * (PDF, DOC, DOCX — Max 5MB)
                </label>
                <div
                  className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors ${
                    validationErrors.resume
                      ? 'border-red-400 bg-red-50/40'
                      : resumeFile
                      ? 'border-amber-500 bg-amber-50/30'
                      : 'border-slate-300 hover:border-amber-400 bg-slate-50/50'
                  }`}
                >
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    disabled={submitting}
                    className="hidden"
                  />
                  <label htmlFor="resume" className="cursor-pointer flex flex-col items-center gap-1.5">
                    {resumeFile ? (
                      <>
                        <FileText className="w-8 h-8 text-amber-600" />
                        <span className="text-xs font-bold text-slate-900">{resumeFile.name}</span>
                        <span className="text-[11px] text-slate-500">
                          {(resumeFile.size / 1024 / 1024).toFixed(2)} MB — Click to change
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-7 h-7 text-slate-400" />
                        <span className="text-xs font-bold text-amber-700">Choose resume file</span>
                        <span className="text-[11px] text-slate-500">Supported formats: PDF, DOC, DOCX up to 5MB</span>
                      </>
                    )}
                  </label>
                </div>
                {validationErrors.resume && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{validationErrors.resume}</p>
                )}
              </div>

              {/* Submit / Cancel Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <Button type="button" onClick={onClose} variant="ghost" size="md" disabled={submitting}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md" disabled={submitting}>
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Application...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApplicationModal
