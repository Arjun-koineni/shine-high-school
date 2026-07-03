import React, { useRef, useEffect } from 'react'
import { schoolInfo } from '../../data/initialData'
import './YouTube.css'

export default function YouTube() {
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
    <section id="youtube" className="section youtube-section" ref={ref}>
      <div className="container">
        <div className="youtube-layout fade-up">
          <div className="youtube-info">
            <p className="section-tag">Our Channel</p>
            <h2 className="section-title">Watch Us on <span>YouTube</span></h2>
            <p className="youtube-desc">
              Follow our YouTube channel to see school events, student achievements, 
              principal's messages, educational content and behind-the-scenes glimpses 
              of life at Shine High School.
            </p>
            <div className="yt-stats">
              <div className="yt-stat">
                <span className="yt-stat-icon">📺</span>
                <div>
                  <strong>Videos & Vlogs</strong>
                  <span>Events, achievements & more</span>
                </div>
              </div>
              <div className="yt-stat">
                <span className="yt-stat-icon">🔔</span>
                <div>
                  <strong>Subscribe & Stay Updated</strong>
                  <span>Never miss a school update</span>
                </div>
              </div>
            </div>
            <a
              href={schoolInfo.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
              Visit Our YouTube Channel
            </a>
          </div>

          {/* Embedded YouTube */}
          <div className="youtube-embed-wrap">
            <div className="youtube-embed">
              <video
                src="https://s167-isny.freeconvert.com/task/6a47e461b739eeed139fcb26/SHS%20VIDEO.mp4"
                title="Shine High School Video"
                controls
                autoPlay
                muted
                loop
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
              />
            </div>
            <div className="youtube-channel-badge">
              <div className="yt-badge-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                </svg>
              </div>
              <div>
                <strong>Shine High School</strong>
                <span>{schoolInfo.youtubeChannel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
