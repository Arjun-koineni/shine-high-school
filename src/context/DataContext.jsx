import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

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

  const [enquiries, setEnquiries] = useState([])

  const [schoolInfo, setSchoolInfo] = useState(() => {
    const saved = localStorage.getItem('shs_info')
    return saved ? JSON.parse(saved) : initialInfo
  })

  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem('shs_programs')
    return saved ? JSON.parse(saved) : initialPrograms
  })

  // Local Storage
  useEffect(() => {
    localStorage.setItem('shs_gallery', JSON.stringify(gallery))
  }, [gallery])

  useEffect(() => {
    localStorage.setItem('shs_events', JSON.stringify(events))
  }, [events])

  useEffect(() => {
    localStorage.setItem('shs_pride', JSON.stringify(pride))
  }, [pride])

  useEffect(() => {
    localStorage.setItem('shs_info', JSON.stringify(schoolInfo))
  }, [schoolInfo])

  useEffect(() => {
    localStorage.setItem('shs_programs', JSON.stringify(programs))
  }, [programs])

  // Theme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('shs_theme') || 'emerald'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('shs_theme', theme)
  }, [theme])

  // Load enquiries from Supabase
  useEffect(() => {
    loadEnquiries()
  }, [])

  useEffect(() => {
  loadEvents()
}, [])

  const loadEnquiries = async () => {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setEnquiries(data || [])
  }
  const loadEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })

  if (error) {
    console.error(error)
    return
  }

  setEvents(data || [])
}

  const toggleTheme = () => {
    setTheme(prev => (prev === 'emerald' ? 'navy' : 'emerald'))
  }

  // Gallery
  const addGalleryImage = image =>
    setGallery(prev => [{ ...image, id: Date.now() }, ...prev])

  const deleteGalleryImage = id =>
    setGallery(prev => prev.filter(img => img.id !== id))

  const updateGalleryImage = (id, updates) =>
    setGallery(prev =>
      prev.map(img => (img.id === id ? { ...img, ...updates } : img))
    )

  // Events
  const addEvent = async event => {
  console.log("EVENT RECEIVED:", event)

  const { data, error } = await supabase
    .from('events')
    .insert([event])
    .select()

  console.log("INSERT DATA:", data)
  console.log("INSERT ERROR:", error)

  if (error) {
    console.error(error)
    return
  }

  await loadEvents()
  }
  const deleteEvent = async id => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(error)
    return
  }

  await loadEvents()
}
  // Pride
  const addPride = item =>
    setPride(prev => [{ ...item, id: Date.now() }, ...prev])

  const deletePride = id =>
    setPride(prev => prev.filter(p => p.id !== id))

  const updatePride = (id, updates) =>
    setPride(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    )

  // Enquiries

  const addEnquiry = enquiry =>
    setEnquiries(prev => [enquiry, ...prev])

  const deleteEnquiry = async id => {
    const { data, error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', Number(id))
      .select()

      console.log("DELETED DATA:", data)
      console.log("DELETE ERROR:", error)

    if (error) {
  console.error("DELETE ERROR:", error)
  return
}

    await loadEnquiries()
  }

  const markContacted = async id => {
    const enquiry = enquiries.find(e => Number(e.id) === Number(id))

    if (!enquiry) return

    const { data, error } = await supabase
  .from('enquiries')
  .update({
    contacted: !enquiry.contacted
  })
  .eq('id', Number(id))
  .select()


    if (error) {
  return
}   


    await loadEnquiries()
  }
    return (
    <DataContext.Provider
      value={{
        gallery,
        addGalleryImage,
        deleteGalleryImage,
        updateGalleryImage,

        events,
        addEvent,
        deleteEvent,
        updateEvent,

        pride,
        addPride,
        deletePride,
        updatePride,

        enquiries,
        addEnquiry,
        deleteEnquiry,
        markContacted,

        schoolInfo,
        setSchoolInfo,

        programs,
        setPrograms,

        theme,
        toggleTheme,

        loadEnquiries
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)