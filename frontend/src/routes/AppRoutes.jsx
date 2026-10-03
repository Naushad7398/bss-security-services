import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Services from '../pages/Services'
import Industries from '../pages/Industries'
import Careers from '../pages/Careers'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import Register from '../pages/Register'
import MyApplications from '../pages/MyApplications'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import AdminLayout from '../components/admin/AdminLayout'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminJobs from '../pages/admin/AdminJobs'
import AdminApplications from '../pages/admin/AdminApplications'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/industries" element={<Industries />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/my-applications"
        element={
          <ProtectedRoute allowedRoles={['APPLICANT']}>
            <MyApplications />
          </ProtectedRoute>
        }
      />

      {/* Admin routes protected by ROLE_ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="jobs" element={<AdminJobs />} />
        <Route path="applications" element={<AdminApplications />} />
      </Route>

      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default AppRoutes
