import React, { useEffect, useMemo, useState } from 'react'
import { useData } from '../context/DataContext'
import TopBar from '../components/TopBar/TopBar'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import WhatsAppButton from '../components/WhatsAppButton/WhatsAppButton'
import { Search, CalendarDays, ChevronLeft, ChevronRight, Sparkles, Filter } from 'lucide-react'
import './CalendarPage.css'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['SUN','MON','TUE','WED','THU','FRI','SAT']
const CATEGORIES = ['All','Holiday','Exam','Event','Meeting','Vacation','Festival','Other']
const CAT_COLORS = {
  Holiday: { bg: '#E3F7F8', text: '#00677B', dot: '#00677B' },
  Exam: { bg: '#E7EEF1', text: '#123F48', dot: '#123F48' },
  Event: { bg: '#FFF6D8', text: '#9A6A0C', dot: '#E8A316' },
  Meeting: { bg: '#EDF7EE', text: '#287145', dot: '#287145' },
  Vacation: { bg: '#F6EAFE', text: '#7C3AED', dot: '#7C3AED' },
  Festival: { bg: '#FFEDE7', text: '#C2410C', dot: '#EA580C' },
  Other: { bg: '#F3F4F6', text: '#4B5563', dot: '#6B7280' },
}

export default function CalendarPage() {
  const { events } = useData()
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState(null)

  useEffect(() => { window.scrollTo(0,0) }, [])

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }
  const getEventsForDay = (day) => {
    const d = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
    return events.filter(e => e.date === d)
  }

  const filteredEvents = useMemo(() => events
    .filter(e => {
      const text = `${e.title} ${e.description || ''}`.toLowerCase()
      const matchSearch = !search || text.includes(search.toLowerCase())
      const matchCat = activeCategory === 'All' || e.category === activeCategory
      return matchSearch && matchCat
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date)), [events, search, activeCategory])

  const stats = useMemo(() => {
    const upcoming = events.filter(e => new Date(e.date) >= new Date(today.toDateString())).length
    return [
      { label: 'Total Dates', value: events.length },
      { label: 'Upcoming', value: upcoming },
      { label: 'Exam Dates', value: events.filter(e => e.category === 'Exam').length },
      { label: 'Holidays', value: events.filter(e => e.category === 'Holiday').length },
    ]
  }, [events])

  return (
    <div className="page-layout">
      <TopBar />
      <Navbar />
      <div className="page-hero cal-hero">
        <div className="container cal-hero__inner">
          <div>
            <p className="eyebrow eyebrow-gold">Academic Year 2025-26</p>
            <h1 className="cal-hero__title">School Calendar</h1>
            <p className="cal-hero__sub">Holidays, exams, events, meetings and other school dates in one easy mobile-friendly view.</p>
          </div>
          <div className="cal-hero__badge"><Sparkles size={18} /> Admin can add new dates instantly</div>
        </div>
      </div>

      <div className="cal-page-body">
        <div className="container">
          <div className="cal-stat-grid">
            {stats.map(item => <div key={item.label} className="cal-stat-card"><strong>{item.value}</strong><span>{item.label}</span></div>)}
          </div>

          <div className="cal-page-layout">
            <div className="cal-main-col">
              <div className="cal-card">
                <div className="cal-month-nav">
                  <button className="cal-nav-btn" onClick={prevMonth} aria-label="Previous month"><ChevronLeft size={18} /></button>
                  <div><h3>{MONTHS[month]} {year}</h3><span>{filteredEvents.length} matching dates</span></div>
                  <button className="cal-nav-btn" onClick={nextMonth} aria-label="Next month"><ChevronRight size={18} /></button>
                </div>
                <div className="cal-day-headers">{DAYS.map(d => <div key={d}>{d}</div>)}</div>
                <div className="cal-grid">
                  {[...Array(firstDay)].map((_,i) => <div key={`e${i}`} className="cal-cell empty" />)}
                  {[...Array(daysInMonth)].map((_,i) => {
                    const day = i + 1
                    const dayEvents = getEventsForDay(day)
                    const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
                    return (
                      <button key={day} className={`cal-cell ${isToday ? 'today' : ''} ${dayEvents.length ? 'has-events' : ''}`} onClick={() => dayEvents.length && setSelected(dayEvents)} disabled={!dayEvents.length}>
                        <span className="day-num">{day}</span>
                        {dayEvents.length > 0 && (
                          <div className="day-events">
                            {dayEvents.slice(0,2).map(ev => {
                              const cfg = CAT_COLORS[ev.category] || CAT_COLORS.Other
                              return <span key={ev.id} style={{ '--dot': cfg.dot }}>{ev.title}</span>
                            })}
                            {dayEvents.length > 2 && <em>+{dayEvents.length - 2}</em>}
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
                <div className="cal-legend">
                  {Object.entries(CAT_COLORS).map(([cat, cfg]) => <button key={cat} className="legend-item" onClick={() => setActiveCategory(cat)}><span style={{ background: cfg.dot }} />{cat}</button>)}
                </div>
              </div>
            </div>

            <aside className="cal-sidebar-col">
              <div className="cal-search-panel">
                <div className="cal-search-wrap"><Search size={18} className="search-icon" /><input type="text" placeholder="Search dates, exams, events..." value={search} onChange={e => setSearch(e.target.value)} className="cal-search" /></div>
                <div className="cal-filters" aria-label="Calendar category filters">
                  {CATEGORIES.map(cat => {
                    const cfg = CAT_COLORS[cat] || CAT_COLORS.Other
                    return <button key={cat} className={`cal-filter-btn ${activeCategory === cat ? 'active' : ''}`} style={activeCategory === cat ? { background: cfg.dot, color: '#fff' } : {}} onClick={() => setActiveCategory(cat)}>{cat}</button>
                  })}
                </div>
              </div>

              <div className="cal-upcoming">
                <h4 className="cal-upcoming-title"><CalendarDays size={17} /> Important Dates</h4>
                <div className="cal-upcoming-list">
                  {filteredEvents.length === 0 ? <p className="cal-empty"><Filter size={18} /> No dates found</p> : filteredEvents.slice(0, 14).map(ev => {
                    const d = new Date(ev.date)
                    const cfg = CAT_COLORS[ev.category] || CAT_COLORS.Other
                    return (
                      <button key={ev.id} className="cal-upcoming-item" onClick={() => setSelected([ev])}>
                        <div className="cui-date" style={{ '--date-color': cfg.dot }}><strong>{d.toLocaleDateString('en-IN', { month:'short' }).toUpperCase()}</strong><span>{d.getDate()}</span></div>
                        <div className="cui-info"><span className="cui-cat" style={{ background: cfg.bg, color: cfg.text }}>{ev.category}</span><p>{ev.title}</p><span className="cui-desc">{ev.description}</span></div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {selected && (
        <div className="ev-modal-overlay" onClick={() => setSelected(null)}>
          <div className="ev-modal" onClick={e => e.stopPropagation()}>
            <button className="ev-modal-close" onClick={() => setSelected(null)} aria-label="Close">x</button>
            {selected.map(ev => {
              const cfg = CAT_COLORS[ev.category] || CAT_COLORS.Other
              return <div key={ev.id} className="ev-modal-item"><span className="ev-modal-cat" style={{ background: cfg.bg, color: cfg.text }}>{ev.category}</span><h3 className="ev-modal-title">{ev.title}</h3><p className="ev-modal-date">{new Date(ev.date).toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</p><p className="ev-modal-desc">{ev.description || 'Details will be updated soon.'}</p></div>
            })}
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
