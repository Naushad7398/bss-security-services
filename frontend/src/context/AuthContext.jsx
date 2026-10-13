import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authApi, getAuthToken, setAuthToken, clearAuthToken } from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null
    try {
      const stored = localStorage.getItem('bss_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(true)

  // Fetch or refresh authenticated user profile using /api/auth/me
  const refreshUser = useCallback(async () => {
    const token = getAuthToken()
    if (!token) {
      setUser(null)
      try { localStorage.removeItem('bss_user') } catch {}
      setLoading(false)
      return null
    }

    try {
      const userData = await authApi.getCurrentUser()
      setUser(userData)
      try { localStorage.setItem('bss_user', JSON.stringify(userData)) } catch {}
      return userData
    } catch (error) {
      console.warn('Authentication verification note:', error.message)
      // Only clear credentials if the backend explicitly rejected authentication with 401/403
      if (error?.status === 401 || error?.status === 403) {
        clearAuthToken()
        setUser(null)
        try { localStorage.removeItem('bss_user') } catch {}
      }
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // On application startup: verify token and load user once
  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  // Login flow: authenticate, persist JWT, and fetch current user profile
  const login = async (credentials) => {
    const authResponse = await authApi.login(credentials)
    const token =
      authResponse?.token ||
      authResponse?.accessToken ||
      authResponse?.jwt ||
      authResponse?.data?.token
    if (token) {
      setAuthToken(token)
    }

    let userProfile = null
    try {
      userProfile = await authApi.getCurrentUser()
    } catch (err) {
      console.warn('Could not fetch /auth/me after login, using login payload:', err.message)
      if (authResponse && (authResponse.fullName || authResponse.email)) {
        userProfile = {
          id: authResponse.id,
          fullName: authResponse.fullName,
          email: authResponse.email,
          role: authResponse.role,
        }
      }
    }

    if (userProfile) {
      setUser(userProfile)
      try { localStorage.setItem('bss_user', JSON.stringify(userProfile)) } catch {}
    }
    return userProfile
  }

  // Registration flow: submit user registration and return raw backend response
  const register = async (userData) => {
    const result = await authApi.register(userData)
    return result
  }

  // Logout flow: remove stored token and reset user state
  const logout = () => {
    clearAuthToken()
    setUser(null)
    try { localStorage.removeItem('bss_user') } catch {}
  }

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'ADMIN',
    login,
    register,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook for accessing the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
