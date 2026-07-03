import React, { useState, useEffect } from 'react'
import './SplashScreen.css'

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const total = 4000 // 4 seconds
    const interval = 40
    let elapsed = 0

    const timer = setInterval(() => {
      elapsed += interval
      const rawProgress = elapsed / total

      // Smooth ease-out progress curve
      const eased = rawProgress < 0.5
        ? 2 * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2

      setProgress(Math.min(eased * 100, 100))

      if (elapsed >= total) {
        clearInterval(timer)
        setIsFading(true)
        setTimeout(onComplete, 800) // Fade out duration
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className={`splash-new ${isFading ? 'is-fading' : ''}`}>
      {/* Background Image (blurred gate) */}
      <div className="splash-new__bg-wrap">
        <img 
          src="/splash-bg.jpg" 
          alt="Campus Background" 
          className="splash-new__bg-img" 
          onError={e => { e.target.style.display = 'none'; }} 
        />
        <div className="splash-new__bg-overlay"></div>
      </div>

      <div className="splash-new__content">
        <div className="splash-new__content-inner">
          <p className="splash-new__welcome">WELCOME TO</p>
          
          <div className="splash-new__logo">
            <img src="/logo.png" alt="Logo" onError={e => { e.target.style.display = 'none'; }} />
          </div>

          <h1 className="splash-new__title">
            <span className="splash-new__title-main">SHINE</span>
            <span className="splash-new__title-sub">HIGH SCHOOL</span>
          </h1>
          
          <p className="splash-new__tagline">Nurturing Minds. Building Futures.</p>
        </div>

        <div className="splash-new__loader">
          <span className="splash-new__pct">{Math.round(progress)}%</span>
          <div className="splash-new__progress-bar">
            <div className="splash-new__progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="splash-new__loading-text">Opening the doors to excellence...</span>
        </div>
      </div>
    </div>
  )
}


