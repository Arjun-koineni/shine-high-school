import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

import {
  galleryImages as initialGallery,
  schoolInfo as initialInfo,
  programs as initialPrograms
} from '../data/initialData'

const DataContext = createContext()

export function DataProvider({ children }) {
  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('shs_gallery')
    return saved ? JSON.parse(saved) : initialGallery
  })

  const [events, setEvents] = useState([])
  const [pride, setPride] = useState([])
  const [enquiries, setEnquiries] = useState([])

  const [schoolInfo, setSchoolInfo] = useState(() => {
    const saved = localStorage.getItem('shs_info')
    return saved ? JSON.parse(saved) : initialInfo
  })

  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem('shs_programs')
    return saved ? JSON.parse(saved) : initialPrograms
  })

  // Local Storage (gallery still local for now — we'll move this next)
  useEffect(() => {
    localStorage.setItem('shs_gallery', JSON.stringify(gallery))
  }, [gallery])

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

  // Load from Supabase on mount
  useEffect(() => {
    loadEnquiries()
    loadEvents()
    loadPride()
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

  const loadPride = async () => {
    const { data, error } = await supabase
      .from('pride_moments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setPride(data || [])
  }

  const toggleTheme = () => {
    setTheme(prev => (prev === 'emerald' ? 'navy' : 'emerald'))
  }

  // Gallery (still localStorage — next file we'll move to Supabase)
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
    const { error } = await supabase
      .from('events')
      .insert([event])
      .select()

    if (error) {
      console.error(error)
      return
    }

    await loadEvents()
  }

  const updateEvent = async (id, updates) => {
    const { error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()

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
  const addPride = async item => {
    const { error } = await supabase
      .from('pride_moments')
      .insert([item])
      .select()

    if (error) {
      console.error(error)
      return
    }

    await loadPride()
  }

  const deletePride = async id => {
    const { error } = await supabase
      .from('pride_moments')
      .delete()
      .eq('id', id)

    if (error) {
      console.error(error)
      return
    }

    await loadPride()
  }

  const updatePride = async (id, updates) => {
    const { error } = await supabase
      .from('pride_moments')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) {
      console.error(error)
      return
    }

    await loadPride()
  }

  // Enquiries
  const addEnquiry = enquiry =>
    setEnquiries(prev => [enquiry, ...prev])

  const deleteEnquiry = async id => {
    const { error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', Number(id))

    if (error) {
      console.error("DELETE ERROR:", error)
      return
    }

    await loadEnquiries()
  }

  const markContacted = async id => {
    const enquiry = enquiries.find(e => Number(e.id) === Number(id))

    if (!enquiry) return

    const { error } = await supabase
      .from('enquiries')
      .update({ contacted: !enquiry.contacted })
      .eq('id', Number(id))

    if (error) {
      console.error("MARK CONTACTED ERROR:", error)
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

        loadEnquiries,
        loadEvents,
        loadPride
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
