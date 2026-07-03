import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './NewsAnnouncements.css'

const newsData = [
  {
    id: 1,
    category: 'Admissions',
    status: 'Open',
    statusType: 'open',
    title: 'Admissions Open for 2025–26 Academic Year',
    desc: 'Enroll your child in Shine High School for the upcoming academic year. Limited seats available for all classes from Nursery to Grade 10.',
    date: 'July 2025',
    icon: '🔔',
    borderColor: '#0A7A5A',
  },
  {
    id: 2,
    category: 'Academics',
    status: 'New Program',
    statusType: 'new',
    title: 'AI with Robotics Program Launched for Classes 3–9',
    desc: 'Integrating Artificial Intelligence with Robotics for tomorrow\'s leaders. Hands-on sessions every week with expert instructors.',
    date: 'June 2025',
    icon: '📚',
    borderColor: '#D4A017',
  },
  {
    id: 3,
    category: 'Events',
    status: 'Upcoming',
    statusType: 'upcoming',
    title: 'Annual Sports Day – Register Your Child Now',
    desc: 'Join us for the Annual Sports Day celebration. Students from all classes will participate in track events, team sports, and fun activities.',
    date: 'August 2025',
    icon: '📅',
    borderColor: '#0A5C3A',
  },
  {
    id: 4,
    category: 'Transport',
    status: 'Update',
    statusType: 'update',
    title: 'New Bus Routes Added for 2025–26',
    desc: "We've expanded our transport network to cover more areas. GPS-enabled buses for maximum safety and punctuality.",
    date: 'July 2025',
    icon: '🚌',
    borderColor: '#7C3AED',
  },
]

export default function NewsAnnouncements() {
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

  return (
    <section id="news" className="section news-section" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="news-header fade-up">
          <div>
            <p className="section-tag">Latest Updates</p>
            <h2 className="section-title">
              News <span className="news-amp">&</span> Announcements
            </h2>
            <div className="divider" />
          </div>
          <Link to="/admissions" className="btn btn-primary news-view-all">
            View All →
          </Link>
        </div>

        {/* Cards */}
        <div className="news-grid fade-up">
          {newsData.map((item) => (
            <div
              key={item.id}
              className="news-card"
              style={{ '--card-border': item.borderColor }}
            >
              <div className="news-card-header">
                <div className="news-category">
                  <span className="news-cat-icon">{item.icon}</span>
                  <span className="news-cat-label">{item.category}</span>
                </div>
                <span className={`news-status status-${item.statusType}`}>{item.status}</span>
              </div>

              <h4 className="news-title">{item.title}</h4>
              <p className="news-desc">{item.desc}</p>

              <div className="news-footer">
                <span className="news-date">📅 {item.date}</span>
                <Link to="/admissions" className="news-read-more">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
