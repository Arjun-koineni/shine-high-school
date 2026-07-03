import React, { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react'
import './Navbar.css'

const navLinks = [
  { label: 'Home',       path: '/' },
  { label: 'Academics',  path: '/#academics' },
  { label: 'About Us',   path: '/#about' },
  { label: 'Gallery',    path: '/gallery' },
  { label: 'Calendar',   path: '/calendar' },
  { label: 'Contact',    path: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = useCallback((path) => {
    setMenuOpen(false)
    if (path.includes('#')) {
      const [route, hash] = path.split('#')
      if (location.pathname !== route && route !== '') {
        navigate(route)
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(path)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.pathname, navigate])

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    if (path.startsWith('/#')) return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <div className="navbar__logo-icon">
              <img src="/logo.png" alt="Shine High School" onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
              <div className="navbar__logo-fallback" style={{display:'none'}}>
                <GraduationCap size={28} />
              </div>
            </div>
            <div className="navbar__logo-text">
              <span className="navbar__school-name">Shine High School</span>
              <span className="navbar__school-tag">Bonakal, Khammam</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="navbar__links">
            {navLinks.map(link => (
              <li key={link.path}>
                <button
                  className={`navbar__link ${isActive(link.path) ? 'navbar__link--active' : ''}`}
                  onClick={() => handleNavClick(link.path)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="navbar__cta hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate('/admissions')}
            >
              Apply Now
            </button>
          </div>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'mobile-drawer--open' : ''}`}>
        <div className="mobile-drawer__body">
          <div className="mobile-drawer__school">
            <div className="mobile-drawer__school-avatar">
              <img src="/logo.png" alt="SHS" onError={e=>e.target.style.display='none'} />
            </div>
            <div>
              <p className="mobile-drawer__school-name">Shine High School</p>
              <p className="mobile-drawer__school-loc">Bonakal, Khammam, Telangana</p>
            </div>
          </div>

          <nav className="mobile-drawer__nav">
            {navLinks.map((link, i) => (
              <button
                key={link.path}
                className={`mobile-drawer__link ${isActive(link.path) ? 'is-active' : ''}`}
                onClick={() => handleNavClick(link.path)}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="mobile-drawer__actions">
            <button
              className="btn btn-primary btn-block"
              onClick={() => { navigate('/admissions'); setMenuOpen(false) }}
            >
              Apply for Admission
            </button>
            <button
              className="btn btn-outline btn-block"
              onClick={() => { navigate('/contact'); setMenuOpen(false) }}
            >
              Contact Us
            </button>
          </div>

          {/* Theme Toggle hint for mobile */}
          <div className="mobile-drawer__footer">
            <p>Mon–Sat 8:30 AM – 5:00 PM</p>
            <a href="tel:8978449852">📞 8978449852</a>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
      )}
    </>
  )
}
