import React, { useState, useEffect, useCallback } from 'react'
import {
  MessageSquare,
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
  Send,
  Building,
} from 'lucide-react'
import { adminContactQueriesApi } from '../../services/api'

// Enum values strictly matching backend QueryStatus.java
const STATUS_OPTIONS = [
  'ALL',
  'NEW',
  'CONTACTED',
  'IN_PROGRESS',
  'RESOLVED',
  'CLOSED',
]

const STATUS_CONFIG = {
  NEW: {
    label: 'New',
    className: 'bg-blue-50 text-blue-800 border-blue-200 font-bold',
  },
  CONTACTED: {
    label: 'Contacted',
    className: 'bg-amber-50 text-amber-900 border-amber-300 font-semibold',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    className: 'bg-purple-50 text-purple-900 border-purple-200 font-semibold',
  },
  RESOLVED: {
    label: 'Resolved',
    className: 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold',
  },
  CLOSED: {
    label: 'Closed',
    className: 'bg-slate-100 text-slate-700 border-slate-300 font-semibold',
  },
}

export const AdminContactQueries = () => {
  const [queries, setQueries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionSuccess, setActionSuccess] = useState('')

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  // Modal / Detail state
  const [selectedQuery, setSelectedQuery] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [modalError, setModalError] = useState('')

  // Status updating inline / in modal
  const [updatingId, setUpdatingId] = useState(null)

  const fetchQueries = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminContactQueriesApi.getAllQueries()
      setQueries(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Failed to fetch contact enquiries from backend.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchQueries()
  }, [fetchQueries])

  // Clear success notification after 4s
  useEffect(() => {
    if (actionSuccess) {
      const timer = setTimeout(() => setActionSuccess(''), 4000)
      return () => clearTimeout(timer)
    }
  }, [actionSuccess])

  // Open Full Details modal
  const handleOpenDetails = async (queryId) => {
    setModalLoading(true)
    setModalError('')
    try {
      const q = await adminContactQueriesApi.getQueryById(queryId)
      setSelectedQuery(q)
    } catch (err) {
      setModalError(err.message || 'Failed to load enquiry details.')
    } finally {
      setModalLoading(false)
    }
  }

  // Update Status action (PATCH /api/admin/contact-queries/{id}/status)
  const handleStatusChange = async (queryId, newStatus) => {
    setUpdatingId(queryId)
    setError('')
    try {
      const updated = await adminContactQueriesApi.updateQueryStatus(queryId, newStatus)
      setQueries((prev) =>
        prev.map((q) => (q.id === queryId ? updated : q))
      )
      if (selectedQuery && selectedQuery.id === queryId) {
        setSelectedQuery(updated)
      }
      setActionSuccess(`Enquiry #CQ-${String(queryId).padStart(3, '0')} status updated to ${newStatus.replace('_', ' ')}.`)
    } catch (err) {
      setError(err.message || `Failed to update status for enquiry #${queryId}.`)
    } finally {
      setUpdatingId(null)
    }
  }

  const formatRef = (id) => {
    if (!id) return 'CQ-000'
    return `CQ-${String(id).padStart(3, '0')}`
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

  // Filtered enquiries list
  const filteredQueries = queries.filter((q) => {
    const matchesStatus = statusFilter === 'ALL' || q.status === statusFilter
    const term = searchQuery.toLowerCase().trim()
    const matchesQuery =
      !term ||
      q.name?.toLowerCase().includes(term) ||
      q.email?.toLowerCase().includes(term) ||
      q.phone?.toLowerCase().includes(term) ||
      q.service?.toLowerCase().includes(term) ||
      q.message?.toLowerCase().includes(term) ||
      String(q.id).includes(term) ||
      formatRef(q.id).toLowerCase().includes(term)

    return matchesStatus && matchesQuery
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Contact Queries & Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage incoming security consultation requests, corporate enquiries, and client communications.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchQueries}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-600' : ''}`} />
            <span>Refresh Enquiries</span>
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
              placeholder="Search by name, email, phone, service, message..."
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
            Showing <span className="text-slate-900 font-black">{filteredQueries.length}</span> of {queries.length} enquiries
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
                ? queries.length
                : queries.filter((q) => q.status === status).length

            const label = status === 'ALL' ? 'All' : STATUS_CONFIG[status]?.label || status

            return (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  statusFilter === status
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    statusFilter === status ? 'bg-red-600 text-white font-bold' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content Area: Responsive Dual Layout */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Loading Client Enquiries...
          </p>
        </div>
      ) : filteredQueries.length === 0 ? (
        <div className="py-16 px-4 text-center bg-white rounded-2xl border border-slate-200">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No contact enquiries found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery || statusFilter !== 'ALL'
              ? 'Try resetting the status filter or clearing your search term.'
              : 'No corporate consultation requests have been submitted yet.'}
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
                    <th className="py-3.5 px-4">Ref</th>
                    <th className="py-3.5 px-4">Client Name</th>
                    <th className="py-3.5 px-4">Contact Info</th>
                    <th className="py-3.5 px-4">Requested Service</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Received Date</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredQueries.map((item) => {
                    const statusConf = STATUS_CONFIG[item.status] || {
                      label: item.status,
                      className: 'bg-slate-100 text-slate-700 border-slate-200',
                    }
                    const isUpdating = updatingId === item.id

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                        {/* Reference / ID */}
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-600 whitespace-nowrap">
                          {formatRef(item.id)}
                        </td>

                        {/* Client Name */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                        </td>

                        {/* Contact Info */}
                        <td className="py-3.5 px-4">
                          <div className="text-[11px] text-slate-600 flex flex-col gap-0.5">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-slate-400" />
                              {item.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-400" />
                              {item.phone}
                            </span>
                          </div>
                        </td>

                        {/* Service */}
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-slate-800">
                            {item.service || 'General Enquiry'}
                          </span>
                        </td>

                        {/* Status Inline Dropdown */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <select
                              value={item.status}
                              disabled={isUpdating}
                              onChange={(e) => handleStatusChange(item.id, e.target.value)}
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500/20 cursor-pointer transition-colors ${
                                statusConf.className
                              } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                              aria-label={`Change status for enquiry ${item.id}`}
                            >
                              <option value="NEW">New</option>
                              <option value="CONTACTED">Contacted</option>
                              <option value="IN_PROGRESS">In Progress</option>
                              <option value="RESOLVED">Resolved</option>
                              <option value="CLOSED">Closed</option>
                            </select>
                            {isUpdating && <Loader2 className="w-3 h-3 text-red-600 animate-spin" />}
                          </div>
                        </td>

                        {/* Received Date */}
                        <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{formatDate(item.createdAt)}</span>
                          </div>
                        </td>

                        {/* Action */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleOpenDetails(item.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-red-400" />
                            <span>View Details</span>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View (< md) */}
          <div className="md:hidden space-y-3">
            {filteredQueries.map((item) => {
              const statusConf = STATUS_CONFIG[item.status] || {
                label: item.status,
                className: 'bg-slate-100 text-slate-700 border-slate-200',
              }
              const isUpdating = updatingId === item.id

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-slate-400">{formatRef(item.id)}</span>
                        <h3 className="font-bold text-sm text-slate-900">{item.name}</h3>
                      </div>
                      <p className="text-xs text-red-600 font-semibold mt-0.5">
                        {item.service || 'General Enquiry'}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5">
                      <select
                        value={item.status}
                        disabled={isUpdating}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border cursor-pointer ${
                          statusConf.className
                        }`}
                      >
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="RESOLVED">Resolved</option>
                        <option value="CLOSED">Closed</option>
                      </select>
                      {isUpdating && <Loader2 className="w-3 h-3 text-red-600 animate-spin" />}
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{item.email}</span>
                      <span>•</span>
                      <span>{item.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] pt-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>Received: {formatDate(item.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleOpenDetails(item.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-red-400" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* Query Details Modal */}
      {(selectedQuery || modalLoading || modalError) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-wide text-white">
                    {selectedQuery?.name || 'Contact Enquiry'}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
                    <span className="font-mono text-slate-400">{formatRef(selectedQuery?.id)}</span>
                    <span>•</span>
                    <span className="text-red-400 font-semibold">{selectedQuery?.service || 'General Consultation'}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedQuery(null)
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
                  <p className="text-xs font-bold text-slate-500">Loading Enquiry Details...</p>
                </div>
              ) : modalError ? (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                  {modalError}
                </div>
              ) : selectedQuery ? (
                <>
                  {/* Status Banner with In-Modal Status Update */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        Current Enquiry Status
                      </span>
                      <span
                        className={`inline-block mt-1 px-3 py-1 rounded-lg text-xs font-bold border ${
                          STATUS_CONFIG[selectedQuery.status]?.className || 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {STATUS_CONFIG[selectedQuery.status]?.label || selectedQuery.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-600">Update Status:</span>
                      <select
                        value={selectedQuery.status}
                        disabled={updatingId === selectedQuery.id}
                        onChange={(e) => handleStatusChange(selectedQuery.id, e.target.value)}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 cursor-pointer"
                      >
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="RESOLVED">Resolved</option>
                        <option value="CLOSED">Closed</option>
                      </select>
                      {updatingId === selectedQuery.id && (
                        <Loader2 className="w-3.5 h-3.5 text-red-600 animate-spin" />
                      )}
                    </div>
                  </div>

                  {/* Client Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                        Client Information
                      </h4>
                      <div className="space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-bold text-slate-900">{selectedQuery.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <a href={`mailto:${selectedQuery.email}`} className="text-red-600 hover:underline">
                            {selectedQuery.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <a href={`tel:${selectedQuery.phone}`} className="text-slate-800 font-semibold hover:underline">
                            {selectedQuery.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                        Enquiry Meta
                      </h4>
                      <div className="space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <Building className="w-3.5 h-3.5 text-red-600 shrink-0" />
                          <span className="font-bold text-slate-900">
                            {selectedQuery.service || 'General Enquiry'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-[11px] pt-1">
                          <Clock className="w-3 h-3 shrink-0" />
                          <span>Submitted: {formatDateTime(selectedQuery.createdAt)}</span>
                        </div>
                        {selectedQuery.updatedAt && (
                          <div className="text-slate-400 text-[10px]">
                            Last updated: {formatDateTime(selectedQuery.updatedAt)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Full Message Body */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                      Client Message & Requirements
                    </h4>
                    <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 font-medium">
                      {selectedQuery.message}
                    </p>
                  </div>
                </>
              ) : null}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedQuery(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminContactQueries
