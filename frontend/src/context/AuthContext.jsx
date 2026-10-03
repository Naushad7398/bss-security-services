import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authApi, getAuthToken, setAuthToken, clearAuthToken } from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch or refresh authenticated user profile using /api/auth/me
  const refreshUser = useCallback(async () => {
    const token = getAuthToken()
    if (!token) {
      setUser(null)
      setLoading(false)
      return null
    }

    try {
      const userData = await authApi.getCurrentUser()
      setUser(userData)
      return userData
    } catch (error) {
      console.warn('Authentication token invalid or expired:', error.message)
      clearAuthToken()
      setUser(null)
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
    if (authResponse && authResponse.token) {
      setAuthToken(authResponse.token)
    }
    const userProfile = await authApi.getCurrentUser()
    setUser(userProfile)
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
