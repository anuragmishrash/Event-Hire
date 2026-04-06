'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LANGUAGES = ['Hindi', 'English', 'Marathi', 'Tamil', 'Bengali', 'Other']
const URGENCY_OPTIONS = ['Flexible', 'Within 1 Week', 'Within 1 Month', 'Urgent']

function Chip({ label, selected, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`chip-transition px-3 py-1.5 rounded-full border text-sm font-medium cursor-pointer select-none ${
        selected
          ? 'bg-accent text-white border-accent'
          : 'bg-surface text-primary border-border hover:border-accent/60'
      }`}
    >
      {label}
    </button>
  )
}

function Toggle({ value, onChange, label }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-primary">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={!!value}
        onClick={() => onChange(!value)}
        className={`toggle-track w-11 h-6 ${value ? 'bg-accent' : 'bg-border'}`}
      >
        <span
          className={`toggle-thumb ${value ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  )
}

export default function Step3PlannerExtra({ formData, onUpdate, onNext, onBack }) {
  const toggleLang = (l) => {
    const curr = formData.preferredLanguages || []
    onUpdate({ preferredLanguages: curr.includes(l) ? curr.filter(x => x !== l) : [...curr, l] })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-primary">Additional Details</h2>
        <p className="text-muted text-sm mt-1">A few more things to help us find the perfect planner.</p>
      </div>

      {/* Special Requirements */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">Special Requirements</label>
        <textarea
          rows={4}
          className="input-base resize-none"
          placeholder="Any special instructions, dietary needs, religious considerations…"
          value={formData.specialRequirements || ''}
          onChange={e => onUpdate({ specialRequirements: e.target.value })}
        />
      </div>

      {/* Preferred Languages */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Preferred Languages</label>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map(l => (
            <Chip
              key={l}
              label={l}
              selected={(formData.preferredLanguages || []).includes(l)}
              onToggle={() => toggleLang(l)}
            />
          ))}
        </div>
      </div>

      {/* Remote OK */}
      <div className="bg-background rounded-card border border-border p-4">
        <Toggle
          label="Remote / Virtual Planning OK"
          value={formData.remoteOk}
          onChange={v => onUpdate({ remoteOk: v })}
        />
      </div>

      {/* Urgency */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Urgency</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {URGENCY_OPTIONS.map(u => (
            <button
              key={u}
              type="button"
              onClick={() => onUpdate({ urgency: u })}
              className={`py-2.5 px-3 rounded-input border text-sm font-medium transition-all duration-150 ${
                formData.urgency === u
                  ? 'border-accent bg-accent/5 text-accent'
                  : 'border-border bg-surface text-muted hover:border-accent/50'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack} className="btn-secondary">← Back</button>
        <button type="button" onClick={onNext} className="btn-primary">Review →</button>
      </div>
    </div>
  )
}
