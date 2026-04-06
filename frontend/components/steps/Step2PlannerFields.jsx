'use client'

import { useState } from 'react'

const SERVICES = [
  'Full Planning', 'Day-of Coordination', 'Vendor Management',
  'Budget Planning', 'Décor', 'Catering Coordination',
]
const BUDGETS = ['Under ₹50K', '₹50K–1L', '₹1L–5L', '₹5L–10L', '₹10L+']
const EXPERIENCE_LEVELS = ['Entry Level', 'Mid-Level', 'Senior', 'Expert']

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

export default function Step2PlannerFields({ formData, onUpdate, onNext, onBack }) {
  const [errors, setErrors] = useState({})

  const toggleService = (s) => {
    const current = formData.servicesNeeded || []
    const updated = current.includes(s) ? current.filter(x => x !== s) : [...current, s]
    onUpdate({ servicesNeeded: updated })
  }

  const validate = () => {
    const e = {}
    if (!formData.servicesNeeded?.length) e.servicesNeeded = 'Select at least one service'
    if (!formData.estimatedBudget) e.estimatedBudget = 'Please select a budget range'
    if (!formData.experienceLevel) e.experienceLevel = 'Please select an experience level'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-primary">Planner Requirements</h2>
        <p className="text-muted text-sm mt-1">Describe what you need from your event planner.</p>
      </div>

      {/* Services Needed */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Services Needed <span className="text-red-500">*</span></label>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map(s => (
            <Chip
              key={s}
              label={s}
              selected={(formData.servicesNeeded || []).includes(s)}
              onToggle={() => toggleService(s)}
            />
          ))}
        </div>
        {errors.servicesNeeded && <p className="text-red-500 text-xs">{errors.servicesNeeded}</p>}
      </div>

      {/* Estimated Budget */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">Estimated Budget <span className="text-red-500">*</span></label>
        <select
          className={`input-base ${errors.estimatedBudget ? 'border-red-400' : ''}`}
          value={formData.estimatedBudget || ''}
          onChange={e => onUpdate({ estimatedBudget: e.target.value })}
        >
          <option value="">Select budget range…</option>
          {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        {errors.estimatedBudget && <p className="text-red-500 text-xs">{errors.estimatedBudget}</p>}
      </div>

      {/* Guest Count */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">Expected Guest Count</label>
        <input
          type="number"
          min={1}
          className="input-base"
          placeholder="e.g. 150"
          value={formData.guestCount || ''}
          onChange={e => onUpdate({ guestCount: parseInt(e.target.value) || '' })}
        />
      </div>

      {/* Experience Level */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Experience Level Required <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {EXPERIENCE_LEVELS.map(lvl => (
            <button
              key={lvl}
              type="button"
              onClick={() => onUpdate({ experienceLevel: lvl })}
              className={`py-2.5 px-3 rounded-input border text-sm font-medium transition-all duration-150 ${
                formData.experienceLevel === lvl
                  ? 'border-accent bg-accent/5 text-accent'
                  : 'border-border bg-surface text-muted hover:border-accent/50'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
        {errors.experienceLevel && <p className="text-red-500 text-xs">{errors.experienceLevel}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack} className="btn-secondary">← Back</button>
        <button type="button" onClick={() => validate() && onNext()} className="btn-primary">Continue →</button>
      </div>
    </div>
  )
}
