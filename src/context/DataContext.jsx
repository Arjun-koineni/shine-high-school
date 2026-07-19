import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

import {
  schoolInfo as initialInfo,
  programs as initialPrograms
} from '../data/initialData'

const DataContext = createContext()

export function DataProvider({ children }) {
  const [gallery, setGallery] = useState([])
  const [events, setEvents] = useState([])
  const [pride, setPride] = useState([])
  const [enquiries, setEnquiries] = useState([])
  const [adminSettings, setAdminSettings] = useState({ username: 'admin', password: 'shinehighschool@bonakal' })

  const [schoolInfo, setSchoolInfo] = useState(() => {
    const saved = localStorage.getItem('shs_info')
    return saved ? JSON.parse(saved) : initialInfo
  })

  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem('shs_programs')
    return saved ? JSON.parse(saved) : initialPrograms
  })

  useEffect(() => {
    localStorage.setItem('shs_info', JSON.stringify(schoolInfo))
  }, [schoolInfo])

  useEffect(() => {
    localStorage.setItem('shs_programs', JSON.stringify(programs))
  }, [programs])

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('shs_theme') || 'emerald'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('shs_theme', theme)
  }, [theme])

  useEffect(() => {
    loadEnquiries()
    loadEvents()
    loadPride()
    loadGallery()
    loadAdminSettings()
  }, [])

  const loadAdminSettings = async () => {
    const { data, error } = await supabase
      .from('admin_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle()

    if (error) {
      console.error(error)
      return
    }

    if (data) {
      setAdminSettings({ username: data.username, password: data.password })
    }
  }

  const updateAdminSettings = async ({ username, password }) => {
    const { error } = await supabase
      .from('admin_settings')
      .update({ username, password })
      .eq('id', 1)

    if (error) {
      console.error(error)
      return { error }
    }

    setAdminSettings({ username, password })
    return { data: { username, password } }
  }

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

  const loadGallery = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setGallery(data || [])
  }

  const toggleTheme = () => {
    setTheme(prev => (prev === 'emerald' ? 'navy' : 'emerald'))
  }

  // Gallery — Supabase Storage upload helper
  // Takes a File object, uploads it to the gallery-images bucket,
  // and returns { data: publicUrl } or { error }
  const uploadGalleryImage = async file => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('gallery-images')
      .upload(fileName, file)

    if (uploadError) {
      console.error(uploadError)
      return { error: uploadError }
    }

    const { data: urlData } = supabase.storage
      .from('gallery-images')
      .getPublicUrl(fileName)

    return { data: urlData.publicUrl }
  }

  const addGalleryImage = async item => {
    const { data, error } = await supabase
      .from('gallery')
      .insert([item])
      .select()

    if (error) {
      console.error(error)
      return { error }
    }

    await loadGallery()
    return { data }
  }

  const deleteGalleryImage = async id => {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id)

    if (error) {
      console.error(error)
      return { error }
    }

    await loadGallery()
  }

  const updateGalleryImage = async (id, updates) => {
    const { error } = await supabase
      .from('gallery')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) {
      console.error(error)
      return { error }
    }

    await loadGallery()
  }

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

  const addPride = async item => {
    const { data, error } = await supabase
      .from('pride_moments')
      .insert([item])
      .select()

    if (error) {
      console.error(error)
      return { error }
    }

    await loadPride()
    return { data }
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
        uploadGalleryImage,

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

        adminSettings,
        updateAdminSettings,

        loadEnquiries,
        loadEvents,
        loadPride,
        loadGallery
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)