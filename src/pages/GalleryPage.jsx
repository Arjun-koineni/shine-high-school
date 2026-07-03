import React, { useEffect } from 'react'

import TopBar from '../components/TopBar/TopBar'
import Navbar from '../components/Navbar/Navbar'
import Gallery from '../components/Gallery/Gallery'
import Footer from '../components/Footer/Footer'
import WhatsAppButton from '../components/WhatsAppButton/WhatsAppButton'
import './GalleryPage.css'

export default function GalleryPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="page-layout">
      <TopBar />
      <Navbar />
      <div className="page-hero gp-hero">
        <div className="container">
          <p className="eyebrow eyebrow-gold">Shine High School</p>
          <h1 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(2rem,5vw,3rem)',color:'var(--c-white)',marginTop:'0.75rem'}}>
            School Gallery
          </h1>
          <p style={{color:'rgba(255,255,255,0.65)',marginTop:'0.875rem',fontSize:'1rem',maxWidth:560}}>
            Explore our collection of moments — from award ceremonies and cultural events to daily school life.
          </p>
        </div>
      </div>
      <div style={{background:'var(--c-gray-50)', paddingBottom:'4rem'}}>
        <Gallery isPreview={false} />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
