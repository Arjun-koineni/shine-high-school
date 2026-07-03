import React from 'react'
import { Phone, MapPin, MessageCircle, Clock } from 'lucide-react'
import { schoolInfo } from '../../data/initialData'
import './TopBar.css'

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-left">
          <div className="topbar-item">
            <Phone size={12} />
            <a href={`tel:${schoolInfo.phones[0]}`}>{schoolInfo.phones[0]}</a>
          </div>
          <div className="topbar-item">
            <MapPin size={12} />
            <span>Ravinothala, Bonakal, Khammam</span>
          </div>
          <div className="topbar-item">
            <Clock size={12} />
            <span>Mon–Sat: 8:30 AM – 5:00 PM</span>
          </div>
        </div>

        <div className="topbar-right">
          <a
            href={`tel:${schoolInfo.phones[0]}`}
            className="topbar-cta green"
          >
            <Phone size={12} /> Admissions Open
          </a>
          <a
            href={`https://wa.me/${schoolInfo.whatsapp}?text=Hello%2C+I+am+interested+in+admission+at+Shine+High+School.`}
            target="_blank"
            rel="noopener noreferrer"
            className="topbar-cta whatsapp"
          >
            <MessageCircle size={12} /> WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  )
}
