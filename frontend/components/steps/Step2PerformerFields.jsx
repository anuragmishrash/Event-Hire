'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'

const PERFORMER_TYPES = [
  'Singer', 'Dancer', 'DJ', 'Band', 'Comedian', 'Magician', 'Anchor/Emcee', 'Other',
]

const GENRE_MAP = {
  Singer: ['Classical', 'Bollywood', 'Sufi', 'Pop', 'Indie', 'Folk'],
  Dancer: ['Bharatanatyam', 'Bollywood', 'Hip-Hop', 'Contemporary', 'Folk', 'Western'],
  DJ: ['EDM', 'Hip-Hop', 'Bollywood', 'Commercial', 'Techno', 'House'],
  Band: ['Rock', 'Bollywood', 'Jazz', 'Pop', 'Classical', 'Folk'],
  Comedian: ['Stand-up', 'Roast', 'Improv', 'Skit'],
  Magician: ['Stage Magic', 'Close-Up', 'Mentalism', 'Illusion'],
  'Anchor/Emcee': ['Corporate', 'Wedding', 'Entertainment', 'Bilingual'],
  Other: ['Mixed', 'Traditional', 'Contemporary', 'Fusion'],
}

const DURATIONS = ['30 min', '1 hour', '2 hours', '3+ hours']

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

function NumberStepper({ value, onChange, min = 1 }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, (value || min) - 1))}
        className="w-9 h-9 rounded-input border border-border bg-surface flex items-center justify-center hover:border-accent/50 transition-colors"
      >
        <Minus size={14} className="text-muted" />
      </button>
      <span className="w-10 text-center font-semibold text-primary">{value || min}</span>
      <button
        type="button"
        onClick={() => onChange((value || min) + 1)}
        className="w-9 h-9 rounded-input border border-border bg-surface flex items-center justify-center hover:border-accent/50 transition-colors"
      >
        <Plus size={14} className="text-muted" />
      </button>
    </div>
  )
}

export default function Step2PerformerFields({ formData, onUpdate, onNext, onBack }) {
  const [errors, setErrors] = useState({})

  const genres = GENRE_MAP[formData.performerType] || []

  const toggleGenre = (g) => {
    const curr = formData.genre || []
    onUpdate({ genre: curr.includes(g) ? curr.filter(x => x !== g) : [...curr, g] })
  }

  const validate = () => {
    const e = {}
    if (!formData.performerType) e.performerType = 'Please select a performer type'
    if (!formData.performanceDuration) e.performanceDuration = 'Please select a duration'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-primary">Performer Requirements</h2>
        <p className="text-muted text-sm mt-1">Tell us what kind of performer you're looking for.</p>
      </div>

      {/* Performer Type */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">Performer Type <span className="text-red-500">*</span></label>
        <select
          className={`input-base ${errors.performerType ? 'border-red-400' : ''}`}
          value={formData.performerType || ''}
          onChange={e => {
            onUpdate({ performerType: e.target.value, genre: [] })
          }}
        >
          <option value="">Select performer type…</option>
          {PERFORMER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.performerType && <p className="text-red-500 text-xs">{errors.performerType}</p>}
      </div>

      {/* Genre (conditional on performer type) */}
      {formData.performerType && genres.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Genre / Style</label>
          <div className="flex flex-wrap gap-2">
            {genres.map(g => (
              <Chip
                key={g}
                label={g}
                selected={(formData.genre || []).includes(g)}
                onToggle={() => toggleGenre(g)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Performance Duration */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Performance Duration <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {DURATIONS.map(d => (
            <button
              key={d}
              type="button"
              onClick={() => onUpdate({ performanceDuration: d })}
              className={`py-2.5 px-3 rounded-input border text-sm font-medium transition-all duration-150 ${
                formData.performanceDuration === d
                  ? 'border-accent bg-accent/5 text-accent'
                  : 'border-border bg-surface text-muted hover:border-accent/50'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        {errors.performanceDuration && <p className="text-red-500 text-xs">{errors.performanceDuration}</p>}
      </div>

      {/* Number of Performers */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Number of Performers</label>
        <NumberStepper
          value={formData.numberOfPerformers}
          onChange={v => onUpdate({ numberOfPerformers: v })}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack} className="btn-secondary">← Back</button>
        <button type="button" onClick={() => validate() && onNext()} className="btn-primary">Continue →</button>
      </div>
    </div>
  )
}
