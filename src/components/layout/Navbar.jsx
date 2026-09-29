import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Menu, X, ArrowRight, Phone } from 'lucide-react'
import Container from '../common/Container'
import Button from '../common/Button'

// Import BSS logo from src/assets/images/ (e.g. logo.png, logo.svg, logo.webp, logo.jpg)
// Place your logo image file at: src/assets/images/logo.png or src/assets/images/logo.svg
const logoModules = import.meta.glob('../../assets/images/logo.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
})
const bssLogoSrc = Object.values(logoModules)[0] || null

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Track window scroll to toggle glass blur background
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80 shadow-xl shadow-black/40 py-3.5'
          : 'bg-transparent border-b border-white/5 py-5'
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
              <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 shadow-md shadow-amber-500/25 border border-amber-300/40 group-hover:shadow-amber-500/40 group-hover:scale-105 transition-all duration-200">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 stroke-[2.4]" />
              </div>
            )}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-wider text-white">
                  BSS
                </span>
                <span className="text-xl sm:text-2xl font-bold tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  SURAKSHA
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] font-medium uppercase text-slate-400">
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
                  `relative text-sm tracking-wide transition-colors duration-200 py-1.5 ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-slate-300 hover:text-white font-medium'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-full shadow-sm shadow-amber-400/50"
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
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-amber-500/20"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="lg:hidden p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Navigation with Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-[#070b14]/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl"
          >
            <Container className="py-5">
              <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all duration-150 ${
                        isActive
                          ? 'bg-amber-500/10 text-amber-400 border-l-4 border-amber-400 font-semibold'
                          : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 opacity-40" />
                  </NavLink>
                ))}
              </nav>

              <div className="pt-5 mt-4 border-t border-slate-800/80 flex flex-col gap-3">
                <Button
                  to="/contact"
                  variant="primary"
                  size="md"
                  className="w-full justify-center text-center font-bold tracking-wider uppercase text-xs py-3"
                >
                  Get a Free Quote
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 py-1">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>24/7 Security Support: +91 XXXXX XXXXX</span>
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