import React, { useState, useRef, useEffect } from 'react'
import { useData } from '../../context/DataContext'
import './Calendar.css'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const categoryConfig = {
  Holiday:     { color: '#007A7C', label: 'Holiday' },
  Exam:        { color: '#0D3558', label: 'Exam' },
  Event:       { color: '#E8A316', label: 'Event' },
  Competition: { color: '#9A6A0C', label: 'Competition' },
  Meeting:     { color: '#627880', label: 'Meeting' },
  Other:       { color: '#4A5E64', label: 'Other' },
}

export default function Calendar() {
  const { events } = useData()
  const today = new Date()
  const [year, setYear]  = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selected, setSelected] = useState(null)
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

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  const getEventsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(e => e.date === dateStr)
  }

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6)

  return (
    <section id="calendar" className="section calendar-section" ref={ref}>
      <div className="container">
        <div className="section-header-center fade-up">
          <p className="section-tag">Academic Calendar</p>
          <h2 className="section-title">Events & Important <span>Dates</span></h2>
          <p className="section-subtitle">
            Stay informed about holidays, exams, school events, competitions and parent meetings 
            throughout the academic year.
          </p>
        </div>

        <div className="calendar-layout fade-up">
          {/* Main Calendar */}
          <div className="calendar-main">
            {/* Header */}
            <div className="cal-header">
              <button className="cal-nav" onClick={prevMonth}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <h3>{MONTHS[month]} {year}</h3>
              <button className="cal-nav" onClick={nextMonth}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>

            {/* Days of week */}
            <div className="cal-days-header">
              {DAYS.map(d => <div key={d} className="cal-day-name">{d}</div>)}
            </div>

            {/* Grid */}
            <div className="cal-grid">
              {[...Array(firstDay)].map((_, i) => (
                <div key={`empty-${i}`} className="cal-cell empty" />
              ))}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1
                const dayEvents = getEventsForDate(day)
                const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
                return (
                  <div
                    key={day}
                    className={`cal-cell ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
                    onClick={() => dayEvents.length > 0 && setSelected(dayEvents[0])}
                  >
                    <span className="cal-day-num">{day}</span>
                    {dayEvents.length > 0 && (
                      <div className="cal-event-dots">
                        {dayEvents.slice(0, 3).map((ev, ei) => (
                          <span
                            key={ei}
                            className="cal-dot"
                            style={{ background: ev.color || categoryConfig[ev.category]?.color || '#007A7C' }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="cal-legend">
              {Object.entries(categoryConfig).map(([key, cfg]) => (
                <div key={key} className="legend-item">
                  <span className="legend-dot" style={{ background: cfg.color }} />
                  <span>{cfg.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events Sidebar */}
          <div className="calendar-sidebar">
            <h4 className="sidebar-title">Upcoming Events</h4>
            {upcomingEvents.length === 0 ? (
              <p className="no-events">No upcoming events</p>
            ) : (
              <div className="upcoming-list">
                {upcomingEvents.map(ev => (
                  <div
                    key={ev.id}
                    className="upcoming-item"
                    style={{ '--ev-color': ev.color || '#007A7C' }}
                    onClick={() => setSelected(ev)}
                  >
                    <div className="upcoming-date">
                      <span className="upcoming-day">
                        {new Date(ev.date).toLocaleDateString('en-IN', { day: '2-digit' })}
                      </span>
                      <span className="upcoming-month">
                        {new Date(ev.date).toLocaleDateString('en-IN', { month: 'short' })}
                      </span>
                    </div>
                    <div className="upcoming-info">
                      <h5>{ev.title}</h5>
                      <span className="upcoming-cat" style={{ color: ev.color || '#007A7C' }}>
                        {ev.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {selected && (
        <div className="event-modal-overlay" onClick={() => setSelected(null)}>
          <div className="event-modal" onClick={e => e.stopPropagation()}>
            <button className="event-modal-close" onClick={() => setSelected(null)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
            <div className="event-modal-header" style={{ '--ev-color': selected.color || '#007A7C' }}>
              <span className="event-modal-cat">{selected.category}</span>
              <h3>{selected.title}</h3>
              <p className="event-modal-date">
                {new Date(selected.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="event-modal-body">
              <p>{selected.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
