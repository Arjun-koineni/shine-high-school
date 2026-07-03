import React, { useRef, useEffect } from 'react'
import { useData } from '../../context/DataContext'
import './PrideMoments.css'

const categoryColors = {
  Award: '#E8A316',
  Press: '#007A7C',
  Event: '#0D3558',
  Achievement: '#007A7C',
  Celebration: '#E8A316',
}

export default function PrideMoments() {
  const { pride } = useData()
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

  const highlighted = pride.filter(p => p.highlight)
  const rest = pride.filter(p => !p.highlight)

  return (
    <section id="pride" className="section pride-section" ref={ref}>
      {/* Background accent */}
      <div className="pride-bg-accent" />

      <div className="container">
        <div className="section-header-center fade-up">
          <p className="section-tag">Pride Moments</p>
          <h2 className="section-title">Our <span>Achievements</span> & Milestones</h2>
          <p className="section-subtitle">
            Every award, every recognition and every proud moment reflects the dedication 
            of our students, teachers and the entire Shine High School family.
          </p>
        </div>

        {/* Featured Achievement */}
        {highlighted.map(item => (
          <div key={item.id} className="pride-featured fade-up">
            <div className="featured-content">
              <div className="featured-badge">
                <span>🏆</span>
                <span>Featured Achievement</span>
              </div>
              <span className="pride-category" style={{ '--cat-color': categoryColors[item.category] || '#007A7C' }}>
                {item.category}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="featured-meta">
                <span>📅 {item.date}</span>
                <span>📍 {item.venue}</span>
              </div>
            </div>
            <div className="featured-visual">
              <div className="award-graphic">
                <div className="award-ring award-ring-1" />
                <div className="award-ring award-ring-2" />
                <div className="award-ring award-ring-3" />
                <div className="award-center">
                  <span>🏆</span>
                  <p>ET TechX</p>
                  <small>School Excellence Award 2025</small>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Pride Grid */}
        <div className="pride-grid fade-up">
          {rest.map(item => (
            <div key={item.id} className="pride-card">
              {item.image && (
                <div className="pride-card-img">
                  <img src={item.image} alt={item.title} loading="lazy" onError={e => e.target.style.display='none'} />
                </div>
              )}
              <div
                className="pride-card-top"
                style={{ '--cat-color': categoryColors[item.category] || '#007A7C' }}
              >
                <span className="pride-icon">
                  {item.category === 'Press' ? '📰' :
                   item.category === 'Award' ? '🏆' :
                   item.category === 'Celebration' ? '🎉' :
                   item.category === 'Achievement' ? '🥇' : '🎯'}
                </span>
                <span className="pride-cat-tag">{item.category}</span>
              </div>
              <div className="pride-card-body">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <div className="pride-meta">
                  <span>📅 {item.date}</span>
                  <span>📍 {item.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats banner */}
        <div className="pride-stats fade-up">
          {[
            { icon: '🏆', value: '1', label: 'National Award' },
            { icon: '📰', value: '5+', label: 'Press Coverages' },
            { icon: '🥇', value: '20+', label: 'Competition Wins' },
            { icon: '🎖️', value: '100+', label: 'Student Achievers' },
          ].map((s, i) => (
            <div key={i} className="pride-stat">
              <div className="pride-stat-icon">{s.icon}</div>
              <div className="pride-stat-value">{s.value}</div>
              <div className="pride-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
