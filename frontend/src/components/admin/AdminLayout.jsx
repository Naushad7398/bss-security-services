import React, { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  LogOut,
  Shield,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export const AdminLayout = ({ children, title = 'Administration' }) => {
  const { user, logout } = useAuth()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const location = useLocation()

  // Navigation items strictly limited to implemented backend features
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
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0a192f] text-slate-300">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-md shadow-amber-600/20 font-black">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-wide text-white">BSS</span>
              <span className="text-base font-black tracking-wide bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                SURAKSHA
              </span>
            </div>
            <p className="text-[10px] uppercase font-bold tracking-[0.18em] text-slate-400">
              Admin Command
            </p>
          </div>
        </Link>
      </div>

      {/* Admin User Profile Tag */}
      <div className="p-4 mx-4 my-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
        <div className="min-w-0 pr-2">
          <p className="text-xs font-bold text-white truncate">{user?.fullName || 'Administrator'}</p>
          <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
            {user?.role || 'ADMIN'}
          </span>
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Admin Session Active" />
      </div>

      {/* Nav List */}
      <div className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        <p className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-500">
          Management Controls
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
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'text-slate-950' : 'text-slate-500'}`}
              />
            </NavLink>
          )
        })}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          to="/"
          className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            View Public Website
          </span>
          <span className="text-[10px] text-slate-500">Live</span>
        </Link>
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Terminate Session</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 border-r border-slate-800 shadow-xl z-30">
        <div className="fixed top-0 bottom-0 w-72">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="lg:hidden bg-[#0a192f] text-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <Link to="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-black text-white">BSS SURAKSHA</span>
            <span className="text-[9px] uppercase tracking-wider text-amber-400 block font-bold">Admin</span>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
