import React from 'react'
import TopBar from '../components/TopBar/TopBar'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Programs from '../components/Programs/Programs'
import Excellence from '../components/Excellence/Excellence'
import PrideMoments from '../components/PrideMoments/PrideMoments'
import Gallery from '../components/Gallery/Gallery'
import Location from '../components/Location/Location'
import YouTube from '../components/YouTube/YouTube'
import Footer from '../components/Footer/Footer'
import WhatsAppButton from '../components/WhatsAppButton/WhatsAppButton'

export default function Home() {
  return (
    <div className="page-layout">
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Programs />
        <Excellence />
        <PrideMoments />
        <Gallery isPreview={true} />
        <Location />
        <YouTube />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

