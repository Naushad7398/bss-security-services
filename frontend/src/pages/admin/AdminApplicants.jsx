import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  User,
  Mail,
  Phone,
  Clock,
  X,
  Eye,
  RefreshCw,
  Shield,
  FileText,
  UserCheck,
  UserX,
  ArrowRight,
} from 'lucide-react'
import { adminApplicantsApi } from '../../services/api'

export const AdminApplicants = () => {
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionSuccess, setActionSuccess] = useState('')

  // Search and status filter
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL') // 'ALL' | 'ACTIVE' | 'DISABLED'

  // Modal / Detail state
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [modalError, setModalError] = useState('')

  // Confirmation dialog state for enable/disable
  const [confirmDialog, setConfirmDialog] = useState(null) // { applicant: {...}, nextEnabled: boolean }
  const [updatingStatus, setUpdatingStatus] = useState(false)

  const fetchApplicants = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminApplicantsApi.getAllApplicants(searchQuery)
      setApplicants(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Failed to fetch registered applicants from backend.')
    } finally {
      setLoading(false)
    }
  }, [searchQuery])

  useEffect(() => {
    fetchApplicants()
  }, [fetchApplicants])

  // Clear success notification after 4s
  useEffect(() => {
    if (actionSuccess) {
      const timer = setTimeout(() => setActionSuccess(''), 4000)
      return () => clearTimeout(timer)
    }
  }, [actionSuccess])

  // Open Full Details modal
  const handleOpenDetails = async (applicantId) => {
    setModalLoading(true)
    setModalError('')
    try {
      const app = await adminApplicantsApi.getApplicantById(applicantId)
      setSelectedApplicant(app)
    } catch (err) {
      setModalError(err.message || 'Failed to load applicant profile.')
    } finally {
      setModalLoading(false)
    }
  }

  // Trigger confirmation dialog for enabling or disabling
  const handlePromptToggleStatus = (applicant) => {
    setConfirmDialog({
      applicant,
      nextEnabled: !applicant.enabled,
    })
  }

  // Execute account status update
  const handleConfirmStatusToggle = async () => {
    if (!confirmDialog) return
    const { applicant, nextEnabled } = confirmDialog

    setUpdatingStatus(true)
    setError('')
    try {
      const updated = await adminApplicantsApi.updateApplicantStatus(applicant.id, nextEnabled)
      setApplicants((prev) =>
        prev.map((a) => (a.id === applicant.id ? updated : a))
      )
      if (selectedApplicant && selectedApplicant.id === applicant.id) {
        setSelectedApplicant(updated)
      }
      setActionSuccess(
        `Applicant account for "${updated.fullName}" has been ${nextEnabled ? 'activated' : 'disabled'}.`
      )
      setConfirmDialog(null)
    } catch (err) {
      setError(err.message || `Failed to update status for applicant #${applicant.id}.`)
    } finally {
      setUpdatingStatus(false)
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

  // Filtered applicants list based on active/disabled status tab
  const filteredApplicants = applicants.filter((item) => {
    if (statusFilter === 'ACTIVE') return item.enabled === true
    if (statusFilter === 'DISABLED') return item.enabled === false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Registered Applicants
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Oversee user accounts, verify applicant contact details, and manage portal access permissions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchApplicants}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-600' : ''}`} />
            <span>Refresh Applicants</span>
          </button>
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
            className="text-emerald-700 hover:text-emerald-900 cursor-pointer"
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
            className="text-rose-700 hover:text-rose-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search and Status Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search applicant name, email, or phone..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs font-bold text-slate-500">
            Showing <span className="text-slate-900 font-black">{filteredApplicants.length}</span> of {applicants.length} applicants
          </div>
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Account Status:
          </span>
          {[
            { id: 'ALL', label: 'All Applicants', count: applicants.length },
            { id: 'ACTIVE', label: 'Active', count: applicants.filter((a) => a.enabled).length },
            { id: 'DISABLED', label: 'Disabled', count: applicants.filter((a) => !a.enabled).length },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  statusFilter === tab.id ? 'bg-red-600 text-white font-bold' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area: Responsive Dual Layout */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Loading Registered Applicants...
          </p>
        </div>
      ) : filteredApplicants.length === 0 ? (
        <div className="py-16 px-4 text-center bg-white rounded-2xl border border-slate-200">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No applicants found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery || statusFilter !== 'ALL'
              ? 'Try resetting your search query or changing the account status filter.'
              : 'Registered job candidates will appear here once accounts are created.'}
          </p>
          {(searchQuery || statusFilter !== 'ALL') && (
            <button
              type="button"
              onClick={() => {
                setStatusFilter('ALL')
                setSearchQuery('')
              }}
              className="mt-3 text-xs font-bold text-red-600 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop / Tablet Table View (hidden on small mobile) */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-4">Applicant</th>
                    <th className="py-3.5 px-4">Email</th>
                    <th className="py-3.5 px-4">Phone</th>
                    <th className="py-3.5 px-4 text-center">Applications</th>
                    <th className="py-3.5 px-4">Account Status</th>
                    <th className="py-3.5 px-4">Registered Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApplicants.map((applicant) => (
                    <tr key={applicant.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Name & ID */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-sm">{applicant.fullName}</div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                          ID: #{applicant.id}
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-3.5 px-4">
                        <a
                          href={`mailto:${applicant.email}`}
                          className="text-slate-700 hover:text-red-600 font-medium flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{applicant.email}</span>
                        </a>
                      </td>

                      {/* Phone */}
                      <td className="py-3.5 px-4">
                        <a
                          href={`tel:${applicant.phone}`}
                          className="text-slate-700 hover:text-red-600 font-medium flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{applicant.phone}</span>
                        </a>
                      </td>

                      {/* Application Count */}
                      <td className="py-3.5 px-4 text-center">
                        <Link
                          to="/admin/applications"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-bold text-xs transition-colors"
                          title="View all submitted applications"
                        >
                          <FileText className="w-3 h-3 text-slate-500" />
                          <span>{applicant.applicationCount || 0}</span>
                        </Link>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                            applicant.enabled
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                          }`}
                        >
                          {applicant.enabled ? 'Active' : 'Disabled'}
                        </span>
                      </td>

                      {/* Registered Date */}
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{formatDate(applicant.createdAt)}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenDetails(applicant.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-red-400" />
                            <span>Profile</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePromptToggleStatus(applicant)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              applicant.enabled
                                ? 'text-rose-600 hover:bg-rose-50'
                                : 'text-emerald-700 hover:bg-emerald-50'
                            }`}
                            title={applicant.enabled ? 'Disable Account' : 'Enable Account'}
                          >
                            {applicant.enabled ? (
                              <UserX className="w-4 h-4" />
                            ) : (
                              <UserCheck className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View (< md) */}
          <div className="md:hidden space-y-3">
            {filteredApplicants.map((applicant) => (
              <div
                key={applicant.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-400">#{applicant.id}</span>
                      <h3 className="font-bold text-sm text-slate-900">{applicant.fullName}</h3>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {applicant.email}
                    </div>
                  </div>

                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                      applicant.enabled
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-300'
                    }`}
                  >
                    {applicant.enabled ? 'Active' : 'Disabled'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{applicant.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{applicant.applicationCount || 0} Applications</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Joined: {formatDate(applicant.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handlePromptToggleStatus(applicant)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      applicant.enabled
                        ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    {applicant.enabled ? (
                      <>
                        <UserX className="w-3.5 h-3.5" />
                        <span>Disable</span>
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Enable</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenDetails(applicant.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-red-400" />
                    <span>View Profile</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Applicant Details Modal */}
      {(selectedApplicant || modalLoading || modalError) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-wide text-white">
                    {selectedApplicant?.fullName || 'Applicant Profile'}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
                    <span className="font-mono text-slate-400">ID #{selectedApplicant?.id}</span>
                    <span>•</span>
                    <span className="text-red-400 font-semibold">{selectedApplicant?.role}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedApplicant(null)
                  setModalError('')
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {modalLoading ? (
                <div className="py-16 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
                  <p className="text-xs font-bold text-slate-500">Loading Applicant Details...</p>
                </div>
              ) : modalError ? (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                  {modalError}
                </div>
              ) : selectedApplicant ? (
                <>
                  {/* Status Banner */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        Account Access Status
                      </span>
                      <span
                        className={`inline-block mt-1 px-3 py-1 rounded-lg text-xs font-bold border ${
                          selectedApplicant.enabled
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border-slate-300'
                        }`}
                      >
                        {selectedApplicant.enabled ? 'Active Account' : 'Account Disabled'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePromptToggleStatus(selectedApplicant)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        selectedApplicant.enabled
                          ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                      }`}
                    >
                      {selectedApplicant.enabled ? (
                        <>
                          <UserX className="w-3.5 h-3.5" />
                          <span>Disable Account</span>
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Enable Account</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Info Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Contact Details
                      </h4>
                      <div className="space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-bold text-slate-900">{selectedApplicant.fullName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <a href={`mailto:${selectedApplicant.email}`} className="text-red-600 hover:underline">
                            {selectedApplicant.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <a href={`tel:${selectedApplicant.phone}`} className="text-slate-800 font-semibold hover:underline">
                            {selectedApplicant.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Recruitment Activity
                      </h4>
                      <div className="space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Applications:</span>
                          <Link
                            to="/admin/applications"
                            className="font-bold text-red-600 hover:underline flex items-center gap-1"
                          >
                            <span>{selectedApplicant.applicationCount || 0} submitted</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Role:</span>
                          <span className="font-mono font-bold text-slate-900">{selectedApplicant.role}</span>
                        </div>
                        <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                          <span>Registered:</span>
                          <span>{formatDateTime(selectedApplicant.createdAt)}</span>
                        </div>
                        {selectedApplicant.updatedAt && (
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span>Last Updated:</span>
                            <span>{formatDateTime(selectedApplicant.updatedAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedApplicant(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enable / Disable Confirmation Dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto ${
                confirmDialog.nextEnabled
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-rose-100 text-rose-600'
              }`}
            >
              {confirmDialog.nextEnabled ? (
                <UserCheck className="w-6 h-6" />
              ) : (
                <UserX className="w-6 h-6" />
              )}
            </div>

            <div className="text-center">
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                {confirmDialog.nextEnabled
                  ? 'Enable Applicant Account?'
                  : 'Disable Applicant Account?'}
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {confirmDialog.nextEnabled
                  ? `Enable the account for "${confirmDialog.applicant.fullName}". The applicant will be able to log in, apply for careers, and track their recruitment status.`
                  : `Are you sure you want to disable "${confirmDialog.applicant.fullName}"? Disabled applicants will be blocked from logging in to the portal.`}
              </p>
            </div>

            <div className="pt-3 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setConfirmDialog(null)}
                disabled={updatingStatus}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmStatusToggle}
                disabled={updatingStatus}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-white text-xs font-bold shadow-md transition-colors cursor-pointer ${
                  confirmDialog.nextEnabled
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                    : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                }`}
              >
                {updatingStatus && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>
                  {confirmDialog.nextEnabled ? 'Confirm Enable' : 'Confirm Disable'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminApplicants
