import React, { useRef, useEffect } from 'react'
import { schoolInfo } from '../../data/initialData'
import { MapPin, Phone, Clock, UserRound, MessageCircle, Navigation } from 'lucide-react'
import './Location.css'

export default function Location() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    const el = ref.current
    if (el) el.querySelectorAll('.fade-up').forEach(c => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" className="section location-section" ref={ref}>
      <div className="container">
        <div className="section-header-center fade-up">
          <p className="section-tag">Location & Contact</p>
          <h2 className="section-title">Find & Connect <span>With Us</span></h2>
          <p className="section-subtitle">Visit us at Bonakal or reach out through any of the channels below.</p>
        </div>

        <div className="location-layout fade-up">
          <div className="map-wrap">
            <iframe title="Shine High School Location" src={schoolInfo.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <div className="map-cta"><a href={schoolInfo.mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><Navigation size={16} /> Get Directions</a></div>
          </div>

          <div className="contact-info-panel">
            <div className="contact-block"><h4>School Address</h4><div className="contact-item"><div className="contact-item-icon"><MapPin size={18} /></div><div><p>Shine High School</p><p>{schoolInfo.address}</p></div></div></div>
            <div className="contact-block">
              <h4>Phone Numbers</h4>
              {schoolInfo.phones.map((phone, i) => <a key={phone} href={`tel:${phone}`} className="contact-item contact-link"><div className="contact-item-icon"><Phone size={18} /></div><div><span>{i === 0 ? 'Primary' : i === 1 ? 'Secondary' : i === 2 ? 'Admissions' : 'General'}</span><p>{phone}</p></div></a>)}
            </div>
            <div className="contact-block"><h4>Office Hours</h4><div className="contact-item"><div className="contact-item-icon"><Clock size={18} /></div><div><p>{schoolInfo.officeHours}</p><p className="muted-small">Sunday: Closed</p></div></div></div>
            <div className="contact-block">
              <h4>Key Contacts</h4>
              <div className="contact-item"><div className="contact-item-icon"><UserRound size={18} /></div><div><span>Correspondent</span><p>{schoolInfo.staff.correspondent.name}</p><a href={`tel:${schoolInfo.staff.correspondent.phone}`}>{schoolInfo.staff.correspondent.phone}</a></div></div>
              <div className="contact-item"><div className="contact-item-icon"><UserRound size={18} /></div><div><span>Principal</span><p>{schoolInfo.staff.principal.name}</p><a href={`tel:${schoolInfo.staff.principal.phone}`}>{schoolInfo.staff.principal.phone}</a></div></div>
            </div>
            <div className="contact-quick-actions">
              <a href={`https://wa.me/${schoolInfo.whatsapp}?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Shine%20High%20School.`} target="_blank" rel="noopener noreferrer" className="quick-action-btn whatsapp"><MessageCircle size={19} /> WhatsApp</a>
              <a href={`tel:${schoolInfo.phones[0]}`} className="quick-action-btn call"><Phone size={19} /> Call Now</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
