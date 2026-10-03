import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/common/Container'
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import JobDetailsModal from '../components/careers/JobDetailsModal'
import { jobsApi } from '../services/api'
import { AlertCircle, Briefcase, Loader2, RefreshCw, ShieldCheck } from 'lucide-react'

export const Careers = () => {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedJob, setSelectedJob] = useState(null)

  const fetchJobs = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await jobsApi.getPublishedJobs()
      setJobs(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Unable to load current career openings.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const openApplication = (job) => {
    navigate(`/careers/apply/${job.id}`)
  }

  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-slate-50 min-h-screen">
      <Container>
        <SectionTitle
          subtitle="Join India's Disciplined Security Force"
          title="Careers at BSS Suraksha Services"
          description="Build an honorable and rewarding career with a disciplined, professionally run security organization that values its workforce."
        />

        {loading && (
          <div className="my-16 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Loading Current Openings...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="my-12 p-8 rounded-3xl bg-white border border-red-200 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Could Not Load Openings</h3>
            <p className="text-xs text-slate-600 mb-5">{error}</p>
            <Button onClick={fetchJobs} variant="secondary" size="sm">
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="my-12 p-10 rounded-3xl bg-white border border-slate-200 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Briefcase className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No Open Positions</h3>
            <p className="text-xs text-slate-600">
              There are no published career openings at the moment. Please check back soon.
            </p>
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-amber-500/80 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                    {job.employmentType && (
                      <span className="text-xs bg-amber-50 text-amber-900 px-2.5 py-1 rounded-md border border-amber-200 font-extrabold shrink-0">
                        {job.employmentType}
                      </span>
                    )}
                  </div>
                  {job.department && (
                    <p className="text-xs text-amber-700 mb-2 font-bold uppercase tracking-wider">
                      {job.department}
                    </p>
                  )}
                  {job.location && (
                    <p className="text-xs text-slate-500 mb-2 font-medium">
                      Location: {job.location}
                    </p>
                  )}
                  {job.experience && (
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      <strong className="text-slate-800">Experience:</strong> {job.experience}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                  <Button
                    onClick={() => setSelectedJob(job)}
                    variant="outline"
                    size="sm"
                    className="flex-1 justify-center"
                  >
                    View Details
                  </Button>
                  <Button
                    onClick={() => openApplication(job)}
                    variant="primary"
                    size="sm"
                    className="flex-1 justify-center"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-amber-200/80 shadow-md text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <h4 className="text-xl font-black text-slate-900 mb-2">Fair Employment & Benefits</h4>
          <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
            Like India's top security institutions, we provide 100% on-time statutory compensation, PF & ESIC coverage, uniforms, lodging support, and clear promotion pathways for dedicated personnel.
          </p>
        </div>
      </Container>

      <JobDetailsModal
        job={selectedJob}
        isOpen={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
        onApply={openApplication}
      />
    </div>
  )
}

export default Careers
