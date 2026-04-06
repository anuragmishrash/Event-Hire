'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

const CREW_ROLES = [
  'Photographer', 'Videographer', 'Sound Technician', 'Lighting Technician',
  'Stage Manager', 'Security', 'Usher', 'Catering Staff', 'Setup/Teardown', 'Driver',
]
const SHIFT_TYPES = ['Full Day', 'Half Day', 'Specific Hours']

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

export default function Step2CrewFields({ formData, onUpdate, onNext, onBack }) {
  const [errors, setErrors] = useState({})

  const toggleRole = (r) => {
    const curr = formData.crewRoles || []
    onUpdate({ crewRoles: curr.includes(r) ? curr.filter(x => x !== r) : [...curr, r] })
  }

  const validate = () => {
    const e = {}
    if (!formData.crewRoles?.length) e.crewRoles = 'Select at least one role'
    if (!formData.shiftType) e.shiftType = 'Please select a shift type'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-primary">Crew Requirements</h2>
        <p className="text-muted text-sm mt-1">Select the crew roles you need for your event.</p>
      </div>

      {/* Crew Roles */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Crew Roles Needed <span className="text-red-500">*</span></label>
        <div className="flex flex-wrap gap-2">
          {CREW_ROLES.map(r => (
            <Chip
              key={r}
              label={r}
              selected={(formData.crewRoles || []).includes(r)}
              onToggle={() => toggleRole(r)}
            />
          ))}
        </div>
        {errors.crewRoles && <p className="text-red-500 text-xs">{errors.crewRoles}</p>}
      </div>

      {/* Number of Crew */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Number of Crew Needed</label>
        <NumberStepper
          value={formData.numberOfCrewNeeded}
          onChange={v => onUpdate({ numberOfCrewNeeded: v })}
        />
      </div>

      {/* Shift Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Shift Type <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-3 gap-2">
          {SHIFT_TYPES.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => onUpdate({ shiftType: s, shiftHours: s !== 'Specific Hours' ? '' : formData.shiftHours })}
              className={`py-2.5 px-3 rounded-input border text-sm font-medium transition-all duration-150 ${
                formData.shiftType === s
                  ? 'border-accent bg-accent/5 text-accent'
                  : 'border-border bg-surface text-muted hover:border-accent/50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {errors.shiftType && <p className="text-red-500 text-xs">{errors.shiftType}</p>}
      </div>

      {/* Shift Hours (conditional) */}
      <AnimatePresence>
        {formData.shiftType === 'Specific Hours' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-primary">Specify Hours</label>
              <input
                className="input-base"
                placeholder="e.g. 6pm–11pm"
                value={formData.shiftHours || ''}
                onChange={e => onUpdate({ shiftHours: e.target.value })}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack} className="btn-secondary">← Back</button>
        <button type="button" onClick={() => validate() && onNext()} className="btn-primary">Continue →</button>
      </div>
    </div>
  )
}
