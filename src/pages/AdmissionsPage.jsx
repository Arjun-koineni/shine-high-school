import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, Clock, MapPin, MessageCircle, Youtube, Building } from 'lucide-react'
import TopBar from '../components/TopBar/TopBar'
import Navbar from '../components/Navbar/Navbar'
import EnquiryForm from '../components/EnquiryForm/EnquiryForm'
import Footer from '../components/Footer/Footer'
import WhatsAppButton from '../components/WhatsAppButton/WhatsAppButton'
import { schoolInfo } from '../data/initialData'
import './AdmissionsPage.css'

export default function AdmissionsPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="page-layout">
      <TopBar />
      <Navbar />

      {/* Hero Banner */}
      <div className="page-hero adm-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="adm-hero__content"
          >
            <p className="eyebrow eyebrow-gold">2025–26 Admissions</p>
            <h1 className="adm-hero__title">
              Begin Your Child's<br />
              <em>Journey to Excellence</em>
            </h1>
            <p className="adm-hero__sub">
              Seats are filling fast. Apply today and take the first step towards a brighter future at Shine High School.
            </p>

            <div className="adm-hero__pills">
              <a href={`tel:${schoolInfo.phones[0]}`} className="adm-hero__pill">
                <Phone size={14} /> {schoolInfo.phones[0]}
              </a>
              <a href={`tel:${schoolInfo.phones[2]}`} className="adm-hero__pill">
                <Building size={14} /> {schoolInfo.phones[2]}
              </a>
              <a
                href={`https://wa.me/${schoolInfo.whatsapp}`}
                target="_blank" rel="noopener noreferrer"
                className="adm-hero__pill adm-hero__pill--wa"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="adm-body">
        <div className="container">
          <div className="adm-layout-grid">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="adm-form-box"
            >
              <EnquiryForm />
            </motion.div>

            {/* Right: Info */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="adm-info-col"
            >
              {/* Contacts */}
              <div className="adm-info-card">
                <h4 className="adm-info-card__title">
                  <Phone size={18} /> Quick Contacts
                </h4>
                {[
                  { label:'Correspondent', name:'Shaik Ansar Pasha', phone: schoolInfo.phones[0] },
                  { label:'Principal',     name:'A. Swetha',         phone: schoolInfo.staff.principal.phone },
                  { label:'Office',        name:'Help Desk',         phone: schoolInfo.phones[2] },
                ].map(c => (
                  <a key={c.label} href={`tel:${c.phone}`} className="adm-contact-row">
                    <div className="adm-contact-row__avatar">{c.name[0]}</div>
                    <div className="adm-contact-row__info">
                      <span>{c.label}</span>
                      <strong>{c.name}</strong>
                      <p>{c.phone}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${schoolInfo.whatsapp}?text=Hello%2C+I+have+an+admissions+query.`}
                target="_blank" rel="noopener noreferrer"
                className="adm-wa-block"
              >
                <MessageCircle size={22} />
                <div>
                  <strong>Chat on WhatsApp</strong>
                  <span>Instant responses during school hours</span>
                </div>
              </a>

              {/* Timings */}
              <div className="adm-info-card">
                <h4 className="adm-info-card__title">
                  <Clock size={18} /> School Timings
                </h4>
                <div className="adm-timing-row">
                  <div>
                    <strong>School Hours</strong>
                    <span>Mon – Sat</span>
                  </div>
                  <span className="adm-timing-val">8:30 AM – 4:30 PM</span>
                </div>
                <div className="adm-timing-row">
                  <div>
                    <strong>Office Hours</strong>
                    <span>Mon – Sat</span>
                  </div>
                  <span className="adm-timing-val">9:00 AM – 5:00 PM</span>
                </div>
                <div className="adm-timing-row" style={{borderBottom:'none'}}>
                  <div><strong>Closed</strong></div>
                  <span className="adm-timing-closed">Sunday</span>
                </div>
              </div>

              {/* Address */}
              <a href={schoolInfo.mapLink || `https://maps.google.com/?q=${encodeURIComponent(schoolInfo.address)}`} target="_blank" rel="noopener noreferrer" className="adm-map-card">
                <MapPin size={20} />
                <div>
                  <strong>Find Us</strong>
                  <span>{schoolInfo.address}</span>
                </div>
                <span className="adm-map-arrow">›</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

