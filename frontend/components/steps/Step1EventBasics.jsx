'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Building2 } from 'lucide-react'

const EVENT_TYPES = [
  'Wedding', 'Concert', 'Corporate Event', 'Birthday Party',
  'Festival', 'Conference', 'Private Party', 'Other',
]

const CATEGORIES = [
  {
    id: 'planner',
    icon: '🗂',
    label: 'Event Planner',
    subtitle: 'Coordinate the full event',
  },
  {
    id: 'performer',
    icon: '🎤',
    label: 'Performer',
    subtitle: 'Artists, DJs, bands & entertainers',
  },
  {
    id: 'crew',
    icon: '👷',
    label: 'Crew',
    subtitle: 'Technical staff & ground team',
  },
]

export default function Step1EventBasics({ formData, onUpdate, onNext }) {
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!formData.eventName?.trim()) e.eventName = 'Event name is required'
    if (!formData.eventType) e.eventType = 'Please select an event type'
    if (!formData.location?.trim()) e.location = 'Location is required'
    if (!formData.category) e.category = 'Please select who you are hiring for'
    if (!formData.dateType) e.dateType = 'Please select a date type'
    if (formData.dateType === 'single' && !formData.eventDate) e.eventDate = 'Please select a date'
    if (formData.dateType === 'range') {
      if (!formData.startDate) e.startDate = 'Start date is required'
      if (!formData.endDate) e.endDate = 'End date is required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (validate()) onNext()
  }

  const field = (key, value) => onUpdate({ [key]: value })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-primary">Event Basics</h2>
        <p className="text-muted text-sm mt-1">Tell us about the event you're organising.</p>
      </div>

      {/* Event Name */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">Event Name <span className="text-red-500">*</span></label>
        <input
          className={`input-base ${errors.eventName ? 'border-red-400 focus:ring-red-400' : ''}`}
          placeholder="e.g. Sharma Wedding Reception"
          value={formData.eventName || ''}
          onChange={e => field('eventName', e.target.value)}
          onBlur={() => formData.eventName?.trim() ? setErrors(p => ({ ...p, eventName: '' })) : null}
        />
        {errors.eventName && <p className="text-red-500 text-xs">{errors.eventName}</p>}
      </div>

      {/* Event Type */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">Event Type <span className="text-red-500">*</span></label>
        <select
          className={`input-base ${errors.eventType ? 'border-red-400' : ''}`}
          value={formData.eventType || ''}
          onChange={e => field('eventType', e.target.value)}
        >
          <option value="">Select event type…</option>
          {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.eventType && <p className="text-red-500 text-xs">{errors.eventType}</p>}
      </div>

      {/* Date Type Toggle */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-primary">Event Date <span className="text-red-500">*</span></label>
        <div className="flex gap-2">
          {['single', 'range'].map(type => (
            <button
              key={type}
              type="button"
              onClick={() => field('dateType', type)}
              className={`flex-1 py-2.5 px-4 rounded-input border text-sm font-medium transition-all duration-150 ${
                formData.dateType === type
                  ? 'border-accent bg-accent/5 text-accent'
                  : 'border-border bg-surface text-muted hover:border-accent/50'
              }`}
            >
              {type === 'single' ? 'Single Date' : 'Date Range'}
            </button>
          ))}
        </div>
        {errors.dateType && <p className="text-red-500 text-xs">{errors.dateType}</p>}

        <AnimatePresence mode="wait">
          {formData.dateType === 'single' && (
            <motion.div
              key="single"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="relative">
                <Calendar size={15} className="absolute left-3 top-3.5 text-muted" />
                <input
                  type="date"
                  className={`input-base !pl-10 ${errors.eventDate ? 'border-red-400' : ''}`}
                  value={formData.eventDate || ''}
                  onChange={e => field('eventDate', e.target.value)}
                />
              </div>
              {errors.eventDate && <p className="text-red-500 text-xs mt-1">{errors.eventDate}</p>}
            </motion.div>
          )}

          {formData.dateType === 'range' && (
            <motion.div
              key="range"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-muted">Start Date</label>
                  <input
                    type="date"
                    className={`input-base ${errors.startDate ? 'border-red-400' : ''}`}
                    value={formData.startDate || ''}
                    onChange={e => field('startDate', e.target.value)}
                  />
                  {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted">End Date</label>
                  <input
                    type="date"
                    className={`input-base ${errors.endDate ? 'border-red-400' : ''}`}
                    value={formData.endDate || ''}
                    onChange={e => field('endDate', e.target.value)}
                  />
                  {errors.endDate && <p className="text-red-500 text-xs">{errors.endDate}</p>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Location */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">Location <span className="text-red-500">*</span></label>
        <div className="relative">
          <MapPin size={15} className="absolute left-3 top-3.5 text-muted" />
          <input
            className={`input-base !pl-10 ${errors.location ? 'border-red-400' : ''}`}
            placeholder="City or area"
            value={formData.location || ''}
            onChange={e => field('location', e.target.value)}
          />
        </div>
        {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
      </div>

      {/* Venue (optional) */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">
          Venue <span className="text-muted font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <Building2 size={15} className="absolute left-3 top-3.5 text-muted" />
          <input
            className="input-base !pl-10"
            placeholder="Hotel, banquet hall, outdoor venue…"
            value={formData.venue || ''}
            onChange={e => field('venue', e.target.value)}
          />
        </div>
      </div>

      {/* Hiring For */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-primary">Hiring For <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              role="radio"
              aria-checked={formData.category === cat.id}
              onClick={() => field('category', cat.id)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && field('category', cat.id)}
              className={`flex flex-col items-start gap-2 p-4 rounded-card border-2 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                formData.category === cat.id
                  ? 'border-accent bg-accent/5 shadow-card-hover'
                  : 'border-border bg-surface hover:border-accent/40 hover:shadow-card'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <p className={`font-semibold text-sm ${formData.category === cat.id ? 'text-accent' : 'text-primary'}`}>
                  {cat.label}
                </p>
                <p className="text-muted text-xs mt-0.5">{cat.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
        {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
      </div>

      {/* Next Button */}
      <div className="pt-2">
        <button onClick={handleNext} className="btn-primary w-full sm:w-auto min-w-[140px]">
          Continue →
        </button>
      </div>
    </div>
  )
}
