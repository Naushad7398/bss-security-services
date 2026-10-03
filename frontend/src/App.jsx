import React from 'react'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AppRoutes from './routes/AppRoutes'

function AppShell() {
  const location = useLocation()
  const isAdminRoute =
    location.pathname === '/admin' || location.pathname.startsWith('/admin/')

  if (isAdminRoute) {
    return <AppRoutes />
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-amber-500 selection:text-slate-950 font-sans">
      <Navbar />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  )
}

export default App
