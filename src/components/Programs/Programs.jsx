import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { programs } from '../../data/initialData'
import './Programs.css'

const ICONS = {
  1: '🌱',
  2: '📚',
  3: '🔬',
  4: '🏆',
  5: '🚀',
  6: '🤖',
}

const COLORS = [
  { bg: '#EBF9F4', border: '#A7F3D0', icon: '#059669' },
  { bg: '#FFF8E1', border: '#FDE68A', icon: '#D97706' },
  { bg: '#EFF6FF', border: '#BFDBFE', icon: '#2563EB' },
  { bg: '#F5F3FF', border: '#DDD6FE', icon: '#7C3AED' },
  { bg: '#FFF1F2', border: '#FECDD3', icon: '#E11D48' },
  { bg: '#F0FDFA', border: '#99F6E4', icon: '#0D9488' },
]

export default function Programs() {
  const [active, setActive] = useState(programs[0].id)
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('is-visible')
      }),
      { threshold: 0.1 }
    )
    const el = ref.current
    if (el) el.querySelectorAll('.reveal, .reveal-left').forEach(c => obs.observe(c))
    return () => obs.disconnect()
  }, [])

  const activeProg = programs.find(p => p.id === active)

  return (
    <section id="academics" className="section programs-section" ref={ref}>
      {/* Dark background top part */}
      <div className="programs-bg">
        <div className="container">
          <div className="programs-header text-center reveal">
            <p className="eyebrow eyebrow-gold">Academic Programs</p>
            <h2 className="h2 text-white">
              Future-Ready <em style={{color:'rgba(255,255,255,0.6)'}}>Education</em>
            </h2>
            <p className="lead" style={{color:'rgba(255,255,255,0.55)', margin:'1rem auto 0', maxWidth:580}}>
              Comprehensive programs from Nursery to Class 10, designed to inspire curiosity, build skills and unlock every child's potential.
            </p>
          </div>
        </div>
      </div>

      {/* Program cards */}
      <div className="programs-body">
        <div className="container">
          <div className="programs-grid">
            {programs.map((prog, i) => {
              const color = COLORS[i % COLORS.length]
              return (
                <div
                  key={prog.id}
                  className={`prog-card reveal reveal-delay-${Math.min(i+1,4)}`}
                  style={{
                    '--prog-bg':     color.bg,
                    '--prog-border': color.border,
                    '--prog-icon':   color.icon,
                  }}
                  onClick={() => navigate('/admissions')}
                >
                  <div className="prog-card__icon-wrap">
                    <span className="prog-card__emoji">{ICONS[prog.id] || '📖'}</span>
                  </div>

                  <div className="prog-card__content">
                    <h4 className="prog-card__title">{prog.title}</h4>
                    <p className="prog-card__subtitle">{prog.subtitle}</p>
                    <p className="prog-card__desc">{prog.description}</p>

                    <div className="prog-card__features">
                      {prog.features.map(f => (
                        <span key={f} className="prog-feature-tag">{f}</span>
                      ))}
                    </div>
                  </div>

                  <div className="prog-card__arrow">→</div>
                </div>
              )
            })}
          </div>

          <div className="programs-cta reveal">
            <p>Have questions about admissions or programs?</p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/admissions')}>
              Enquire About Admissions
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
