import React, { useState, useEffect } from 'react'
import './SplashScreen.css'

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    if (!isImageLoaded) return

    const total = 3500 // exactly 3.5 seconds of active loading progress
    const interval = 20
    let elapsed = 0

    const timer = setInterval(() => {
      elapsed += interval
      const rawProgress = elapsed / total

      // Smooth cubic ease-out for progress bar filling
      const eased = 1 - Math.pow(1 - rawProgress, 3)
      setProgress(Math.min(eased * 100, 100))

      if (elapsed >= total) {
        clearInterval(timer)
        setIsFading(true)
        // Wait exactly 500ms for the splash fade-out animation before triggering unmount/homepage mount
        setTimeout(() => {
          onComplete()
        }, 500)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete, isImageLoaded])

  return (
    <div className={`splash-screen ${isFading ? 'splash-screen--fading' : ''}`}>
      {/* Black curtain that fades out in 300ms on first mount */}
      <div className="splash-screen__black-curtain"></div>

      {/* Background Layer */}
      <div className="splash-screen__bg-wrap">
        <img 
          src="/splash-bg.png" 
          alt="Shine High School Gate" 
          className={`splash-screen__bg-img ${isImageLoaded ? 'splash-screen__bg-img--loaded' : ''}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="splash-screen__bg-overlay"></div>
        {/* Invisible covers to blend and hide the baked-in background elements */}
        <div className="splash-screen__watermark-cover"></div>
        <div className="splash-screen__progress-cover"></div>
      </div>

      {/* Main Centered Content */}
      <div className="splash-screen__content">
        <div className="splash-screen__brand">
          <span className="splash-screen__welcome">WELCOME TO</span>
          
          <div className="splash-screen__logo-wrap">
            <img 
              src="/logo.png" 
              alt="Shine High School Logo" 
              className="splash-screen__logo" 
            />
          </div>

          <h1 className="splash-screen__title">
            <span className="splash-screen__title-main">SHINE</span>
            <span className="splash-screen__title-sub">HIGH SCHOOL</span>
          </h1>
          
          <p className="splash-screen__tagline">Nurturing Minds. Building Futures.</p>
        </div>

        {/* Loading Indicator */}
        <div className="splash-screen__loader">
          <div className="splash-screen__progress-bar">
            <div 
              className="splash-screen__progress-fill" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <span className="splash-screen__loading-text">
            Opening the doors to excellence...
          </span>
        </div>
      </div>
    </div>
  )
}
