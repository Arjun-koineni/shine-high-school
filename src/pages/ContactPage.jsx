import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle, User, Send, Youtube } from 'lucide-react'
import TopBar from '../components/TopBar/TopBar'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import WhatsAppButton from '../components/WhatsAppButton/WhatsAppButton'
import { schoolInfo } from '../data/initialData'
import './ContactPage.css'

const CONTACTS = [
  { label: 'Correspondent', name: 'Shaik Ansar Pasha', phone: '8978449852', phone2: '9666449852' },
  { label: 'Principal',     name: 'A. Swetha',         phone: '9177692998' },
  { label: 'Office / Help', name: 'Help Desk',         phone: '8309326460', phone2: '7780545744' },
]

export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [form, setForm] = useState({ name:'', phone:'', email:'', message:'' })
  const [sent, setSent] = useState(false)

  const handleSend = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name:'', phone:'', email:'', message:'' })
  }

  return (
    <div className="page-layout">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <div className="page-hero cp-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow eyebrow-gold">Get in Touch</p>
            <h1 className="cp-hero__title">
              We'd Love to<br /><em>Hear From You</em>
            </h1>
            <p className="cp-hero__sub">
              Whether you have a question about admissions, want to schedule a campus visit, or just want to say hello — we're here for you.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="cp-body">
        <div className="container">
          <div className="cp-grid">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="cp-left"
            >
              {/* Contact Cards */}
              <h2 className="cp-section-heading">Contact Directory</h2>
              <div className="cp-contacts">
                {CONTACTS.map((c, i) => (
                  <div key={i} className="cp-contact-card">
                    <div className="cp-contact-card__avatar">{c.name[0]}</div>
                    <div className="cp-contact-card__info">
                      <span className="cp-contact-card__label">{c.label}</span>
                      <strong className="cp-contact-card__name">{c.name}</strong>
                      <div className="cp-contact-card__phones">
                        <a href={`tel:${c.phone}`}>{c.phone}</a>
                        {c.phone2 && <a href={`tel:${c.phone2}`}>{c.phone2}</a>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Address & Links */}
              <div className="cp-info-block">
                <div className="cp-info-row">
                  <div className="cp-info-icon"><MapPin size={18} /></div>
                  <div>
                    <strong>Address</strong>
                    <p>{schoolInfo.address}</p>
                  </div>
                </div>
                <div className="cp-info-row">
                  <div className="cp-info-icon"><Mail size={18} /></div>
                  <div>
                    <strong>Email</strong>
                    <p><a href={`mailto:${schoolInfo.email}`}>{schoolInfo.email}</a></p>
                  </div>
                </div>
                <div className="cp-info-row">
                  <div className="cp-info-icon"><Clock size={18} /></div>
                  <div>
                    <strong>Office Hours</strong>
                    <p>Monday – Saturday: 9:00 AM – 5:00 PM</p>
                    <p style={{color:'var(--c-error)',fontSize:'0.78rem',fontWeight:600}}>Closed on Sunday</p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="cp-socials">
                <a href={schoolInfo.youtube} target="_blank" rel="noopener noreferrer" className="cp-social cp-social--yt">
                  <Youtube size={20} /> Subscribe on YouTube
                </a>
                <a href={`https://wa.me/${schoolInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="cp-social cp-social--wa">
                  <MessageCircle size={20} /> WhatsApp Us
                </a>
              </div>

              {/* Map */}
              <div className="cp-map">
                <iframe
                  title="Shine High School"
                  src={schoolInfo.mapEmbedUrl}
                  width="100%" height="220"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen loading="lazy"
                />
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="cp-form-box"
            >
              <h3 className="cp-form-title">Send a Message</h3>
              <p className="cp-form-sub">We typically respond the same day during office hours.</p>

              {sent ? (
                <div className="cp-form-success">
                  ✓ Message sent! We'll get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSend} className="cp-form">
                  <div className="cp-form-group">
                    <label>Full Name *</label>
                    <div className="cp-form-input-wrap">
                      <User size={17} className="cp-form-input-icon" />
                      <input type="text" value={form.name} required
                        onChange={e=>setForm({...form,name:e.target.value})}
                        className="form-input" style={{paddingLeft:'2.75rem'}} placeholder="Your full name" />
                    </div>
                  </div>
                  <div className="cp-form-row">
                    <div className="cp-form-group">
                      <label>Phone *</label>
                      <div className="cp-form-input-wrap">
                        <Phone size={17} className="cp-form-input-icon" />
                        <input type="tel" value={form.phone} required
                          onChange={e=>setForm({...form,phone:e.target.value})}
                          className="form-input" style={{paddingLeft:'2.75rem'}} placeholder="10-digit mobile" />
                      </div>
                    </div>
                    <div className="cp-form-group">
                      <label>Email</label>
                      <div className="cp-form-input-wrap">
                        <Mail size={17} className="cp-form-input-icon" />
                        <input type="email" value={form.email}
                          onChange={e=>setForm({...form,email:e.target.value})}
                          className="form-input" style={{paddingLeft:'2.75rem'}} placeholder="Optional" />
                      </div>
                    </div>
                  </div>
                  <div className="cp-form-group">
                    <label>Your Message *</label>
                    <textarea value={form.message} required rows={5}
                      onChange={e=>setForm({...form,message:e.target.value})}
                      className="form-textarea" placeholder="How can we help you?" />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block" style={{padding:'1rem',fontSize:'1rem',justifyContent:'center'}}>
                    <Send size={18} /> Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
