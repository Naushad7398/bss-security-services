import React, { useState, useEffect, useCallback } from 'react'
import {
  FileText,
  Download,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Award,
  Clock,
  X,
  Eye,
  RefreshCw,
  ChevronDown,
} from 'lucide-react'
import Button from '../../components/common/Button'
import { adminApplicationsApi } from '../../services/api'

// Enum values strictly matching backend ApplicationStatus.java
const STATUS_OPTIONS = [
  'ALL',
  'APPLIED',
  'UNDER_REVIEW',
  'SHORTLISTED',
  'INTERVIEW_SCHEDULED',
  'SELECTED',
  'REJECTED',
]

const STATUS_CONFIG = {
  APPLIED: {
    label: 'Applied',
    className: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  UNDER_REVIEW: {
    label: 'Under Review',
    className: 'bg-amber-50 text-amber-900 border-amber-300',
  },
  SHORTLISTED: {
    label: 'Shortlisted',
    className: 'bg-purple-50 text-purple-900 border-purple-200',
  },
  INTERVIEW_SCHEDULED: {
    label: 'Interview Scheduled',
    className: 'bg-cyan-50 text-cyan-900 border-cyan-300',
  },
  SELECTED: {
    label: 'Selected',
    className: 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold',
  },
  REJECTED: {
    label: 'Not Selected',
    className: 'bg-rose-50 text-rose-800 border-rose-200',
  },
}

export const AdminApplications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionSuccess, setActionSuccess] = useState('')

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  // Modal / Detail state
  const [selectedApp, setSelectedApp] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [modalError, setModalError] = useState('')

  // Status updating inline / in modal
  const [updatingId, setUpdatingId] = useState(null)
  const [downloadingResumeId, setDownloadingResumeId] = useState(null)

  const fetchApplications = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminApplicationsApi.getAllApplications()
      setApplications(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Failed to fetch candidate applications from backend.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchApplications()
  }, [fetchApplications])

  // Clear success notification after 4s
  useEffect(() => {
    if (actionSuccess) {
      const timer = setTimeout(() => setActionSuccess(''), 4000)
      return () => clearTimeout(timer)
    }
  }, [actionSuccess])

  // Open Full Details modal
  const handleOpenDetails = async (applicationId) => {
    setModalLoading(true)
    setModalError('')
    try {
      const app = await adminApplicationsApi.getApplicationById(applicationId)
      setSelectedApp(app)
    } catch (err) {
      setModalError(err.message || 'Failed to load full candidate details.')
    } finally {
      setModalLoading(false)
    }
  }

  // Update Status action (PATCH /api/admin/applications/{id}/status)
  const handleStatusChange = async (applicationId, newStatus) => {
    setUpdatingId(applicationId)
    setError('')
    try {
      const updated = await adminApplicationsApi.updateApplicationStatus(applicationId, newStatus)
      setApplications((prev) =>
        prev.map((app) => (app.id === applicationId ? updated : app))
      )
      if (selectedApp && selectedApp.id === applicationId) {
        setSelectedApp(updated)
      }
      setActionSuccess(`Application #${applicationId} status updated to ${newStatus.replace('_', ' ')}.`)
    } catch (err) {
      setError(err.message || `Failed to update status for application #${applicationId}.`)
    } finally {
      setUpdatingId(null)
    }
  }

  // Authenticated Resume Download
  const handleDownloadResume = async (app) => {
    if (!app.hasResume) return
    setDownloadingResumeId(app.id)
    try {
      await adminApplicationsApi.downloadResume(app.id, app.applicantName)
      setActionSuccess(`Resume download initiated for ${app.applicantName || 'applicant'}.`)
    } catch (err) {
      setError(err.message || 'Failed to download resume from server.')
    } finally {
      setDownloadingResumeId(null)
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

  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A'
    try {
      return new Date(isoString).toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return isoString
    }
  }

  // Filtered applications list
  const filteredApplications = applications.filter((app) => {
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter
    const q = searchQuery.toLowerCase().trim()
    const matchesQuery =
      !q ||
      app.applicantName?.toLowerCase().includes(q) ||
      app.email?.toLowerCase().includes(q) ||
      app.phone?.toLowerCase().includes(q) ||
      app.jobTitle?.toLowerCase().includes(q) ||
      app.department?.toLowerCase().includes(q) ||
      String(app.id).includes(q)

    return matchesStatus && matchesQuery
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Candidate Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review security officer candidates, verify credentials, update deployment statuses, and manage dossiers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchApplications}
            disabled={loading}
            className="flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* Notifications */}
      {actionSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionSuccess('')}
            className="text-emerald-700 hover:text-emerald-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={() => setError('')}
            className="text-rose-700 hover:text-rose-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate name, email, phone, job..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Records summary */}
          <div className="text-xs font-bold text-slate-500">
            Showing <span className="text-slate-900 font-black">{filteredApplications.length}</span> of {applications.length} applications
          </div>
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Status:
          </span>
          {STATUS_OPTIONS.map((status) => {
            const count =
              status === 'ALL'
                ? applications.length
                : applications.filter((a) => a.status === status).length

            return (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  statusFilter === status
                    ? 'bg-[#0a192f] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{status === 'ALL' ? 'All Applications' : status.replace('_', ' ')}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    statusFilter === status ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Applications Table / Card Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Loading Candidate Records...
            </p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="py-16 px-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">No applications match your criteria</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchQuery || statusFilter !== 'ALL'
                ? 'Try resetting the status filter or clearing your search term.'
                : 'No candidate applications have been submitted to the platform yet.'}
            </p>
            {(searchQuery || statusFilter !== 'ALL') && (
              <button
                type="button"
                onClick={() => {
                  setStatusFilter('ALL')
                  setSearchQuery('')
                }}
                className="mt-3 text-xs font-bold text-amber-600 hover:text-amber-700 underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4">App ID</th>
                  <th className="py-3.5 px-4">Applicant</th>
                  <th className="py-3.5 px-4">Position</th>
                  <th className="py-3.5 px-4">Applied Date</th>
                  <th className="py-3.5 px-4">Current Status</th>
                  <th className="py-3.5 px-4">Dossier</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplications.map((app) => {
                  const statusConf = STATUS_CONFIG[app.status] || {
                    label: app.status,
                    className: 'bg-slate-100 text-slate-700 border-slate-200',
                  }
                  const isUpdating = updatingId === app.id
                  const isDownloading = downloadingResumeId === app.id

                  return (
                    <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-600 whitespace-nowrap">
                        #APP-{app.id}
                      </td>

                      {/* Applicant Profile */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-sm">{app.applicantName}</div>
                        <div className="text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-400" />
                            {app.email}
                          </span>
                          <span className="hidden sm:inline text-slate-300">•</span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {app.phone}
                          </span>
                        </div>
                      </td>

                      {/* Target Job */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{app.jobTitle || 'Unspecified Role'}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {app.department || 'General Operations'}
                        </div>
                      </td>

                      {/* Applied Date */}
                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{formatDate(app.appliedAt)}</span>
                        </div>
                      </td>

                      {/* Status & Inline Quick-Toggle */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <select
                            value={app.status}
                            disabled={isUpdating}
                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer transition-colors ${
                              statusConf.className
                            } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                            aria-label={`Change status for application ${app.id}`}
                          >
                            <option value="APPLIED">Applied</option>
                            <option value="UNDER_REVIEW">Under Review</option>
                            <option value="SHORTLISTED">Shortlisted</option>
                            <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
                            <option value="SELECTED">Selected</option>
                            <option value="REJECTED">Not Selected</option>
                          </select>
                          {isUpdating && <Loader2 className="w-3 h-3 text-amber-600 animate-spin" />}
                        </div>
                      </td>

                      {/* Resume / Dossier Link */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {app.hasResume ? (
                          <button
                            type="button"
                            onClick={() => handleDownloadResume(app)}
                            disabled={isDownloading}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-colors"
                            title="Download candidate resume document"
                          >
                            {isDownloading ? (
                              <Loader2 className="w-3 h-3 text-amber-600 animate-spin" />
                            ) : (
                              <Download className="w-3 h-3 text-amber-600" />
                            )}
                            <span>Resume</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">No Resume</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleOpenDetails(app.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0a192f] hover:bg-slate-800 text-amber-400 hover:text-amber-300 text-xs font-bold transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Profile</span>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Candidate Dossier Detail Modal */}
      {(selectedApp || modalLoading || modalError) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 bg-[#0a192f] text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-wide text-white">
                    {selectedApp?.applicantName || 'Candidate Profile'}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
                    <span className="font-mono">#APP-{selectedApp?.id}</span>
                    <span>•</span>
                    <span className="text-amber-400 font-semibold">{selectedApp?.jobTitle}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedApp(null)
                  setModalError('')
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {modalLoading ? (
                <div className="py-16 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                  <p className="text-xs font-bold text-slate-500">Retrieving Dossier...</p>
                </div>
              ) : modalError ? (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                  {modalError}
                </div>
              ) : selectedApp ? (
                <>
                  {/* Status Banner with Active Status Select */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        Current Application Status
                      </span>
                      <span
                        className={`inline-block mt-1 px-3 py-1 rounded-lg text-xs font-bold border ${
                          STATUS_CONFIG[selectedApp.status]?.className || 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {STATUS_CONFIG[selectedApp.status]?.label || selectedApp.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-600">Change Status:</span>
                      <select
                        value={selectedApp.status}
                        disabled={updatingId === selectedApp.id}
                        onChange={(e) => handleStatusChange(selectedApp.id, e.target.value)}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      >
                        <option value="APPLIED">Applied</option>
                        <option value="UNDER_REVIEW">Under Review</option>
                        <option value="SHORTLISTED">Shortlisted</option>
                        <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
                        <option value="SELECTED">Selected</option>
                        <option value="REJECTED">Not Selected</option>
                      </select>
                      {updatingId === selectedApp.id && (
                        <Loader2 className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                      )}
                    </div>
                  </div>

                  {/* Contact & Target Role Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                        Applicant Information
                      </h4>
                      <div className="space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-bold text-slate-900">{selectedApp.applicantName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{selectedApp.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{selectedApp.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                        Deployment Role
                      </h4>
                      <div className="space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="font-bold text-slate-900">{selectedApp.jobTitle}</span>
                        </div>
                        <div className="text-slate-500">
                          Department: {selectedApp.department || 'Operations'}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-[11px] pt-1">
                          <Clock className="w-3 h-3 shrink-0" />
                          <span>Applied on: {formatDateTime(selectedApp.appliedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Education & Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                        <GraduationCap className="w-4 h-4 text-amber-600" />
                        <span>Education</span>
                      </div>
                      <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-medium">
                        {selectedApp.education || 'No education records specified.'}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                        <Briefcase className="w-4 h-4 text-amber-600" />
                        <span>Experience</span>
                      </div>
                      <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-medium">
                        {selectedApp.experience || 'No previous experience detailed.'}
                      </p>
                    </div>
                  </div>

                  {/* Skills */}
                  {selectedApp.skills && (
                    <div className="p-4 rounded-2xl bg-white border border-slate-200">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                        <Award className="w-4 h-4 text-amber-600" />
                        <span>Security Skills & Badges</span>
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed font-medium">
                        {selectedApp.skills}
                      </p>
                    </div>
                  )}

                  {/* Cover Letter */}
                  {selectedApp.coverLetter && (
                    <div className="p-4 rounded-2xl bg-white border border-slate-200">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                        Cover Letter & Statement
                      </h4>
                      <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {selectedApp.coverLetter}
                      </p>
                    </div>
                  )}

                  {/* Resume Download Action */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Official Resume File</h4>
                      <p className="text-[11px] text-slate-500">
                        {selectedApp.hasResume
                          ? 'Uploaded PDF/DOC document on secure storage.'
                          : 'No resume document was attached to this application.'}
                      </p>
                    </div>
                    {selectedApp.hasResume ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleDownloadResume(selectedApp)}
                        disabled={downloadingResumeId === selectedApp.id}
                        className="flex items-center gap-2"
                      >
                        {downloadingResumeId === selectedApp.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                        <span>Download Resume</span>
                      </Button>
                    ) : (
                      <span className="text-xs text-slate-400 font-semibold italic">Not available</span>
                    )}
                  </div>
                </>
              ) : null}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedApp(null)}
              >
                Close Dossier
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminApplications
