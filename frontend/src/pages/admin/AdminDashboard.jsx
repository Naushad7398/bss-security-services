import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  ArrowRight,
  TrendingUp,
  Shield,
  PlusCircle,
} from 'lucide-react'
import Button from '../../components/common/Button'
import { adminJobsApi, adminApplicationsApi } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

export const AdminDashboard = () => {
  const { user } = useAuth()
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchOverviewData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      // Concurrently query real backend admin endpoints
      const [jobsData, appsData] = await Promise.all([
        adminJobsApi.getAllJobs(),
        adminApplicationsApi.getAllApplications(),
      ])
      setJobs(Array.isArray(jobsData) ? jobsData : [])
      setApplications(Array.isArray(appsData) ? appsData : [])
    } catch (err) {
      setError(err.message || 'Failed to fetch administrative data. Verify backend connection.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOverviewData()
  }, [fetchOverviewData])

  // Derive exact metric aggregates strictly from real backend records
  const totalJobs = jobs.length
  const publishedJobs = jobs.filter((j) => j.status === 'PUBLISHED').length
  const draftJobs = jobs.filter((j) => j.status === 'DRAFT').length
  const totalApplications = applications.length
  const pendingReviewApps = applications.filter(
    (a) => a.status === 'APPLIED' || a.status === 'UNDER_REVIEW'
  ).length
  const shortlistedApps = applications.filter((a) => a.status === 'SHORTLISTED').length
  const selectedApps = applications.filter((a) => a.status === 'SELECTED').length

  const recentApplications = applications.slice(0, 5)
  const recentJobs = jobs.slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0a192f] via-slate-900 to-[#0f2744] rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Command & Administration Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Welcome back, {user?.fullName || 'Administrator'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Real-time management overview for BSS security personnel recruitment and career opportunities.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button to="/admin/jobs" variant="primary" size="md">
            <PlusCircle className="w-4 h-4" />
            <span>Create New Job</span>
          </Button>
          <Button to="/admin/applications" variant="secondary" size="md">
            <span>Review Applications</span>
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-20 flex flex-col items-center justify-center gap-3 bg-white rounded-3xl border border-slate-200">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Fetching Operational Statistics...
          </p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="p-8 rounded-3xl bg-white border border-red-200 text-center max-w-xl mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">Data Retrieval Interrupted</h3>
          <p className="text-xs text-slate-600 mb-5">{error}</p>
          <Button onClick={fetchOverviewData} variant="secondary" size="sm">
            Retry Loading
          </Button>
        </div>
      )}

      {/* Metrics Grid — Derived from Real Backend Records Only */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Total Jobs */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Total Job Positions
                </p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{totalJobs}</p>
                <p className="text-[11px] text-amber-700 font-semibold mt-1">
                  {publishedJobs} Published • {draftJobs} Draft
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
            </div>

            {/* Total Applications */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Total Applications
                </p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{totalApplications}</p>
                <p className="text-[11px] text-blue-700 font-semibold mt-1">
                  From registered applicants
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
            </div>

            {/* Pending Review */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Pending Review
                </p>
                <p className="text-2xl sm:text-3xl font-black text-amber-600">{pendingReviewApps}</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Applied or Under Review
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            {/* Selected Candidates */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Selected / Shortlisted
                </p>
                <p className="text-2xl sm:text-3xl font-black text-emerald-600">
                  {selectedApps} <span className="text-sm font-semibold text-slate-400">/ {shortlistedApps}</span>
                </p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                  Selected vs Shortlisted
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Quick Tables: Recent Applications & Active Jobs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Applications Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recent Applications</h3>
                  <p className="text-xs text-slate-500">Latest candidate submissions</p>
                </div>
                <Link
                  to="/admin/applications"
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  View All ({totalApplications})
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {recentApplications.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs font-medium">
                  No applications received yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {recentApplications.map((app) => (
                    <div
                      key={app.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate">{app.applicantName}</p>
                        <p className="text-slate-500 truncate">{app.jobTitle}</p>
                      </div>
                      <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-700">
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Jobs Management Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Configured Job Postings</h3>
                  <p className="text-xs text-slate-500">Current vacancies in system</p>
                </div>
                <Link
                  to="/admin/jobs"
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  View All ({totalJobs})
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {recentJobs.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs font-medium">
                  No jobs configured yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {recentJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate">{job.title}</p>
                        <p className="text-slate-500 truncate">{job.department} • {job.location}</p>
                      </div>
                      <span
                        className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          job.status === 'PUBLISHED'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminDashboard
