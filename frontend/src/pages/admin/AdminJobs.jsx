import React, { useState, useEffect, useCallback } from 'react'
import {
  Briefcase,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Calendar,
  MapPin,
  Clock,
  X,
  Filter,
} from 'lucide-react'
import Button from '../../components/common/Button'
import { adminJobsApi } from '../../services/api'

const JOB_STATUSES = ['DRAFT', 'PUBLISHED', 'CLOSED']

export const AdminJobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Modal / Form state
  const [modalOpen, setModalOpen] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    employmentType: 'Full Time',
    experience: '',
    salaryRange: '',
    description: '',
    responsibilities: '',
    requirements: '',
    skills: '',
    deadline: '',
    status: 'PUBLISHED',
  })
  const [formErrors, setFormErrors] = useState({})
  const [saving, setSaving] = useState(false)

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetchJobs = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminJobsApi.getAllJobs()
      setJobs(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Failed to fetch jobs list from backend.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const openCreateModal = () => {
    setEditingJob(null)
    setFormData({
      title: '',
      department: '',
      location: '',
      employmentType: 'Full Time',
      experience: '',
      salaryRange: '',
      description: '',
      responsibilities: '',
      requirements: '',
      skills: '',
      deadline: '',
      status: 'PUBLISHED',
    })
    setFormErrors({})
    setModalOpen(true)
  }

  const openEditModal = (job) => {
    setEditingJob(job)
    setFormData({
      title: job.title || '',
      department: job.department || '',
      location: job.location || '',
      employmentType: job.employmentType || 'Full Time',
      experience: job.experience || '',
      salaryRange: job.salaryRange || '',
      description: job.description || '',
      responsibilities: job.responsibilities || '',
      requirements: job.requirements || '',
      skills: job.skills || '',
      deadline: job.deadline || '',
      status: job.status || 'PUBLISHED',
    })
    setFormErrors({})
    setModalOpen(true)
  }

  const validate = () => {
    const errors = {}
    if (!formData.title.trim()) errors.title = 'Title is required'
    if (!formData.department.trim()) errors.department = 'Department is required'
    if (!formData.location.trim()) errors.location = 'Location is required'
    if (!formData.employmentType.trim()) errors.employmentType = 'Employment type is required'
    if (!formData.experience.trim()) errors.experience = 'Experience criteria is required'
    if (!formData.description.trim()) errors.description = 'Description is required'
    if (!formData.responsibilities.trim()) errors.responsibilities = 'Responsibilities are required'
    if (!formData.requirements.trim()) errors.requirements = 'Requirements are required'
    if (!formData.skills.trim()) errors.skills = 'Skills are required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSaving(true)
    setError('')
    try {
      const payload = {
        title: formData.title.trim(),
        department: formData.department.trim(),
        location: formData.location.trim(),
        employmentType: formData.employmentType.trim(),
        experience: formData.experience.trim(),
        salaryRange: formData.salaryRange.trim() || null,
        description: formData.description.trim(),
        responsibilities: formData.responsibilities.trim(),
        requirements: formData.requirements.trim(),
        skills: formData.skills.trim(),
        deadline: formData.deadline || null,
        status: formData.status,
      }

      if (editingJob) {
        await adminJobsApi.updateJob(editingJob.id, payload)
        setSuccessMessage('Job position updated successfully.')
      } else {
        await adminJobsApi.createJob(payload)
        setSuccessMessage('New job position created successfully.')
      }

      setModalOpen(false)
      fetchJobs()
      setTimeout(() => setSuccessMessage(''), 4000)
    } catch (err) {
      setError(err.message || 'Operation failed. Please review fields and try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await adminJobsApi.updateJobStatus(jobId, newStatus)
      setJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
      )
      setSuccessMessage(`Job status updated to ${newStatus}.`)
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError(err.message || 'Failed to update job status.')
    }
  }

  const handleDelete = async (jobId) => {
    setDeleting(true)
    setError('')
    try {
      await adminJobsApi.deleteJob(jobId)
      setJobs((prev) => prev.filter((j) => j.id !== jobId))
      setDeleteConfirmId(null)
      setSuccessMessage('Job listing deleted successfully.')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError(err.message || 'Failed to delete job.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Job Postings Management</h1>
          <p className="text-xs text-slate-500">
            Publish, edit, and organize security vacancies on the public Careers portal.
          </p>
        </div>
        <Button onClick={openCreateModal} variant="primary" size="md">
          <Plus className="w-4 h-4" />
          <span>Post New Job</span>
        </Button>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError('')} className="text-red-500 hover:text-red-800 text-xs">
            Dismiss
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="py-20 flex flex-col items-center justify-center gap-3 bg-white rounded-3xl border border-slate-200">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Loading Job Records...
          </p>
        </div>
      )}

      {/* Jobs Table & Cards */}
      {!loading && jobs.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">No Jobs Found</h3>
          <p className="text-xs text-slate-500 mb-4">Click "Post New Job" to create your first vacancy listing.</p>
          <Button onClick={openCreateModal} variant="primary" size="sm">
            Create Job Now
          </Button>
        </div>
      ) : (
        !loading && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-4 sm:px-6">Title & Department</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Type</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Deadline</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <p className="font-bold text-slate-900 text-sm">{job.title}</p>
                        <p className="text-slate-500 text-[11px]">{job.department} • Exp: {job.experience}</p>
                      </td>
                      <td className="py-4 px-4 text-slate-700 font-medium">
                        {job.location}
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {job.employmentType}
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={job.status}
                          onChange={(e) => handleStatusChange(job.id, e.target.value)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                            job.status === 'PUBLISHED'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : job.status === 'DRAFT'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-rose-50 text-rose-800 border-rose-300'
                          }`}
                        >
                          {JOB_STATUSES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {job.deadline || 'Ongoing'}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(job)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-slate-100 transition-colors"
                            title="Edit Job"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(job.id)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Job"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Job Listing?</h3>
            <p className="text-xs text-slate-600">
              This action permanently deletes this job vacancy. Any existing candidate applications linked to it will be affected.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button onClick={() => setDeleteConfirmId(null)} variant="ghost" size="sm" disabled={deleting}>
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(deleteConfirmId)}
                variant="primary"
                size="sm"
                className="bg-rose-600 hover:bg-rose-700 text-white border-rose-600"
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Confirm Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Job Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
            <div className="bg-[#0a192f] text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
              <h2 className="text-base font-black tracking-wide text-white">
                {editingJob ? 'Edit Job Posting' : 'Post New Job Vacancy'}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-4 text-xs">
              {/* Title & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Job Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Senior Security Supervisor"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                  />
                  {formErrors.title && <p className="text-rose-600 mt-1">{formErrors.title}</p>}
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Department *</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. Manned Guarding"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                  />
                  {formErrors.department && <p className="text-rose-600 mt-1">{formErrors.department}</p>}
                </div>
              </div>

              {/* Location & Employment Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Delhi NCR / Gorakhpur"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                  />
                  {formErrors.location && <p className="text-rose-600 mt-1">{formErrors.location}</p>}
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Employment Type *</label>
                  <input
                    type="text"
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    placeholder="e.g. Full Time / Shift Basis"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                  />
                  {formErrors.employmentType && <p className="text-rose-600 mt-1">{formErrors.employmentType}</p>}
                </div>
              </div>

              {/* Experience & Salary Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Experience *</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. 2-3 Years / Fresher"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                  />
                  {formErrors.experience && <p className="text-rose-600 mt-1">{formErrors.experience}</p>}
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Salary Range (Optional)</label>
                  <input
                    type="text"
                    value={formData.salaryRange}
                    onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                    placeholder="e.g. ₹18,000 - ₹25,000 / month"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                  />
                </div>
              </div>

              {/* Deadline & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Initial Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-bold"
                  >
                    {JOB_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Description *</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Overview of the vacancy..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 resize-none"
                />
                {formErrors.description && <p className="text-rose-600 mt-1">{formErrors.description}</p>}
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Responsibilities *</label>
                <textarea
                  rows={3}
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  placeholder="Key duties on duty..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 resize-none"
                />
                {formErrors.responsibilities && <p className="text-rose-600 mt-1">{formErrors.responsibilities}</p>}
              </div>

              {/* Requirements */}
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Requirements *</label>
                <textarea
                  rows={2}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Physical and educational standards..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 resize-none"
                />
                {formErrors.requirements && <p className="text-rose-600 mt-1">{formErrors.requirements}</p>}
              </div>

              {/* Skills */}
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Skills (Comma-separated) *</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="e.g. Guarding, Access Control, Fire Safety"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                />
                {formErrors.skills && <p className="text-rose-600 mt-1">{formErrors.skills}</p>}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <Button type="button" onClick={() => setModalOpen(false)} variant="ghost" size="sm" disabled={saving}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" disabled={saving}>
                  {saving ? (
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Saving...
                    </span>
                  ) : editingJob ? (
                    'Save Changes'
                  ) : (
                    'Publish Job'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminJobs
