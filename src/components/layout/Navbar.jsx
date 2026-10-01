import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Menu, X, ArrowRight, Phone, Mail, ShieldAlert } from 'lucide-react'
import Container from '../common/Container'
import Button from '../common/Button'

// Import BSS logo from src/assets/images/ (e.g. logo.png, logo.svg, logo.webp, logo.jpg)
const logoModules = import.meta.glob('../../assets/images/logo.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
})
const bssLogoSrc = Object.values(logoModules)[0] || null

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Track window scroll to toggle subtle shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top SIS India style utility bar */}
      <div className="bg-[#0f172a] text-slate-300 text-xs py-1.5 hidden md:block border-b border-slate-800">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#c23235]" />
                <span className="font-medium">24/7 Helpline: +91 1800-890-BSS</span>
              </span>
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#c23235]" />
                <span>contact@bsssuraksha.com</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                24/7 Command & Control Center Active
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                PSARA Certified
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Corporate White Navigation */}
      <div
        className={`bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out border-b ${
          isScrolled
            ? 'border-slate-200/90 shadow-md py-3'
            : 'border-slate-200 py-4'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              to="/"
              className="flex items-center gap-3.5 group focus:outline-none"
              aria-label="BSS Suraksha Services Home"
            >
              {bssLogoSrc ? (
                <img
                  src={bssLogoSrc}
                  alt="BSS Suraksha Services Logo"
                  className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#c23235] text-white shadow-md shadow-red-700/20 group-hover:bg-[#a81c22] group-hover:scale-105 transition-all duration-200">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.4]" />
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-wider text-slate-900">
                    BSS
                  </span>
                  <span className="text-xl sm:text-2xl font-bold tracking-wider text-[#c23235]">
                    SURAKSHA
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] tracking-[0.2em] font-semibold uppercase text-slate-500">
                  Services Pvt. Ltd.
                </span>
              </div>
            </Link>

            {/* Center/Right Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-9" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `relative text-sm tracking-wide transition-colors duration-200 py-1.5 font-semibold ${
                      isActive
                        ? 'text-[#c23235]'
                        : 'text-slate-700 hover:text-[#c23235]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#c23235] rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Action: Prominent "Get a Quote" Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                to="/contact"
                variant="primary"
                size="md"
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-[#c23235] hover:bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c23235]/40"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#c23235]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer Navigation with Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white border-b border-slate-200 shadow-xl"
          >
            <Container className="py-4">
              <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                        isActive
                          ? 'bg-red-50 text-[#c23235] border-l-4 border-[#c23235] font-bold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-[#c23235] font-medium'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 opacity-40" />
                  </NavLink>
                ))}
              </nav>

              <div className="pt-4 mt-3 border-t border-slate-200 flex flex-col gap-3">
                <Button
                  to="/contact"
                  variant="primary"
                  size="md"
                  className="w-full justify-center text-center font-bold tracking-wider uppercase text-xs py-3"
                >
                  Get a Free Quote
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 py-1">
                  <Phone className="w-3.5 h-3.5 text-[#c23235]" />
                  <span>24/7 Security Helpline: +91 1800-890-BSS</span>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
