import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Clock, MessageCircle, Youtube } from 'lucide-react'
import TopBar from '../components/TopBar/TopBar'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import WhatsAppButton from '../components/WhatsAppButton/WhatsAppButton'
import { schoolInfo } from '../data/initialData'
import './ContactPage.css'

const CONTACTS = [
  {
    label: 'Correspondent',
    name: 'Shaik Ansar Pasha',
    phone: '8978449852',
    phone2: '9666449852',
  },
  {
    label: 'Principal',
    name: 'A. Swetha',
    phone: '9177692998',
  },
  {
    label: 'Office / Help',
    name: 'Help Desk',
    phone: '8309326460',
    phone2: '7780545744',
  },
]

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="page-layout">
      <TopBar />
      <Navbar />

      <div className="page-hero cp-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow eyebrow-gold">Get in Touch</p>

            <h1 className="cp-hero__title">
              We'd Love to
              <br />
              <em>Hear From You</em>
            </h1>

            <p className="cp-hero__sub">
              Whether you have a question about admissions,
              want to schedule a campus visit,
              or just want to say hello —
              we're here for you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="cp-body">
        <div className="container">
          <div className="cp-grid">

            <motion.div
              className="cp-left"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >

              <h2 className="cp-section-heading">
                Contact Directory
              </h2>

              <div className="cp-contacts">
                {CONTACTS.map((c, i) => (
                  <div key={i} className="cp-contact-card">

                    <div className="cp-contact-card__avatar">
                      {c.name[0]}
                    </div>

                    <div className="cp-contact-card__info">

                      <span className="cp-contact-card__label">
                        {c.label}
                      </span>

                      <strong className="cp-contact-card__name">
                        {c.name}
                      </strong>

                      <div className="cp-contact-card__phones">
                        <a href={`tel:${c.phone}`}>{c.phone}</a>

                        {c.phone2 && (
                          <a href={`tel:${c.phone2}`}>
                            {c.phone2}
                          </a>
                        )}
                      </div>

                    </div>

                  </div>
                ))}
              </div>
                            {/* Address & Links */}
              <div className="cp-info-block">
                <div className="cp-info-row">
                  <div className="cp-info-icon">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <strong>Address</strong>
                    <p>{schoolInfo.address}</p>
                  </div>
                </div>

                <div className="cp-info-row">
                  <div className="cp-info-icon">
                    <Mail size={18} />
                  </div>
                  <div>
                    <strong>Email</strong>
                    <p>
                      <a href={`mailto:${schoolInfo.email}`}>
                        {schoolInfo.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="cp-info-row">
                  <div className="cp-info-icon">
                    <Clock size={18} />
                  </div>
                  <div>
                    <strong>Office Hours</strong>
                    <p>Monday – Saturday: 9:00 AM – 5:00 PM</p>
                    <p
                      style={{
                        color: 'var(--c-error)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                      }}
                    >
                      Closed on Sunday
                    </p>
                  </div>
                </div>
              </div>

              <div className="cp-socials">
                <a
                  href={schoolInfo.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cp-social cp-social--yt"
                >
                  <Youtube size={20} />
                  Subscribe on YouTube
                </a>

                <a
                  href={`https://wa.me/${schoolInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cp-social cp-social--wa"
                >
                  <MessageCircle size={20} />
                  WhatsApp Us
                </a>
              </div>

              <div className="cp-map">
                <iframe
                  title="Shine High School"
                  src={schoolInfo.mapEmbedUrl}
                  width="100%"
                  height="220"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>

            <div className="cp-form-box">
              <h3 className="cp-form-title">Admissions</h3>

              <p className="cp-form-sub">
                For admissions and student enquiries,
                please use our Admissions page or WhatsApp us directly.
              </p>

              <a
                href="/admissions"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                Apply Now
              </a>

              <a
                href={`https://wa.me/${schoolInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <MessageCircle size={18} />
                WhatsApp Admissions
              </a>
            </div>

          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}