import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { LogOut, Users, Calendar, Image, Download, Trash2, Plus, LayoutDashboard, GraduationCap, Search, Phone, Mail, MessageCircle, CheckCircle2, X, Award } from 'lucide-react'
import './AdminPanel.css'

const PASS = 'shinehighschool@bonakal'
const CATEGORY_COLORS = { Holiday: '#00677B', Exam: '#123F48', Event: '#E8A316', Meeting: '#287145', Vacation: '#7C3AED', Festival: '#EA580C', Other: '#6B7280' }
const CATEGORIES = Object.keys(CATEGORY_COLORS)

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [tab, setTab] = useState('enquiries')
  const [query, setQuery] = useState('')
  const [eventFilter, setEventFilter] = useState('All')
  const [newEvent, setNewEvent] = useState({ title:'', date:'', category:'Event', description:'' })
  const [newImg, setNewImg] = useState({ src:'', title:'', category:'Campus' })
  const [newPride, setNewPride] = useState({ src:'', title:'', description:'' })
  const navigate = useNavigate()
  const { enquiries, deleteEnquiry, markContacted, events, addEvent, deleteEvent, gallery, addGalleryImage, deleteGalleryImage, pride, addPride, deletePride } = useData()

  const filteredEnquiries = useMemo(() => enquiries.filter(eq => {
    const text = `${eq.studentName || ''} ${eq.parentName || ''} ${eq.phone || ''} ${eq.classInterested || ''}`.toLowerCase()
    return !query || text.includes(query.toLowerCase())
  }), [enquiries, query])

  const filteredEvents = useMemo(() => events
    .filter(ev => (eventFilter === 'All' || ev.category === eventFilter) && (!query || `${ev.title} ${ev.description || ''}`.toLowerCase().includes(query.toLowerCase())))
    .sort((a,b)=>new Date(a.date)-new Date(b.date)), [events, eventFilter, query])

  const stats = [
    { label:'Enquiries', value: enquiries.length, hint:`${enquiries.filter(e => !e.contacted).length} pending`, icon: Users },
    { label:'Calendar Dates', value: events.length, hint:'Public calendar', icon: Calendar },
    { label:'Gallery', value: gallery.length, hint:'Campus media', icon: Image },
  ]

  if (!authed) {
    return (
      <div className="adm-login">
        <div className="adm-login__card">
          <div className="adm-login__brand">
            <div className="adm-login__logo-ring"><img src="/logo.png" alt="SHS" onError={e=>e.target.style.display='none'} /><GraduationCap size={34} className="adm-login__logo-icon" /></div>
            <div><h1 className="adm-login__title">Admin Portal</h1><p className="adm-login__sub">Shine High School - Bonakal</p></div>
          </div>
          <form onSubmit={e => { e.preventDefault(); (username === adminCredentials.username && password === adminCredentials.password) ? setAuthed(true) : alert('Incorrect credentials. Please try again.') }}>
            <div className="form-group"><label className="form-label">Username</label><input type="text" className="form-input" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} autoFocus required /></div>
            <div className="form-group"><label className="form-label">Password</label><input type="password" className="form-input" placeholder="Enter admin password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
            <button type="submit" className="btn btn-primary btn-block adm-login__submit">Access Dashboard</button>
          </form>
          <button className="adm-login__return" onClick={() => navigate('/')}>Return to Website</button>
        </div>
      </div>
    )
  }

  const exportCSV = () => {
    if (!enquiries.length) return alert('No enquiries to export.')
    const headers = ['Date','Student Name','Parent Name','Phone','Email','Class','Preferred Time','Address','Message','Contacted']
    const rows = enquiries.map(e => [new Date(e.timestamp || e.id).toLocaleDateString('en-IN'), e.studentName, e.parentName, e.phone, e.email || '', e.classInterested || '', e.preferredTime || '', e.address || '', `"${(e.message||'').replace(/"/g,'""')}"`, e.contacted ? 'Yes' : 'No'])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([csv],{type:'text/csv'})), download: `SHS_Enquiries_${Date.now()}.csv` })
    a.click()
  }

  const addEventHandler = e => {
    e.preventDefault()
    if (!newEvent.title || !newEvent.date) return alert('Title and date required.')
    addEvent({ ...newEvent, color: CATEGORY_COLORS[newEvent.category] || CATEGORY_COLORS.Other })
    setNewEvent({ title:'', date:'', category:'Event', description:'' })
  }

  const addImgHandler = e => {
    e.preventDefault()
    if (!newImg.src) return alert('Image required.')
    addGalleryImage({ src: newImg.src, thumbnail: newImg.src, title: newImg.title || 'Campus moment', category: newImg.category })
    setNewImg({ src:'', title:'', category:'Campus' })
  }

  const addPrideHandler = e => {
    e.preventDefault()
    if (!newPride.src) return alert('Image required.')
    addPride({ src: newPride.src, title: newPride.title || 'Pride Moment', description: newPride.description })
    setNewPride({ src:'', title:'', description:'' })
  }

  const handleImageUpload = (e, setImgState) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImgState(prev => ({ ...prev, src: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const tabs = [
    { id:'enquiries', label:'Enquiries', icon: Users, count: enquiries.length },
    { id:'calendar', label:'Calendar', icon: Calendar, count: events.length },
    { id:'gallery', label:'Gallery', icon: Image, count: gallery.length },
    { id:'pride', label:'Pride Moments', icon: Award, count: pride.length },
  ]

  return (
    <div className="adm-layout">
      <aside className="adm-sidebar">
        <div className="adm-sidebar__brand"><div className="adm-sidebar__avatar"><img src="/logo.png" alt="SHS" onError={e=>e.target.style.display='none'} /></div><div><p className="adm-sidebar__name">Shine High School</p><p className="adm-sidebar__role">Control Center</p></div></div>
        <nav className="adm-sidebar__nav">{tabs.map(t => <button key={t.id} className={`adm-nav-item ${tab === t.id ? 'is-active' : ''}`} onClick={() => { setTab(t.id); setQuery('') }}><t.icon size={18} /><span>{t.label}</span><span className="adm-nav-count">{t.count}</span></button>)}</nav>
        <div className="adm-sidebar__actions"><button className="adm-nav-item" onClick={() => navigate('/')}><LayoutDashboard size={18} /> <span>View Website</span></button><button className="adm-nav-item adm-nav-item--danger" onClick={() => setAuthed(false)}><LogOut size={18} /> <span>Logout</span></button></div>
      </aside>

      <main className="adm-main">
        <header className="adm-header">
          <div><span className="adm-header__eyebrow">Admin Dashboard</span><h2 className="adm-header__title">{tabs.find(t=>t.id===tab)?.label} Management</h2></div>
          <div className="adm-header__actions">{tab === 'enquiries' && <button className="btn btn-gold btn-sm" onClick={exportCSV}><Download size={15} /> Export CSV</button>}<button className="adm-icon-btn" onClick={() => navigate('/')} title="View website"><LayoutDashboard size={18} /></button></div>
        </header>

        <div className="adm-content">
          <section className="adm-stat-grid">{stats.map(s => <div key={s.label} className="adm-stat"><s.icon size={20} /><div><strong>{s.value}</strong><span>{s.label}</span><em>{s.hint}</em></div></div>)}</section>
          <div className="adm-toolbar"><div className="adm-search"><Search size={17} /><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Search ${tab}...`} /></div>{query && <button className="adm-clear" onClick={()=>setQuery('')}><X size={16} /> Clear</button>}</div>

          {tab === 'enquiries' && (
            <div className="adm-card">
              <div className="adm-card__header"><h3>Admission Enquiries</h3><span>{filteredEnquiries.length} showing</span></div>
              {filteredEnquiries.length === 0 ? <Empty icon={Users} text="No enquiries found." /> : (
                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead><tr><th>Date</th><th>Student</th><th>Parent</th><th>Class</th><th>Contact</th><th>Preference</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>{[...filteredEnquiries].reverse().map(eq => (
                      <tr key={eq.id} className={eq.contacted ? 'row--contacted' : ''}>
                        <td data-label="Date" className="td-date">{new Date(eq.timestamp || eq.id).toLocaleDateString('en-IN')}</td>
                        <td data-label="Student"><strong>{eq.studentName}</strong>{eq.address && <small>{eq.address}</small>}</td>
                        <td data-label="Parent">{eq.parentName}</td>
                        <td data-label="Class"><span className="badge badge-green">{eq.classInterested}</span></td>
                        <td data-label="Contact"><div className="adm-contact-actions"><a href={`tel:${eq.phone}`}><Phone size={14} />{eq.phone}</a>{eq.email && <a href={`mailto:${eq.email}`}><Mail size={14} />Email</a>}</div></td>
                        <td data-label="Preference">{eq.preferredTime || 'Office hours'}</td>
                        <td data-label="Status"><button className={`adm-status-btn ${eq.contacted ? 'done' : ''}`} onClick={() => markContacted(eq.id)}>{eq.contacted ? <><CheckCircle2 size={14} />Contacted</> : 'Mark Contacted'}</button></td>
                        <td data-label="Actions"><div className="adm-row-actions"><a className="adm-whatsapp" href={`https://wa.me/91${String(eq.phone).replace(/\D/g,'')}?text=Hello%2C%20this%20is%20Shine%20High%20School%20Admissions.`} target="_blank" rel="noopener noreferrer"><MessageCircle size={14} /></a><button className="adm-del-btn" onClick={() => { if (window.confirm('Delete this enquiry?')) deleteEnquiry(eq.id) }}><Trash2 size={14} /></button></div></td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {tab === 'calendar' && (
            <div className="adm-split">
              <form className="adm-card adm-form" onSubmit={addEventHandler}>
                <h3 className="adm-form__title"><Plus size={18} /> Add Calendar Date</h3>
                <div className="form-group"><label className="form-label">Title *</label><input className="form-input" value={newEvent.title} onChange={e=>setNewEvent({...newEvent,title:e.target.value})} placeholder="e.g. Unit Test Begins" /></div>
                <div className="form-group"><label className="form-label">Date *</label><input type="date" className="form-input" value={newEvent.date} onChange={e=>setNewEvent({...newEvent,date:e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Category</label><select className="form-select" value={newEvent.category} onChange={e=>setNewEvent({...newEvent,category:e.target.value})}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
                <div className="adm-category-preview"><span style={{ background: CATEGORY_COLORS[newEvent.category] }} /> This date will appear as {newEvent.category}</div>
                <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" rows={4} value={newEvent.description} onChange={e=>setNewEvent({...newEvent,description:e.target.value})} placeholder="Add helpful details for parents" /></div>
                <button type="submit" className="btn btn-primary btn-block"><Plus size={17} /> Add Date</button>
              </form>
              <div className="adm-card">
                <div className="adm-card__header adm-card__header--stack"><div><h3>All Calendar Dates</h3><span>{filteredEvents.length} showing</span></div><div className="adm-filter-pills">{['All', ...CATEGORIES].map(c => <button key={c} className={eventFilter === c ? 'active' : ''} onClick={()=>setEventFilter(c)}>{c}</button>)}</div></div>
                <div className="adm-event-list">{filteredEvents.map(ev => <div key={ev.id} className="adm-event-item" style={{ '--event-color': CATEGORY_COLORS[ev.category] || CATEGORY_COLORS.Other }}><div className="adm-event-date"><span>{new Date(ev.date).toLocaleDateString('en-IN',{month:'short'}).toUpperCase()}</span><strong>{new Date(ev.date).getDate()}</strong></div><div className="adm-event-info"><p className="adm-event-title">{ev.title}</p><span className="adm-event-desc">{ev.description}</span><span className="adm-event-chip">{ev.category}</span></div><button className="adm-del-btn" onClick={() => { if(window.confirm('Delete event?')) deleteEvent(ev.id) }}><Trash2 size={14} /></button></div>)}</div>
              </div>
            </div>
          )}

          {tab === 'gallery' && (
            <div className="adm-split">
              <form className="adm-card adm-form" onSubmit={addImgHandler}>
                <h3 className="adm-form__title"><Plus size={18} /> Add Gallery Image</h3>
                <div className="form-group">
                  <label className="form-label">Upload Image *</label>
                  <input type="file" accept="image/*" className="form-input" onChange={e => handleImageUpload(e, setNewImg)} />
                  <div style={{textAlign: 'center', margin: '5px 0', fontSize: '12px', color: '#666'}}>OR</div>
                  <input type="url" className="form-input" value={newImg.src} onChange={e=>setNewImg({...newImg,src:e.target.value})} placeholder="https://..." />
                </div>
                <div className="form-group"><label className="form-label">Title / Caption</label><input className="form-input" value={newImg.title} onChange={e=>setNewImg({...newImg,title:e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Category</label><select className="form-select" value={newImg.category} onChange={e=>setNewImg({...newImg,category:e.target.value})}>{['Campus','Events','Sports','Awards','Cultural','Academics'].map(c=><option key={c}>{c}</option>)}</select></div>
                {newImg.src && <div className="adm-img-preview"><img src={newImg.src} alt="preview" onError={e=>e.target.style.display='none'} /></div>}
                <button type="submit" className="btn btn-primary btn-block"><Plus size={17} /> Add to Gallery</button>
              </form>
              <div className="adm-card"><div className="adm-card__header"><h3>Gallery</h3><span>{gallery.length} images</span></div><div className="adm-gallery-grid">{gallery.map(img => <div key={img.id} className="adm-gallery-item"><img src={img.src || img.thumbnail} alt={img.title} onError={e=>e.target.parentElement.style.display='none'} /><div className="adm-gallery-overlay"><p>{img.title}</p><button onClick={() => { if(window.confirm('Delete image?')) deleteGalleryImage(img.id) }}><Trash2 size={14} /></button></div></div>)}</div></div>
            </div>
          )}

          {tab === 'pride' && (
            <div className="adm-split">
              <form className="adm-card adm-form" onSubmit={addPrideHandler}>
                <h3 className="adm-form__title"><Plus size={18} /> Add Pride Moment</h3>
                <div className="form-group">
                  <label className="form-label">Upload Image *</label>
                  <input type="file" accept="image/*" className="form-input" onChange={e => handleImageUpload(e, setNewPride)} />
                  <div style={{textAlign: 'center', margin: '5px 0', fontSize: '12px', color: '#666'}}>OR</div>
                  <input type="url" className="form-input" value={newPride.src} onChange={e=>setNewPride({...newPride,src:e.target.value})} placeholder="Image URL..." />
                </div>
                <div className="form-group"><label className="form-label">Title / Caption</label><input className="form-input" value={newPride.title} onChange={e=>setNewPride({...newPride,title:e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" rows={3} value={newPride.description} onChange={e=>setNewPride({...newPride,description:e.target.value})} placeholder="Brief description..." /></div>
                {newPride.src && <div className="adm-img-preview"><img src={newPride.src} alt="preview" onError={e=>e.target.style.display='none'} /></div>}
                <button type="submit" className="btn btn-primary btn-block"><Plus size={17} /> Add Pride Moment</button>
              </form>
              <div className="adm-card"><div className="adm-card__header"><h3>Pride Moments</h3><span>{pride.length} items</span></div>
                <div className="adm-gallery-grid">{pride.map(item => (
                  <div key={item.id} className="adm-gallery-item">
                    <img src={item.src} alt={item.title} onError={e=>e.target.parentElement.style.display='none'} />
                    <div className="adm-gallery-overlay"><p>{item.title}</p><button onClick={() => { if(window.confirm('Delete this moment?')) deletePride(item.id) }}><Trash2 size={14} /></button></div>
                  </div>
                ))}</div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function Empty({ icon: Icon, text }) {
  return <div className="adm-empty"><Icon size={48} /><p>{text}</p></div>
}
