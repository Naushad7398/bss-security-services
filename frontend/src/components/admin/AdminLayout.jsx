import React, { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  MessageSquare,
  LogOut,
  Shield,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  User,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

// Import BSS logo from src/assets/images/ (e.g. logo.png)
const logoModules = import.meta.glob('../../assets/images/logo.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
})
const bssLogoSrc = Object.values(logoModules)[0] || null

export const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const location = useLocation()

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [location.pathname])

  // Handle ESC key to dismiss mobile drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileSidebarOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Navigation items strictly limited to verified, implemented backend features
  const navigationItems = [
    {
      name: 'Dashboard Overview',
      path: '/admin',
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: 'Job Postings',
      path: '/admin/jobs',
      icon: Briefcase,
      end: false,
    },
    {
      name: 'Candidate Applications',
      path: '/admin/applications',
      icon: FileText,
      end: false,
    },
    {
      name: 'Applicants',
      path: '/admin/applicants',
      icon: Users,
      end: false,
    },
    {
      name: 'Contact Queries',
      path: '/admin/contact-queries',
      icon: MessageSquare,
      end: false,
    },
  ]

  // Determine current active page label for breadcrumbs
  const activeNavItem = navigationItems.find((item) =>
    item.end ? location.pathname === item.path : location.pathname.startsWith(item.path)
  )
  const currentTitle = activeNavItem ? activeNavItem.name : 'Portal Administration'

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0f172a] text-slate-300 border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 bg-[#0b1120]">
        <Link to="/admin" className="flex items-center gap-3 group focus:outline-none">
          {bssLogoSrc ? (
            <img
              src={bssLogoSrc}
              alt="BSS Suraksha Crest"
              className="h-10 w-auto object-contain filter drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/30 font-black">
              <Shield className="w-5 h-5 stroke-[2.4]" />
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-wider text-white">BSS</span>
              <span className="text-base font-black tracking-wider text-red-500">
                SURAKSHA
              </span>
            </div>
            <p className="text-[10px] uppercase font-bold tracking-[0.16em] text-slate-400 truncate">
              Corporate Security Desk
            </p>
          </div>
        </Link>
      </div>

      {/* Admin User Badge */}
      <div className="p-3.5 mx-4 my-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-red-600/10 border border-red-600/30 text-red-400 flex items-center justify-center font-bold text-xs shrink-0">
            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">{user?.fullName || 'Administrator'}</p>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono uppercase tracking-wider text-red-400 font-bold">
                {user?.role || 'ADMIN'}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
        <p className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500">
          Operational Controls
        </p>
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = item.end
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path)

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setMobileSidebarOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                isActive
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/25 border-l-4 border-white'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 ${isActive ? 'text-white opacity-80' : 'text-slate-500'}`}
              />
            </NavLink>
          )
        })}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-800/80 space-y-2 bg-[#0b1120]">
        <Link
          to="/"
          className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            View Public Website
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Live</span>
        </Link>
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Terminate Session</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row text-slate-900 font-sans">
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 z-30">
        <div className="fixed top-0 bottom-0 w-72 shadow-xl">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="lg:hidden bg-[#0f172a] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <Link to="/admin" className="flex items-center gap-2.5">
          {bssLogoSrc ? (
            <img src={bssLogoSrc} alt="BSS Logo" className="h-8 w-auto object-contain" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black">
              <Shield className="w-4 h-4" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-black text-white">BSS</span>
              <span className="text-sm font-black text-red-500">SURAKSHA</span>
            </div>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">
              Admin Portal
            </span>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5 text-red-500" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Administrative Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Command Bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-600" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              BSS Administration
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-sm font-black text-slate-900 tracking-tight">
              {currentTitle}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
              <span>PSARA Compliant Operations</span>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-red-600 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </Link>
          </div>
        </div>

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
