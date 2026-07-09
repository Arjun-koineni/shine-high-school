import React, { useState, useEffect } from 'react'
import './SplashScreen.css'

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const total = 2200 // 2.2 seconds active loading progress
    const interval = 20
    let elapsed = 0

    const timer = setInterval(() => {
      elapsed += interval
      const rawProgress = elapsed / total

      // Smooth ease-out progress curve (cubic ease-out)
      const eased = 1 - Math.pow(1 - rawProgress, 3)
      setProgress(Math.min(eased * 100, 100))

      if (elapsed >= total) {
        clearInterval(timer)
        setIsFading(true)
        onComplete() // Trigger homepage reveal sequence
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className={`splash-screen ${isFading ? 'splash-screen--fading' : ''}`}>
      {/* Background Layer */}
      <div className="splash-screen__bg-wrap">
        {/* Blurred backdrop for letterbox aspect ratio on mobile portrait */}
        <img 
          src="/splash-bg.png" 
          alt="" 
          className="splash-screen__bg-blur"
        />
        {/* Main sharp image with zoom and blur-to-clear animations */}
        <img 
          src="/splash-bg.png" 
          alt="Shine High School Gate" 
          className="splash-screen__bg-img" 
        />
        <div className="splash-screen__bg-overlay"></div>
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


