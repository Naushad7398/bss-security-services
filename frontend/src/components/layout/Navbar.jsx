import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Menu, X, ArrowRight, Phone, Mail } from 'lucide-react'
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      {/* Top Utility Bar in Imperial Navy */}
      <div className="bg-[#0a192f] text-slate-300 text-xs py-2 hidden md:block border-b border-slate-800">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-medium">24/7 Helpline: +91 96641 54689</span>
              </span>
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>bsssuraksha@gmail.com</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                24/7 Command & Control Center Active
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold">
                PSARA Certified
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Corporate White Navigation */}
      <div
        className={`bg-white/98 backdrop-blur-md transition-all duration-300 ease-in-out border-b ${
          isScrolled
            ? 'border-slate-200/90 shadow-md py-2.5'
            : 'border-slate-200 py-3.5'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Brand Logo & Name */}
            <Link
              to="/"
              className="flex items-center gap-3.5 group focus:outline-none"
              aria-label="BSS Suraksha Services Home"
            >
              {bssLogoSrc ? (
                <img
                  src={bssLogoSrc}
                  alt="BSS Suraksha Services Crest"
                  className="h-12 sm:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105 filter drop-shadow-sm"
                />
              ) : (
                <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 shadow-md shadow-amber-600/30">
                  <Shield className="w-6 h-6 stroke-[2.4]" />
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-wider text-slate-950">
                    BSS
                  </span>
                  <span className="text-xl sm:text-2xl font-black tracking-wider bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                    SURAKSHA
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] tracking-[0.2em] font-bold uppercase text-slate-500">
                  Services Pvt. Ltd.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-9" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `relative text-sm tracking-wide transition-colors duration-200 py-1.5 font-bold ${
                      isActive
                        ? 'text-amber-600'
                        : 'text-slate-700 hover:text-amber-600'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Action Button: Gilded Gold Quote Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                to="/contact"
                variant="primary"
                size="md"
                className="px-5 py-2.5 text-xs font-black uppercase tracking-wider"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-amber-600 hover:bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer Navigation */}
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
                          ? 'bg-amber-50 text-amber-800 border-l-4 border-amber-500 font-bold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-amber-600 font-semibold'
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
                  className="w-full justify-center text-center font-black tracking-wider uppercase text-xs py-3"
                >
                  Get a Free Quote
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-600 py-1">
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span>24/7 Security Helpline: +91 96641 54689</span>
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
