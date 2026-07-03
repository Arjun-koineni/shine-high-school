import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Phone, Mail, MapPin, MessageCircle, Youtube, GraduationCap, ArrowRight } from 'lucide-react'
import { schoolInfo } from '../../data/initialData'
import './Footer.css'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Academic Programs', path: '/#academics' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Holiday Calendar', path: '/calendar' },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Admin Login', path: '/admin' },
]

const programs = [
  'Nursery to UKG',
  'Classes 1 – 5',
  'Classes 6 – 8',
  'Classes 9 – 10',
  'IIT Foundation',
  'AI & Robotics',
  'Shanku Chakra',
]

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">
          
          {/* Column 1: Brand */}
          <div className="footer__col footer__col--brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <img src="/logo.png" alt="SHS" onError={e=>e.target.style.display='none'} />
                <GraduationCap size={28} className="footer__logo-fallback" />
              </div>
              <div>
                <h3 className="footer__school-name">Shine High School</h3>
                <p className="footer__school-tag">Bonakal, Khammam</p>
              </div>
            </div>
            <p className="footer__tagline">
              Nurturing Minds. Building Futures. — Providing quality education from Nursery to Class 10 with over 10 years of excellence in Bonakal, Telangana.
            </p>
            <div className="footer__socials">
              <a href={schoolInfo.youtube} target="_blank" rel="noopener noreferrer" className="footer__social footer__social--yt" aria-label="YouTube">
                <Youtube size={18} />
              </a>
              <a href={`https://wa.me/${schoolInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="footer__social footer__social--wa" aria-label="WhatsApp">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__list">
              {quickLinks.map(l => (
                <li key={l.path}>
                  <button className="footer__list-link" onClick={() => navigate(l.path)}>
                    <ArrowRight size={13} /> {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div className="footer__col">
            <h4 className="footer__col-title">Our Programs</h4>
            <ul className="footer__list">
              {programs.map(p => (
                <li key={p}>
                  <button className="footer__list-link" onClick={() => navigate('/admissions')}>
                    <ArrowRight size={13} /> {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <div className="footer__contact-list">
              <div className="footer__contact-item">
                <MapPin size={16} className="footer__ci-icon" />
                <span>Ravinothala, Bonakal,<br />Khammam, Telangana – 507 204</span>
              </div>
              <a href={`tel:${schoolInfo.phones[0]}`} className="footer__contact-item footer__contact-item--link">
                <Phone size={16} className="footer__ci-icon" />
                <span>{schoolInfo.phones[0]}</span>
              </a>
              <a href={`tel:${schoolInfo.phones[1]}`} className="footer__contact-item footer__contact-item--link">
                <Phone size={16} className="footer__ci-icon" />
                <span>{schoolInfo.phones[1]}</span>
              </a>
              <a href={`mailto:${schoolInfo.email}`} className="footer__contact-item footer__contact-item--link">
                <Mail size={16} className="footer__ci-icon" />
                <span style={{wordBreak:'break-word'}}>{schoolInfo.email}</span>
              </a>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${schoolInfo.whatsapp}?text=Hello%2C+I+am+interested+in+admissions+at+Shine+High+School.`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__wa-btn"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Shine High School, Bonakal. All rights reserved.
          </p>
          <p className="footer__credit">
            Established 2014 · Affiliated to TSBIE
          </p>
        </div>
      </div>
    </footer>
  )
}
