import React from 'react'
import { MessageCircle } from 'lucide-react'
import { schoolInfo } from '../../data/initialData'
import './WhatsAppButton.css'

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${schoolInfo.whatsapp}?text=Hello%2C+I+would+like+to+know+more+about+Shine+High+School.`}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} />
      <span className="wa-float__tooltip">Chat with us</span>
    </a>
  )
}
