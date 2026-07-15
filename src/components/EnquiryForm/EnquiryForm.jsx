import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { schoolInfo } from '../../data/initialData'
import { User, Users, Phone, Mail, BookOpen, MessageSquare, Send, CheckCircle, Loader2, Clock, MapPin } from 'lucide-react'
import './EnquiryForm.css'
const CLASS_LIST = ['Nursery','LKG','UKG','Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10']
const CONTACT_TIMES = ['Morning 9 AM - 12 PM','Afternoon 12 PM - 3 PM','Evening 3 PM - 6 PM','Anytime during office hours']

function Field({ id, name, label, type = 'text', icon: Icon, value, onChange, error, children }) {
  const [focused, setFocused] = useState(false)
  const floating = focused || (value && value.length > 0)

  return (
    <div className={`ef-field ${error ? 'ef-field--error' : ''}`}>
      <div className={`ef-field__wrap ${focused ? 'ef-field__wrap--focused' : ''}`}>
        <Icon size={18} className={`ef-field__icon ${floating ? 'ef-field__icon--up' : ''}`} />
        <label className={`ef-field__label ${floating ? 'ef-field__label--up' : ''}`} htmlFor={id}>{label}</label>
        {children || (
          type === 'textarea' ? (
            <textarea id={id} name={name} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} className="ef-field__input ef-field__input--textarea" rows={4} />
          ) : (
            <input id={id} name={name} type={type} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} className="ef-field__input" />
          )
        )}
      </div>
      {error && <span className="ef-field__error">{error}</span>}
    </div>
  )
}

export default function EnquiryForm() {
  const emptyForm = { studentName:'', parentName:'', phone:'', email:'', classInterested:'', preferredTime:'', address:'', message:'' }
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submittedPhone, setSubmittedPhone] = useState('')

  const change = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.studentName.trim()) e.studentName = 'Student name is required'
    if (!form.parentName.trim()) e.parentName = 'Parent name is required'
    if (!/^\d{10}$/.test(form.phone.replace(/\s+/g,''))) e.phone = 'Enter a valid 10-digit number'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.classInterested) e.classInterested = 'Please select a class'
    if (!form.preferredTime) e.preferredTime = 'Choose a contact time'
    return e
  }

  const submit = async (e) => {
  e.preventDefault()

  const errs = validate()

  if (Object.keys(errs).length) {
    setErrors(errs)
    return
  }

  setSubmitting(true)

  const { error } = await supabase
    .from("enquiries")
    .insert([
      {
        studentName: form.studentName,
        parentName: form.parentName,
        phone: form.phone,
        email: form.email,
        classInterested: form.classInterested,
        preferredTime: form.preferredTime,
        address: form.address,
        message: form.message
      }
    ])

  if (error) {
    alert(error.message)
    setSubmitting(false)
    return
  }

  setSubmittedPhone(form.phone)
  setSubmitting(false)
  setSuccess(true)
  setForm(emptyForm)
}

  return (
    <AnimatePresence mode="wait">
      {success ? (
        <motion.div key="success" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 190, damping: 18 } }} exit={{ opacity: 0 }} className="ef-success">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }} className="ef-success__icon">
            <CheckCircle size={56} />
          </motion.div>
          <h3>Enquiry Submitted</h3>
          <p>Thank you. Our admissions team will contact you within 24 hours on <strong>{submittedPhone || schoolInfo.phones[0]}</strong>.</p>
          <div className="ef-success__actions">
            <button className="btn btn-primary" onClick={() => setSuccess(false)}>Submit Another Enquiry</button>
            <a className="btn btn-outline" href={`https://wa.me/${schoolInfo.whatsapp}?text=Hello%2C%20I%20submitted%20an%20admissions%20enquiry.`} target="_blank" rel="noopener noreferrer">WhatsApp Team</a>
          </div>
        </motion.div>
      ) : (
        <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ef-form" onSubmit={submit} noValidate>
          <div className="ef-form__header">
            <span className="ef-kicker">Fast response admissions desk</span>
            <h3 className="ef-form__title">Admissions Enquiry</h3>
            <p className="ef-form__sub">Share the details once. The school office can view, call, track and export it from the admin page.</p>
          </div>

          <div className="ef-row">
            <Field id="studentName" name="studentName" label="Student's Full Name *" icon={User} value={form.studentName} onChange={change} error={errors.studentName} />
            <Field id="parentName" name="parentName" label="Parent / Guardian Name *" icon={Users} value={form.parentName} onChange={change} error={errors.parentName} />
          </div>

          <div className="ef-row">
            <Field id="phone" name="phone" type="tel" label="Mobile Number *" icon={Phone} value={form.phone} onChange={change} error={errors.phone} />
            <Field id="email" name="email" type="email" label="Email Address (optional)" icon={Mail} value={form.email} onChange={change} error={errors.email} />
          </div>

          <div className="ef-row">
            <Field id="classInterested" name="classInterested" label="Class Interested In *" icon={BookOpen} value={form.classInterested} onChange={change} error={errors.classInterested}>
              <select id="classInterested" name="classInterested" value={form.classInterested} onChange={change} className="ef-field__input ef-field__input--select">
                <option value="" disabled hidden></option>
                {CLASS_LIST.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field id="preferredTime" name="preferredTime" label="Preferred Contact Time *" icon={Clock} value={form.preferredTime} onChange={change} error={errors.preferredTime}>
              <select id="preferredTime" name="preferredTime" value={form.preferredTime} onChange={change} className="ef-field__input ef-field__input--select">
                <option value="" disabled hidden></option>
                {CONTACT_TIMES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          <Field id="address" name="address" label="Village / Address" icon={MapPin} value={form.address} onChange={change} error={errors.address} />
          <Field id="message" name="message" type="textarea" label="Message / Any Specific Requirements" icon={MessageSquare} value={form.message} onChange={change} error={errors.message} />

          <button type="submit" className="btn btn-primary btn-block ef-submit" disabled={submitting}>
            {submitting ? <><Loader2 size={18} className="ef-spin" /> Submitting...</> : <><Send size={17} /> Submit Enquiry</>}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
