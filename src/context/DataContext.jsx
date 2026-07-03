import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  galleryImages as initialGallery,
  calendarEvents as initialEvents,
  prideMoments as initialPride,
  schoolInfo as initialInfo,
  programs as initialPrograms
} from '../data/initialData'

const DataContext = createContext()

export function DataProvider({ children }) {
  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('shs_gallery')
    return saved ? JSON.parse(saved) : initialGallery
  })

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('shs_events')
    return saved ? JSON.parse(saved) : initialEvents
  })

  const [pride, setPride] = useState(() => {
    const saved = localStorage.getItem('shs_pride')
    return saved ? JSON.parse(saved) : initialPride
  })

  const [enquiries, setEnquiries] = useState(() => {
    const saved = localStorage.getItem('shs_enquiries')
    return saved ? JSON.parse(saved) : []
  })

  const [schoolInfo, setSchoolInfo] = useState(() => {
    const saved = localStorage.getItem('shs_info')
    return saved ? JSON.parse(saved) : initialInfo
  })

  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem('shs_programs')
    return saved ? JSON.parse(saved) : initialPrograms
  })

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('shs_gallery', JSON.stringify(gallery)) }, [gallery])
  useEffect(() => { localStorage.setItem('shs_events', JSON.stringify(events)) }, [events])
  useEffect(() => { localStorage.setItem('shs_pride', JSON.stringify(pride)) }, [pride])
  useEffect(() => { localStorage.setItem('shs_enquiries', JSON.stringify(enquiries)) }, [enquiries])
  useEffect(() => { localStorage.setItem('shs_info', JSON.stringify(schoolInfo)) }, [schoolInfo])
  useEffect(() => { localStorage.setItem('shs_programs', JSON.stringify(programs)) }, [programs])

  // Theme Management
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('shs_theme')
    return saved || 'emerald'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('shs_theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'emerald' ? 'navy' : 'emerald')
  }


  // Gallery actions
  const addGalleryImage = (image) => setGallery(prev => [{ ...image, id: Date.now() }, ...prev])
  const deleteGalleryImage = (id) => setGallery(prev => prev.filter(img => img.id !== id))
  const updateGalleryImage = (id, updates) => setGallery(prev => prev.map(img => img.id === id ? { ...img, ...updates } : img))

  // Event actions
  const addEvent = (event) => setEvents(prev => [...prev, { ...event, id: Date.now() }])
  const deleteEvent = (id) => setEvents(prev => prev.filter(e => e.id !== id))
  const updateEvent = (id, updates) => setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e))

  // Pride actions
  const addPride = (item) => setPride(prev => [{ ...item, id: Date.now() }, ...prev])
  const deletePride = (id) => setPride(prev => prev.filter(p => p.id !== id))
  const updatePride = (id, updates) => setPride(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))

  // Enquiry actions
  const addEnquiry = (enquiry) => setEnquiries(prev => [{ ...enquiry, id: Date.now(), timestamp: new Date().toISOString(), contacted: false }, ...prev])
  const deleteEnquiry = (id) => setEnquiries(prev => prev.filter(e => e.id !== id))
  const markContacted = (id) => setEnquiries(prev => prev.map(e => e.id === id ? { ...e, contacted: !e.contacted } : e))

  return (
    <DataContext.Provider value={{
      gallery, addGalleryImage, deleteGalleryImage, updateGalleryImage,
      events, addEvent, deleteEvent, updateEvent,
      pride, addPride, deletePride, updatePride,
      enquiries, addEnquiry, deleteEnquiry, markContacted,
      schoolInfo, setSchoolInfo,
      programs, setPrograms,
      theme, toggleTheme
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
