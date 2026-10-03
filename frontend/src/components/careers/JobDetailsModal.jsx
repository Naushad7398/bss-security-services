import React from 'react'
import { X, Briefcase, MapPin, Clock, DollarSign, Calendar, CheckCircle2, Shield } from 'lucide-react'
import Button from '../common/Button'

export const JobDetailsModal = ({ job, isOpen, onClose, onApply }) => {
  if (!isOpen || !job) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="job-details-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0a192f] text-white px-6 sm:px-8 py-6 flex items-start justify-between border-b border-slate-800">
          <div className="pr-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              <Shield className="w-4 h-4" />
              <span>{job.department || 'Operations'}</span>
            </div>
            <h2 id="job-details-title" className="text-xl sm:text-2xl font-black text-white">
              {job.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close job details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[calc(85vh-120px)] overflow-y-auto space-y-6">
          {/* Metadata badges */}
          <div className="flex flex-wrap gap-2.5">
            {job.location && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                {job.location}
              </span>
            )}
            {job.employmentType && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
                <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                {job.employmentType}
              </span>
            )}
            {job.experience && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Exp: {job.experience}
              </span>
            )}
            {job.salaryRange && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                {job.salaryRange}
              </span>
            )}
            {job.deadline && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 text-xs font-semibold">
                <Calendar className="w-3.5 h-3.5 text-rose-600" />
                Deadline: {job.deadline}
              </span>
            )}
          </div>

          {/* Description */}
          {job.description && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                Job Overview
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>
          )}

          {/* Responsibilities */}
          {job.responsibilities && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                Key Responsibilities
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {job.responsibilities}
              </p>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                Candidate Requirements
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {job.requirements}
              </p>
            </div>
          )}

          {/* Key Skills */}
          {job.skills && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                Desired Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.split(',').map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-medium"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button onClick={onClose} variant="ghost" size="md">
              Close
            </Button>
            <Button
              onClick={() => {
                onClose()
                onApply(job)
              }}
              variant="primary"
              size="md"
            >
              Apply for this Job
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsModal
