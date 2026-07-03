import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, ArrowRight, ZoomIn } from 'lucide-react'
import { useData } from '../../context/DataContext'
import { galleryCategories } from '../../data/initialData'
import './Gallery.css'

export default function Gallery({ isPreview = false }) {
  const { gallery } = useData()
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const ref = useRef(null)
  const navigate = useNavigate()

  const filtered = activeCategory === 'All'
    ? gallery
    : gallery.filter(img => img.category === activeCategory)

  const displayItems = isPreview ? filtered.slice(0, 9) : filtered

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.1 }
    )
    const el = ref.current
    if (el) el.querySelectorAll('.reveal').forEach(c => obs.observe(c))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const handleKey = e => { if (e.key === 'Escape') setLightbox(null) }
    if (lightbox !== null) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox])

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <section id="gallery" className="gal-section" ref={ref}>
      <div className="container">
        <div className="text-center reveal" style={{ marginBottom: '2.5rem' }}>
          <p className="eyebrow">Our Memories</p>
          <h2 className="h2">School <span className="text-primary">Gallery</span></h2>
          <div className="divider divider-center" />
          <p className="lead" style={{ margin: '0 auto', maxWidth: 560 }}>
            A glimpse into our vibrant school life — celebrations, achievements, and everyday excellence.
          </p>
        </div>

        {/* Category Filters */}
        <div className="gal-filters reveal">
          {galleryCategories.map(cat => (
            <button
              key={cat}
              className={`gal-filter ${activeCategory === cat ? 'gal-filter--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="gal-grid reveal">
          {displayItems.map((img, i) => (
            <div
              key={img.id}
              className="gal-item"
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src || img.thumbnail}
                alt={img.title}
                loading="lazy"
                onError={e => { e.target.src = '/placeholder.jpg' }}
              />
              <div className="gal-item__overlay">
                <ZoomIn size={24} />
                <p>{img.title}</p>
                <span className="badge badge-gray">{img.category}</span>
              </div>
            </div>
          ))}
        </div>

        {isPreview && gallery.length > 9 && (
          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <button className="btn btn-outline btn-lg" onClick={() => navigate('/gallery')}>
              View All {gallery.length} Photos <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="gal-lightbox" onClick={() => setLightbox(null)}>
          <button className="gal-lightbox__close">
            <X size={22} />
          </button>
          <div className="gal-lightbox__img-wrap" onClick={e => e.stopPropagation()}>
            <img
              src={displayItems[lightbox]?.src || displayItems[lightbox]?.thumbnail}
              alt={displayItems[lightbox]?.title}
            />
            <p className="gal-lightbox__caption">{displayItems[lightbox]?.title}</p>
          </div>
          {lightbox > 0 && (
            <button className="gal-lightbox__nav gal-lightbox__nav--prev"
              onClick={e => { e.stopPropagation(); setLightbox(l => l - 1) }}>‹</button>
          )}
          {lightbox < displayItems.length - 1 && (
            <button className="gal-lightbox__nav gal-lightbox__nav--next"
              onClick={e => { e.stopPropagation(); setLightbox(l => l + 1) }}>›</button>
          )}
        </div>
      )}
    </section>
  )
}
