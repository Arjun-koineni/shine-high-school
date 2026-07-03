import React, { useRef, useEffect } from 'react'
import { CheckCircle2, Award, Users, BookOpen } from 'lucide-react'
import './About.css'

const highlights = [
  'Affiliated to Telangana State Board',
  '500+ students across all grades',
  'Highly qualified and experienced staff',
  'Modern digital classrooms',
  'AI, Robotics & STEM labs',
  'Shanku Chakra handwriting program',
  'Daily sports & physical activities',
  'Safe hostel facility available',
  '6+ bus routes across Bonakal',
  'Affordable fees, premium quality',
]

const pillars = [
  { icon: Award, title: 'Excellence', desc: 'ET TechX School Excellence Award recipient — recognized for academic innovation and quality.' },
  { icon: BookOpen, title: 'Academics', desc: 'Rigorous, future-ready curriculum from Nursery to Class 10 with board exam mastery focus.' },
  { icon: Users, title: 'Community', desc: 'A school that becomes family — supportive environment for students, parents and teachers.' },
]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('is-visible')
      }),
      { threshold: 0.12 }
    )
    const el = ref.current
    if (el) el.querySelectorAll('.reveal, .reveal-left').forEach(c => obs.observe(c))
    return () => obs.disconnect()
  }, [])
  return ref
}

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="container">
        {/* Top: Pillars */}
        <div className="about-pillars">
          {pillars.map((p, i) => (
            <div key={p.title} className={`about-pillar reveal reveal-delay-${i + 1}`}>
              <div className="about-pillar__icon">
                <p.icon size={26} />
              </div>
              <div>
                <h4 className="about-pillar__title">{p.title}</h4>
                <p className="about-pillar__desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main: Two column */}
        <div className="about-main">
          <div className="about-left reveal-left">
            <p className="eyebrow">About Our School</p>
            <h2 className="h2">
              A Legacy of Learning<br />
              <em>Since 2014</em>
            </h2>
            <div className="divider" />
            <p className="lead" style={{ maxWidth: 520 }}>
              Shine High School has been a beacon of quality education in Bonakal, Khammam for over 10 years. 
              We combine modern pedagogy with strong traditional values to create well-rounded individuals ready for the future.
            </p>
            <p style={{ color: 'var(--c-text-3)', fontSize: '0.9rem', lineHeight: 1.75, maxWidth: 520, marginTop: '1rem' }}>
              From our state-of-the-art AI and Robotics labs to our award-winning academic programs, 
              every aspect of Shine High School is designed to inspire curiosity and drive excellence in every student.
            </p>

            {/* Correspondent */}
            <div className="about-correspondent reveal">
              <div className="about-corresp-avatar">SA</div>
              <div>
                <p className="about-corresp-name">Shaik Ansar Pasha</p>
                <p className="about-corresp-role">Correspondent & Founder</p>
                <p className="about-corresp-quote">"Every child deserves a world-class education at an affordable cost."</p>
              </div>
            </div>
          </div>

          <div className="about-right">
            <div className="about-checklist reveal reveal-delay-2">
              <h4 className="about-checklist__title">Why Choose Shine High School?</h4>
              <div className="about-checklist__grid">
                {highlights.map(h => (
                  <div key={h} className="about-check-item">
                    <CheckCircle2 size={17} className="about-check-icon" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Award badge */}
            <div className="about-award-card reveal reveal-delay-3">
              <div className="about-award-badge">
                <Award size={28} />
              </div>
              <div>
                <p className="about-award-title">ET TechX School Excellence Award</p>
                <p className="about-award-desc">8th Edition · HITEX, Hyderabad · December 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
