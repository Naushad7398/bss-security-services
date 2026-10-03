import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation, Link, Navigate } from 'react-router-dom'
import {
  Briefcase,
  MapPin,
  Building,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Upload,
  Loader2,
  ShieldCheck,
  Shield,
  User,
  Mail,
  Phone,
  GraduationCap,
  Award,
  Check,
  FileCheck,
  X,
  DollarSign,
  Calendar,
  AlertTriangle,
} from 'lucide-react'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import { useAuth } from '../context/AuthContext'
import { jobsApi, applicationsApi } from '../services/api'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx']

// Fallback details matching published standard openings
const FALLBACK_JOBS = [
  {
    id: 1,
    title: 'Security Guards (Male & Female)',
    department: 'Guarding Operations',
    location: 'Multiple Locations Across India',
    employmentType: 'Full Time',
    experience: '10th / 12th Pass, Physical Fitness Standards',
    salaryRange: '₹18,000 - ₹24,000 / month + Statutory PF & ESIC',
    description:
      'We are deploying disciplined, physically fit male and female security personnel to join our elite security guarding forces across premier commercial complexes, industrial plants, financial institutions, and residential high-rises across India.',
    requirements:
      'Minimum 10th or 12th standard pass; must satisfy mandatory physical fitness and endurance criteria; clean legal and police record verification; disciplined, alert, and courteous professional demeanor.',
    responsibilities:
      'Conduct regular access control inspections; monitor visitor logs and gate entries; perform scheduled perimeter patrols; respond promptly to safety breaches and emergency protocols.',
  },
  {
    id: 2,
    title: 'Security Field Supervisor',
    department: 'Operations Supervision',
    location: 'Regional Hubs & Metro Branches',
    employmentType: 'Full Time',
    experience: 'Graduate / Relevant Security Experience Preferred',
    salaryRange: '₹28,000 - ₹38,000 / month + Travel Allowances',
    description:
      'Lead and inspect on-site guarding teams, enforce post orders, coordinate client requirements, oversee night and day deployment shifts, and maintain high operational standards across corporate client facilities.',
    requirements:
      'Graduate degree or prior operational supervisory experience in security or defense services; strong verbal and written communication skills; valid driving license; high situational leadership.',
    responsibilities:
      'Supervise on-duty guard units across designated commercial clusters; conduct surprise site inspections and muster drills; report daily operational attendance to regional command.',
  },
  {
    id: 3,
    title: 'CCTV & Control Room Operator',
    department: 'Surveillance & Monitoring',
    location: 'Central Monitoring Command Station',
    employmentType: 'Shift Basis',
    experience: 'Technical certification / Surveillance monitoring experience',
    salaryRange: '₹22,000 - ₹30,000 / month',
    description:
      'Operate high-definition IP surveillance feeds, access control systems, fire detection consoles, and automated perimeter breach alarms from our central security command station.',
    requirements:
      'Technical certification or demonstrated experience in CCTV control room surveillance; basic computer troubleshooting proficiency; quick reflex reaction and proactive incident logging.',
    responsibilities:
      'Maintain continuous 24/7 video monitoring; log and escalate unusual security occurrences; coordinate radio communication with roving field patrols.',
  },
  {
    id: 4,
    title: 'Armed Security Officer (PSO)',
    department: 'Executive & Armed Protection',
    location: 'Corporate HQ & VIP Escorts',
    employmentType: 'Full Time',
    experience: 'Valid Arms License & Certified Defense/Security Background',
    salaryRange: '₹40,000 - ₹55,000 / month',
    description:
      'Provide specialized armed personal security, cash-in-transit escort, and high-threat deterrence for corporate leadership, dignitaries, and high-security asset transport.',
    requirements:
      'Valid personal arms license with clean renewal record; minimum 3 years defense, paramilitary, police, or certified armed security background; exceptional physical and tactical fitness.',
    responsibilities:
      'Execute close-protection movement plans; maintain weapon readiness under strict safety standards; assess physical threat environments and coordinate safe passage.',
  },
]

export const CareerApplication = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated, loading: authLoading, isAdmin, logout } = useAuth()

  // Job Details State
  const [job, setJob] = useState(null)
  const [jobLoading, setJobLoading] = useState(true)
  const [jobError, setJobError] = useState('')

  // Form State
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
  const [apiError, setApiError] = useState('')
  const [submittedResponse, setSubmittedResponse] = useState(null)

  // Fetch Job Details
  useEffect(() => {
    let isMounted = true
    const fetchJob = async () => {
      setJobLoading(true)
      setJobError('')
      try {
        const data = await jobsApi.getPublishedJobById(jobId)
        if (isMounted) {
          setJob(data)
        }
      } catch (err) {
        if (isMounted) {
          // If backend doesn't have this job seeded yet, check fallback matching this ID
          const fallback = FALLBACK_JOBS.find((j) => String(j.id) === String(jobId))
          if (fallback) {
            setJob(fallback)
          } else {
            setJobError(err.message || 'Job opening not found or no longer accepting applications.')
          }
        }
      } finally {
        if (isMounted) {
          setJobLoading(false)
        }
      }
    }

    if (jobId) {
      fetchJob()
    }

    return () => {
      isMounted = false
    }
  }, [jobId])

  // Auto-populate user data if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.fullName || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
      }))
    }
  }, [user])

  // Redirect to login if user is not authenticated once auth check finishes
  if (!authLoading && !isAuthenticated) {
    const redirectTarget = `/login?redirect=${encodeURIComponent(`/careers/apply/${jobId}`)}`
    return <Navigate to={redirectTarget} replace />
  }

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }))
    }
    if (apiError) setApiError('')
  }

  // Handle resume file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()

    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setValidationErrors((prev) => ({
        ...prev,
        resume: 'Invalid file format. Only PDF, DOC, or DOCX documents are accepted.',
      }))
      setResumeFile(null)
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setValidationErrors((prev) => ({
        ...prev,
        resume: 'File size exceeds 5MB limit. Please upload a smaller document.',
      }))
      setResumeFile(null)
      return
    }

    setResumeFile(file)
    setValidationErrors((prev) => ({ ...prev, resume: '' }))
    if (apiError) setApiError('')
  }

  const removeResumeFile = () => {
    setResumeFile(null)
  }

  // Client-side validation
  const validate = () => {
    const errors = {}

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required'
    } else if (formData.fullName.trim().length > 150) {
      errors.fullName = 'Full Name must not exceed 150 characters'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address'
    } else if (formData.email.trim().length > 150) {
      errors.email = 'Email address must not exceed 150 characters'
    }

    const cleanPhone = formData.phone.trim()
    if (!cleanPhone) {
      errors.phone = 'Phone number is required'
    } else if (cleanPhone.length < 10 || cleanPhone.length > 20) {
      errors.phone = 'Phone number must be between 10 and 20 digits'
    }

    if (!formData.education.trim()) {
      errors.education = 'Highest education / qualification details are required'
    } else if (formData.education.trim().length > 255) {
      errors.education = 'Education details must not exceed 255 characters'
    }

    if (!formData.experience.trim()) {
      errors.experience = 'Experience summary is required'
    } else if (formData.experience.trim().length > 255) {
      errors.experience = 'Experience summary must not exceed 255 characters'
    }

    if (formData.skills && formData.skills.length > 500) {
      errors.skills = 'Skills list must not exceed 500 characters'
    }

    if (formData.coverLetter && formData.coverLetter.length > 2000) {
      errors.coverLetter = 'Cover letter must not exceed 2000 characters'
    }

    if (!resumeFile) {
      errors.resume = 'Resume document (PDF, DOC, or DOCX) is required'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle application submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setApiError('')

    try {
      const payload = new FormData()
      payload.append('fullName', formData.fullName.trim())
      payload.append('email', formData.email.trim().toLowerCase())
      payload.append('phone', formData.phone.trim())
      payload.append('education', formData.education.trim())
      payload.append('experience', formData.experience.trim())

      if (formData.skills?.trim()) {
        payload.append('skills', formData.skills.trim())
      }
      if (formData.coverLetter?.trim()) {
        payload.append('coverLetter', formData.coverLetter.trim())
      }
      payload.append('resume', resumeFile)

      const response = await applicationsApi.apply(jobId, payload)
      setSubmittedResponse(response)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      if (err.status === 409) {
        setApiError('You have already applied for this job position. You can track its status under My Applications.')
      } else if (err.status === 403) {
        setApiError('Access denied: Only registered applicant accounts can submit career applications.')
      } else if (err.status === 404) {
        setApiError('Job opening not found or no longer active on the recruitment server.')
      } else {
        setApiError(err.message || 'Application submission failed. Please verify your details and try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  // Loading auth or job details
  if (authLoading || (jobLoading && !job)) {
    return (
      <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-md max-w-sm w-full mx-4">
          <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto mb-3" />
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            Loading Career Opening
          </h3>
          <p className="text-xs text-slate-500 mt-1">Retrieving official position specifications...</p>
        </div>
      </div>
    )
  }

  // Job not found state
  if (jobError && !job) {
    return (
      <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-slate-50 min-h-screen">
        <Container>
          <div className="max-w-xl mx-auto text-center bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">Position Unavailable</h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">{jobError}</p>
            <Button to="/careers" variant="primary" size="md">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span>Browse All Openings</span>
            </Button>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-slate-50 min-h-screen">
      <Container>
        {/* Navigation Breadcrumb */}
        <div className="mb-6 max-w-4xl mx-auto">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-amber-600 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Openings</span>
          </Link>
        </div>

        {/* TOP SECTION: Selected Job Details Card */}
        {job && (
          <div className="max-w-4xl mx-auto mb-8 bg-[#0a192f] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
            {/* Background Accent Crest */}
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-5 pointer-events-none">
              <Shield className="w-72 h-72 text-amber-400" />
            </div>

            <div className="relative z-10 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Official BSS Career Opening</span>
                </div>
                {job.employmentType && (
                  <span className="text-xs bg-amber-400/20 text-amber-300 px-3 py-1 rounded-lg border border-amber-400/30 font-black uppercase tracking-wider">
                    {job.employmentType}
                  </span>
                )}
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  {job.title}
                </h1>
                {job.department && (
                  <p className="text-xs sm:text-sm text-amber-400 font-bold uppercase tracking-wider mt-1">
                    Department: {job.department}
                  </p>
                )}
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong className="text-white">Location:</strong> {job.location || 'Multiple Locations'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong className="text-white">Experience:</strong> {job.experience || 'Industry Standards'}
                  </span>
                </div>
                {job.salaryRange && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      <strong className="text-white">Compensation:</strong> {job.salaryRange}
                    </span>
                  </div>
                )}
              </div>

              {/* Description & Requirements */}
              {job.description && (
                <div className="pt-3 border-t border-slate-800">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">
                    Position Overview
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              )}

              {job.requirements && (
                <div className="pt-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">
                    Key Eligibility & Requirements
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {job.requirements}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MIDDLE SECTION: Conditional View (Admin Notice | Success Card | Application Form) */}
        <div className="max-w-4xl mx-auto">
          {/* Admin Account Detected Alert */}
          {isAdmin ? (
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Administrator Account Detected
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                You are currently signed in as an Administrator (<strong className="text-slate-800">{user?.email}</strong>).
                In accordance with BSS recruitment compliance, administrator accounts cannot submit candidate applications.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Button to="/admin" variant="primary" size="md">
                  Go to Admin Portal
                </Button>
                <Button onClick={logout} variant="secondary" size="md">
                  Sign Out to Apply as Candidate
                </Button>
              </div>
            </div>
          ) : submittedResponse ? (
            /* SUCCESS VIEW */
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-xl text-center space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-inner">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Submission Received</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Application Successfully Submitted!
                </h2>
                <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  Thank you for applying for the position of <strong className="text-slate-900">{job?.title}</strong> at BSS Suraksha Services.
                  Your candidature has been routed to our recruitment and physical verification board.
                </p>
              </div>

              {/* Reference Box */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-bold uppercase tracking-wider">Reference ID:</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    #{submittedResponse.id || 'BSS-APP'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-bold uppercase tracking-wider">Applicant Name:</span>
                  <span className="font-bold text-slate-900">{submittedResponse.applicantName || formData.fullName}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 font-bold uppercase tracking-wider">Initial Status:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase tracking-wider text-[11px]">
                    {submittedResponse.status || 'APPLIED'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button to="/my-applications" variant="primary" size="md">
                  <FileText className="w-4 h-4 mr-1.5" />
                  <span>View My Applications</span>
                </Button>
                <Button to="/careers" variant="secondary" size="md">
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  <span>Back to Careers</span>
                </Button>
              </div>
            </div>
          ) : (
            /* APPLICATION FORM */
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
              {/* Form Title */}
              <div className="border-b border-slate-200 pb-5">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Candidate Application Form
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Please provide accurate personal, educational, and professional background details.
                </p>
              </div>

              {/* API Error Notification */}
              {apiError && (
                <div
                  role="alert"
                  className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in"
                >
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex-1 font-semibold leading-relaxed">{apiError}</div>
                  <button
                    type="button"
                    onClick={() => setApiError('')}
                    className="text-rose-500 hover:text-rose-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* 1. PERSONAL INFORMATION SECTION */}
                <div>
                  <div className="flex items-center gap-2 mb-4 text-slate-900">
                    <User className="w-4 h-4 text-amber-500" />
                    <h3 className="text-sm font-black uppercase tracking-wider">
                      1. Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Kumar Sharma"
                        disabled={submitting}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-xs sm:text-sm focus:outline-none transition-colors ${
                          validationErrors.fullName
                            ? 'border-rose-400 ring-2 ring-rose-500/20'
                            : 'border-slate-300 focus:border-amber-500 focus:bg-white'
                        }`}
                      />
                      {validationErrors.fullName && (
                        <p className="mt-1 text-xs text-rose-600 font-semibold">{validationErrors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. ramesh@example.com"
                        disabled={submitting}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-xs sm:text-sm focus:outline-none transition-colors ${
                          validationErrors.email
                            ? 'border-rose-400 ring-2 ring-rose-500/20'
                            : 'border-slate-300 focus:border-amber-500 focus:bg-white'
                        }`}
                      />
                      {validationErrors.email && (
                        <p className="mt-1 text-xs text-rose-600 font-semibold">{validationErrors.email}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        disabled={submitting}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-xs sm:text-sm focus:outline-none transition-colors ${
                          validationErrors.phone
                            ? 'border-rose-400 ring-2 ring-rose-500/20'
                            : 'border-slate-300 focus:border-amber-500 focus:bg-white'
                        }`}
                      />
                      {validationErrors.phone && (
                        <p className="mt-1 text-xs text-rose-600 font-semibold">{validationErrors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. QUALIFICATIONS & EXPERIENCE SECTION */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 mb-4 text-slate-900">
                    <GraduationCap className="w-4 h-4 text-amber-500" />
                    <h3 className="text-sm font-black uppercase tracking-wider">
                      2. Education & Experience
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {/* Education */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Highest Education / Qualification <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        placeholder="e.g. 12th Standard Pass / Bachelor of Arts / Ex-Defense Training"
                        disabled={submitting}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-xs sm:text-sm focus:outline-none transition-colors ${
                          validationErrors.education
                            ? 'border-rose-400 ring-2 ring-rose-500/20'
                            : 'border-slate-300 focus:border-amber-500 focus:bg-white'
                        }`}
                      />
                      {validationErrors.education && (
                        <p className="mt-1 text-xs text-rose-600 font-semibold">{validationErrors.education}</p>
                      )}
                    </div>

                    {/* Experience */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Security / Professional Experience <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="e.g. 2 Years Security Guard experience at industrial plant / Fresher"
                        disabled={submitting}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-xs sm:text-sm focus:outline-none transition-colors ${
                          validationErrors.experience
                            ? 'border-rose-400 ring-2 ring-rose-500/20'
                            : 'border-slate-300 focus:border-amber-500 focus:bg-white'
                        }`}
                      />
                      {validationErrors.experience && (
                        <p className="mt-1 text-xs text-rose-600 font-semibold">{validationErrors.experience}</p>
                      )}
                    </div>

                    {/* Skills */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Key Skills <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="e.g. CCTV Monitoring, Fire Fighting, First Aid, Physical Fitness, Hindi & English"
                        disabled={submitting}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                      {validationErrors.skills && (
                        <p className="mt-1 text-xs text-rose-600 font-semibold">{validationErrors.skills}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. COVER LETTER & RESUME UPLOAD SECTION */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 mb-4 text-slate-900">
                    <FileText className="w-4 h-4 text-amber-500" />
                    <h3 className="text-sm font-black uppercase tracking-wider">
                      3. Documents & Statement
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {/* Cover Letter */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Cover Letter / Statement of Readiness <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        name="coverLetter"
                        rows={4}
                        value={formData.coverLetter}
                        onChange={handleChange}
                        placeholder="Briefly describe your discipline, dedication, physical endurance, and reasons for joining BSS Suraksha Services..."
                        disabled={submitting}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                      {validationErrors.coverLetter && (
                        <p className="mt-1 text-xs text-rose-600 font-semibold">{validationErrors.coverLetter}</p>
                      )}
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Resume / Biodata Document <span className="text-rose-500">*</span>
                      </label>

                      {!resumeFile ? (
                        <label className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl p-6 flex flex-col items-center justify-center gap-2.5 bg-slate-50/50 hover:bg-amber-50/20 cursor-pointer transition-colors group">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            disabled={submitting}
                            className="hidden"
                          />
                          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Upload className="w-6 h-6" />
                          </div>
                          <div className="text-center">
                            <span className="text-xs font-bold text-slate-800 block">
                              Click to browse or drag and drop your resume
                            </span>
                            <span className="text-[11px] text-slate-500 block mt-0.5">
                              Accepted formats: PDF, DOC, DOCX (Max size: 5 MB)
                            </span>
                          </div>
                        </label>
                      ) : (
                        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
                              <FileCheck className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                                {resumeFile.name}
                              </p>
                              <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                                {(resumeFile.size / 1024 / 1024).toFixed(2)} MB • Ready for submission
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeResumeFile}
                            disabled={submitting}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Remove file"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {validationErrors.resume && (
                        <p className="mt-1.5 text-xs text-rose-600 font-semibold">{validationErrors.resume}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* SUBMIT BUTTON & FOOTER */}
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-[11px] text-slate-500 max-w-sm">
                    By submitting, you certify that all information submitted is truthful and authorizes BSS security background screening.
                  </p>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={submitting}
                    className="w-full sm:w-auto"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        <span>Submit Candidate Application</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default CareerApplication
