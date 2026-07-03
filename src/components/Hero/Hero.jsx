import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, MapPin, Phone, GraduationCap, Bus, Users, CalendarDays } from 'lucide-react'
import { schoolInfo } from '../../data/initialData'
import './Hero.css'

function useCounter(target, duration, active) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = null
    const step = ts => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const ease = p < 0.5 ? 2*p*p : 1 - Math.pow(-2*p+2,2)/2
      setCount(Math.floor(ease * target))
      if (p < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return count
}

export default function Hero() {
  const [active, setActive] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); obs.disconnect() }
    }, { threshold: 0.15 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const students = useCounter(500, 2000, active)
  const years    = useCounter(10,  1500, active)
  const routes   = useCounter(6,   1200, active)
  const staff    = useCounter(50,  1800, active)

  return (
    <section className="hero" ref={sectionRef} id="home">
      {/* Multi-layer background */}
      <div className="hero__bg" />
      <div className="hero__noise" />
      <div className="hero__radial" />

      {/* Floating shapes */}
      <div className="hero__shape hero__shape--1" />
      <div className="hero__shape hero__shape--2" />
      <div className="hero__shape hero__shape--3" />

      <div className="container hero__layout">
        <div className="hero__content">
          {/* Eyebrow badge */}
          <div className="hero__badge animate-fade-up">
            <span className="hero__badge-dot" />
            <span>ADMISSIONS OPEN 2025–26</span>
            <span className="hero__badge-sep">·</span>
            <span style={{color:'rgba(255,255,255,0.6)'}}>10+ Years of Excellence</span>
          </div>

          {/* Heading */}
          <h1 className="hero__heading animate-fade-up delay-1">
            Shaping <em className="hero__heading-em">Bright</em><br />
            Futures Through<br />
            <span className="hero__heading-highlight">Excellence</span>
          </h1>

          {/* Subtext */}
          <p className="hero__sub animate-fade-up delay-2">
            From Nursery to Class&nbsp;10 — a school where every child is nurtured, 
            challenged, and celebrated. Located in Bonakal, Khammam, Telangana.
          </p>

          {/* CTAs */}
          <div className="hero__actions animate-fade-up delay-3">
            <Link to="/admissions" className="btn btn-gold btn-lg">
              Apply Now <ArrowRight size={18} />
            </Link>
            <a
              href={`tel:${schoolInfo.phones[0]}`}
              className="btn btn-outline-white btn-lg"
            >
              <Phone size={17} /> Call Admissions
            </a>
          </div>

          {/* Location pill */}
          <div className="hero__location animate-fade-up delay-4">
            <MapPin size={14} className="hero__loc-icon" />
            <span>Ravinothala, Bonakal, Khammam, Telangana – 507204</span>
          </div>
        </div>

        {/* Right: Stats Card */}
        <div className="hero__stats-panel animate-fade-up delay-4">
          <div className="hero__stat-card">
            <div className="hero__stat-icon-wrap" style={{background:'rgba(34,197,94,0.12)'}}>
              <GraduationCap size={24} className="hero__stat-icon" style={{color:'#4ADE80'}} />
            </div>
            <div>
              <strong className="hero__stat-num">{students}+</strong>
              <span className="hero__stat-label">Happy Students</span>
            </div>
          </div>

          <div className="hero__stat-card">
            <div className="hero__stat-icon-wrap" style={{background:'rgba(240,180,41,0.12)'}}>
              <CalendarDays size={24} className="hero__stat-icon" style={{color:'#F0B429'}} />
            </div>
            <div>
              <strong className="hero__stat-num">{years}+</strong>
              <span className="hero__stat-label">Years of Excellence</span>
            </div>
          </div>

          <div className="hero__stat-card">
            <div className="hero__stat-icon-wrap" style={{background:'rgba(96,165,250,0.12)'}}>
              <Bus size={24} className="hero__stat-icon" style={{color:'#60A5FA'}} />
            </div>
            <div>
              <strong className="hero__stat-num">{routes}+</strong>
              <span className="hero__stat-label">Bus Routes</span>
            </div>
          </div>

          <div className="hero__stat-card">
            <div className="hero__stat-icon-wrap" style={{background:'rgba(251,146,60,0.12)'}}>
              <Users size={24} className="hero__stat-icon" style={{color:'#FB923C'}} />
            </div>
            <div>
              <strong className="hero__stat-num">{staff}+</strong>
              <span className="hero__stat-label">Expert Staff</span>
            </div>
          </div>

          {/* Features */}
          <div className="hero__features">
            {['Smart Computer Labs','AI & Robotics','Hostel Facility','Daily Sports','Shanku Chakra','Affordable Fees'].map(f => (
              <div key={f} className="hero__feature">
                <span className="hero__feature-dot" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="hero__scroll-hint">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
      </div>
    </section>
  )
}
