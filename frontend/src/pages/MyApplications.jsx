import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/common/Container'
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import { Briefcase, Calendar, Clock, AlertCircle, Loader2, ArrowRight, Shield, FileText, X, CheckCircle2 } from 'lucide-react'
import { applicationsApi } from '../services/api'
import { useAuth } from '../context/AuthContext'

// BSS Corporate Status Badge styling mapping backend ApplicationStatus enum
const STATUS_CONFIG = {
  APPLIED: {
    label: 'Applied',
    className: 'bg-blue-50 text-blue-800 border-blue-200',
    description: 'Application successfully received by the recruitment desk.',
  },
  UNDER_REVIEW: {
    label: 'Under Review',
    className: 'bg-amber-50 text-amber-900 border-amber-300',
    description: 'Your application is currently being evaluated by operations.',
  },
  SHORTLISTED: {
    label: 'Shortlisted',
    className: 'bg-purple-50 text-purple-900 border-purple-200',
    description: 'Congratulations! Your profile has been shortlisted.',
  },
  INTERVIEW_SCHEDULED: {
    label: 'Interview Scheduled',
    className: 'bg-cyan-50 text-cyan-900 border-cyan-300',
    description: 'An interview or physical verification has been scheduled.',
  },
  SELECTED: {
    label: 'Selected',
    className: 'bg-emerald-50 text-emerald-900 border-emerald-300 font-black',
    description: 'Selected for security deployment onboarding.',
  },
  REJECTED: {
    label: 'Not Selected',
    className: 'bg-rose-50 text-rose-800 border-rose-200',
    description: 'Not moving forward for this position at this time.',
  },
}

export const MyApplications = () => {
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [selectedApp, setSelectedApp] = useState(null)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [detailsError, setDetailsError] = useState('')

  // Fetch candidate applications from real backend
  const fetchApplications = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await applicationsApi.getMyApplications()
      setApplications(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Unable to retrieve your applications. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchApplications()
  }, [fetchApplications])

  // Open detailed application inspection modal
  const handleOpenDetails = async (appId) => {
    setDetailsLoading(true)
    setDetailsError('')
    try {
      const fullDetails = await applicationsApi.getMyApplicationById(appId)
      setSelectedApp(fullDetails)
    } catch (err) {
      setDetailsError(err.message || 'Could not load application details.')
    } finally {
      setDetailsLoading(false)
    }
  }

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A'
    try {
      return new Date(isoString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    } catch {
      return isoString
    }
  }

  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-slate-50 min-h-screen">
      <Container>
        <SectionTitle
          subtitle="Applicant Portal"
          title="My Job Applications"
          description={`Track your submitted security career applications, recruitment stages, and active status updates.`}
        />

        {/* Loading State */}
        {loading && (
          <div className="my-16 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Loading Your Applications...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="my-12 p-8 rounded-3xl bg-white border border-red-200 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Could Not Load Applications</h3>
            <p className="text-xs text-slate-600 mb-5">{error}</p>
            <Button onClick={fetchApplications} variant="secondary" size="sm">
              Retry
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && applications.length === 0 && (
          <div className="my-12 p-10 rounded-3xl bg-white border border-slate-200 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Briefcase className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No Applications Found</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              You haven't applied for any positions yet. Explore our open security roles and submit your application online.
            </p>
            <Button to="/careers" variant="primary" size="md">
              <span>Browse Open Positions</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Applications List Grid */}
        {!loading && !error && applications.length > 0 && (
          <div className="my-10 space-y-4 max-w-4xl mx-auto">
            {applications.map((app) => {
              const statusCfg = STATUS_CONFIG[app.status] || {
                label: app.status,
                className: 'bg-slate-100 text-slate-800 border-slate-200',
                description: '',
              }

              return (
                <div
                  key={app.id}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        REF #{app.id}
                      </span>
                      <span
                        className={`text-xs px-3 py-1 rounded-full border font-bold ${statusCfg.className}`}
                      >
                        {statusCfg.label}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">
                      {app.jobTitle || 'Security Position'}
                    </h3>

                    {app.department && (
                      <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                        {app.department}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Applied: {formatDate(app.appliedAt)}
                      </span>
                      {app.hasResume && (
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <FileText className="w-3.5 h-3.5 text-amber-600" />
                          Resume Attached
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center md:flex-col gap-2">
                    <Button
                      onClick={() => handleOpenDetails(app.id)}
                      variant="outline"
                      size="sm"
                      className="w-full md:w-auto text-xs"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Container>

      {/* Application Details Modal */}
      {selectedApp && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="app-details-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div className="relative bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#0a192f] text-white px-6 sm:px-8 py-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h2 id="app-details-title" className="text-base sm:text-lg font-black text-white">
                    Application #{selectedApp.id}
                  </h2>
                  <p className="text-xs text-amber-400 font-semibold">{selectedApp.jobTitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 max-h-[calc(85vh-90px)] overflow-y-auto space-y-5">
              {/* Status Section */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 block mb-1">
                    Current Stage
                  </span>
                  <span
                    className={`inline-block text-xs px-3 py-1 rounded-full border font-bold ${
                      STATUS_CONFIG[selectedApp.status]?.className || 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {STATUS_CONFIG[selectedApp.status]?.label || selectedApp.status}
                  </span>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <span className="block font-medium">Applied Date</span>
                  <span className="font-semibold text-slate-800">{formatDate(selectedApp.appliedAt)}</span>
                </div>
              </div>

              {STATUS_CONFIG[selectedApp.status]?.description && (
                <p className="text-xs text-slate-600 bg-amber-50/50 p-3 rounded-lg border border-amber-200/50">
                  ℹ️ {STATUS_CONFIG[selectedApp.status].description}
                </p>
              )}

              {/* Applicant Details Provided */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
                  Submitted Profile
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Candidate Name:</span>
                    <span className="font-semibold text-slate-900">{selectedApp.applicantName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Email:</span>
                    <span className="font-semibold text-slate-900">{selectedApp.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Phone:</span>
                    <span className="font-semibold text-slate-900">{selectedApp.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Education:</span>
                    <span className="font-semibold text-slate-900">{selectedApp.education}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block">Experience:</span>
                    <span className="font-semibold text-slate-900">{selectedApp.experience}</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              {selectedApp.skills && (
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">
                    Skills
                  </h4>
                  <p className="text-xs text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    {selectedApp.skills}
                  </p>
                </div>
              )}

              {/* Cover Letter */}
              {selectedApp.coverLetter && (
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">
                    Cover Note
                  </h4>
                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed whitespace-pre-line">
                    {selectedApp.coverLetter}
                  </p>
                </div>
              )}

              {/* Resume Status */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">
                  Resume Document
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-700 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    {selectedApp.hasResume
                      ? 'Resume verified and stored in encrypted candidate storage.'
                      : 'No resume attached.'}
                  </span>
                </div>
              </div>

              {/* Footer Close Button */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button onClick={() => setSelectedApp(null)} variant="secondary" size="sm">
                  Close Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyApplications
