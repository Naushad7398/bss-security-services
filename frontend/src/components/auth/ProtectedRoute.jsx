import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Loader2 } from 'lucide-react'

/**
 * Route protection wrapper supporting authentication verification and role-based access control.
 *
 * @param {React.ReactNode} children - Component to render when authorized.
 * @param {string[]} allowedRoles - Optional list of authorized roles (e.g. ['ADMIN']).
 */
export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth()
  const location = useLocation()

  // 1. While AuthContext resolves session on startup, render loading indicator without premature redirect
  if (loading) {
    return (
      <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Verifying Session...
          </p>
        </div>
      </div>
    )
  }

  // 2. Unauthenticated users are redirected to /login, preserving the originally requested URL
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // 3. Role-based check: if allowedRoles is specified, ensure user.role is authorized
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Authenticated user lacks permission (e.g. APPLICANT accessing ADMIN route)
    // Redirect safely to a safe fallback without exposing protected content
    return <Navigate to="/careers" replace />
  }

  // 4. Authorized: render child components or nested Outlet
  return children ? children : <Outlet />
}

export default ProtectedRoute
