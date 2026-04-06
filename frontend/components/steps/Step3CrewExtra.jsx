'use client'

import { motion, AnimatePresence } from 'framer-motion'

const PAY_TYPES = ['Fixed', 'Hourly', 'Negotiable']

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
        <span className={`toggle-thumb ${value ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  )
}

export default function Step3CrewExtra({ formData, onUpdate, onNext, onBack }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-primary">Crew Details</h2>
        <p className="text-muted text-sm mt-1">Compensation and additional requirements for your crew.</p>
      </div>

      {/* Pay Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Pay Type</label>
        <div className="grid grid-cols-3 gap-2">
          {PAY_TYPES.map(p => (
            <button
              key={p}
              type="button"
              onClick={() => onUpdate({ payType: p })}
              className={`py-2.5 px-3 rounded-input border text-sm font-medium transition-all duration-150 ${
                formData.payType === p
                  ? 'border-accent bg-accent/5 text-accent'
                  : 'border-border bg-surface text-muted hover:border-accent/50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Estimated Pay (conditional) */}
      <AnimatePresence>
        {(formData.payType === 'Fixed' || formData.payType === 'Hourly') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-primary">
                Estimated Pay {formData.payType === 'Hourly' ? '(per hour)' : '(total)'}
              </label>
              <input
                className="input-base"
                placeholder={formData.payType === 'Hourly' ? 'e.g. ₹500/hr' : 'e.g. ₹5000 total'}
                value={formData.estimatedPay || ''}
                onChange={e => onUpdate({ estimatedPay: e.target.value })}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Uniform Required */}
      <div className="space-y-3 bg-background rounded-card border border-border p-4">
        <Toggle
          label="Uniform Required"
          value={formData.uniformRequired}
          onChange={v => onUpdate({ uniformRequired: v, uniformDetails: v ? formData.uniformDetails : '' })}
        />
        <AnimatePresence>
          {formData.uniformRequired && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <input
                className="input-base mt-2"
                placeholder="Describe uniform (e.g. Black formal shirt and trousers)"
                value={formData.uniformDetails || ''}
                onChange={e => onUpdate({ uniformDetails: e.target.value })}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Experience Required */}
      <div className="bg-background rounded-card border border-border p-4">
        <Toggle
          label="Prior experience required"
          value={formData.experienceRequired}
          onChange={v => onUpdate({ experienceRequired: v })}
        />
      </div>

      {/* Physical Requirements */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">
          Physical Requirements <span className="text-muted font-normal">(Optional)</span>
        </label>
        <textarea
          rows={3}
          className="input-base resize-none"
          placeholder="Any physical demands — lifting, standing for long hours, outdoor work…"
          value={formData.physicalRequirements || ''}
          onChange={e => onUpdate({ physicalRequirements: e.target.value })}
        />
      </div>

      {/* Additional Instructions */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">
          Additional Instructions <span className="text-muted font-normal">(Optional)</span>
        </label>
        <textarea
          rows={3}
          className="input-base resize-none"
          placeholder="Any other instructions for the crew…"
          value={formData.additionalInstructions || ''}
          onChange={e => onUpdate({ additionalInstructions: e.target.value })}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack} className="btn-secondary">← Back</button>
        <button type="button" onClick={onNext} className="btn-primary">Review →</button>
      </div>
    </div>
  )
}
