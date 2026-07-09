import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import SplashScreen from './components/SplashScreen/SplashScreen'

// Pages
import Home from './pages/Home'
import CalendarPage from './pages/CalendarPage'
import AdmissionsPage from './pages/AdmissionsPage'
import ContactPage from './pages/ContactPage'
import GalleryPage from './pages/GalleryPage'
import AdminPanel from './components/Admin/AdminPanel'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <DataProvider>
      <BrowserRouter>
        {showSplash ? (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        )}
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
