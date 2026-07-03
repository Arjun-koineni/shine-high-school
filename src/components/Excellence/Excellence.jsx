import React, { useRef, useEffect } from 'react'
import { excellence } from '../../data/initialData'
import './Excellence.css'

const ICONS = {
  1: '🤖', 2: '🖥️', 3: '🎯', 4: '✍️', 5: '⚽', 6: '🏠', 7: '🚌', 8: '💰'
}

export default function Excellence() {
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.1 }
    )
    const el = ref.current
    if (el) el.querySelectorAll('.reveal').forEach(c => obs.observe(c))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="excellence" className="ex-section" ref={ref}>
      <div className="container">
        <div className="text-center reveal" style={{ marginBottom: '3.5rem' }}>
          <p className="eyebrow">Beyond Classrooms</p>
          <h2 className="h2">Where Learning Meets <span className="text-primary">Innovation</span></h2>
          <div className="divider divider-center" />
          <p className="lead" style={{ margin: '0 auto', maxWidth: 600 }}>
            A rich ecosystem of activities, technology and partnerships that shape well-rounded, future-ready individuals.
          </p>
        </div>

        {/* Feature grid */}
        <div className="ex-grid">
          {excellence.map((item, i) => (
            <div
              key={item.id}
              className={`ex-card reveal reveal-delay-${(i % 4) + 1}`}
            >
              <div className="ex-card__icon">{ICONS[item.id] || '📌'}</div>
              <div className="ex-card__tag">{item.highlight}</div>
              <h3 className="ex-card__title">{item.title}</h3>
              <p className="ex-card__desc">{item.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="ex-banner reveal">
          <div className="ex-banner__left">
            <p className="eyebrow eyebrow-white">Ready to Join?</p>
            <h3 className="ex-banner__title">
              Start Your Child's Journey at Shine High School
            </h3>
          </div>
          <div className="ex-banner__actions">
            <a href="/admissions" className="btn btn-gold btn-lg">Apply for Admission</a>
            <a
              href="https://wa.me/918978449852?text=Hello%2C+I+want+to+visit+Shine+High+School."
              target="_blank" rel="noopener noreferrer"
              className="btn btn-outline-white"
            >
              Schedule a Visit
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
