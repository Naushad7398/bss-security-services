import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, User, Mail, Phone, Lock, Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import { useAuth } from '../context/AuthContext'

export const Register = () => {
  const navigate = useNavigate()
  const { register } = useAuth()

  // State matches backend RegisterRequest: fullName, email, phone, password
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }))
    }
    if (error) setError('')
  }

  const validate = () => {
    const errors = {}

    // Full name validation (min 2, max 100)
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required'
    } else if (formData.fullName.trim().length < 2 || formData.fullName.trim().length > 100) {
      errors.fullName = 'Full name must be between 2 and 100 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address'
    }

    // Phone validation (min 10, max 15)
    const cleanPhone = formData.phone.trim()
    if (!cleanPhone) {
      errors.phone = 'Phone number is required'
    } else if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      errors.phone = 'Phone number must be between 10 and 15 digits'
    }

    // Password validation (min 6, max 100)
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Dispatch payload strictly matching backend RegisterRequest
      await register({
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
      })

      setSuccess('Account created successfully! Redirecting to login...')

      // Redirect to login after brief confirmation delay
      setTimeout(() => {
        navigate('/login', {
          state: { message: 'Registration successful! Please log in with your credentials.' },
        })
      }, 1500)
    } catch (err) {
      setError(err.message || 'Registration failed. Please review your details and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-slate-50 min-h-screen flex items-center">
      <Container>
        <div className="max-w-md mx-auto">
          {/* Back to Home Link */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-amber-600 transition-colors uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Registration Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl shadow-slate-200/50">
            {/* Header / Brand */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0a192f] text-amber-400 mb-4 shadow-md shadow-slate-900/10">
                <Shield className="w-7 h-7 stroke-[2.2]" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Create Account
              </h1>
              <p className="text-sm text-slate-600 mt-1.5">
                Register with BSS Suraksha Services
              </p>
            </div>

            {/* Success Banner */}
            {success && (
              <div
                role="status"
                className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{success}</span>
              </div>
            )}

            {/* Error Banner */}
            {error && (
              <div
                role="alert"
                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5"
              >
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{error}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    disabled={loading}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border text-slate-900 text-sm focus:outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                      validationErrors.fullName
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                    }`}
                  />
                </div>
                {validationErrors.fullName && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {validationErrors.fullName}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    disabled={loading}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border text-slate-900 text-sm focus:outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                      validationErrors.email
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                    }`}
                  />
                </div>
                {validationErrors.email && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    disabled={loading}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border text-slate-900 text-sm focus:outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                      validationErrors.phone
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                    }`}
                  />
                </div>
                {validationErrors.phone && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {validationErrors.phone}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    disabled={loading}
                    className={`w-full pl-10 pr-10 py-2.5 rounded-lg bg-slate-50 border text-slate-900 text-sm focus:outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                      validationErrors.password
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {validationErrors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={loading}
                  className="w-full justify-center py-3 text-xs font-black uppercase tracking-wider"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating Account...
                    </span>
                  ) : (
                    'Register Account'
                  )}
                </Button>
              </div>
            </form>

            {/* Footer / Login Link */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <p className="text-xs text-slate-600">
                Already registered with BSS?{' '}
                <Link
                  to="/login"
                  className="font-bold text-amber-600 hover:text-amber-700 transition-colors ml-1"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Register
