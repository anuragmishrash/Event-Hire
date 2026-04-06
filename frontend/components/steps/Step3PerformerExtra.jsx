'use client'

const BUDGETS = ['Under ₹50K', '₹50K–1L', '₹1L–5L', '₹5L–10L', '₹10L+']
const LANGUAGES = ['Hindi', 'English', 'Marathi', 'Tamil', 'Bengali', 'Other']
const AUDIENCE_SIZES = ['Under 50', '50–200', '200–500', '500–1000', '1000+']

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
        <span className={`toggle-thumb ${value ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  )
}

export default function Step3PerformerExtra({ formData, onUpdate, onNext, onBack }) {
  const toggleLang = (l) => {
    const curr = formData.languages || []
    onUpdate({ languages: curr.includes(l) ? curr.filter(x => x !== l) : [...curr, l] })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-primary">Performer Details</h2>
        <p className="text-muted text-sm mt-1">Help us narrow down the right performer for your event.</p>
      </div>

      {/* Budget */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">Budget Range</label>
        <select
          className="input-base"
          value={formData.budget || ''}
          onChange={e => onUpdate({ budget: e.target.value })}
        >
          <option value="">Select budget range…</option>
          {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      {/* Technical Requirements */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">Technical Requirements</label>
        <textarea
          rows={3}
          className="input-base resize-none"
          placeholder="Stage size, sound system, lighting, microphones, instruments provided…"
          value={formData.technicalRequirements || ''}
          onChange={e => onUpdate({ technicalRequirements: e.target.value })}
        />
      </div>

      {/* Languages */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Preferred Languages</label>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map(l => (
            <Chip
              key={l}
              label={l}
              selected={(formData.languages || []).includes(l)}
              onToggle={() => toggleLang(l)}
            />
          ))}
        </div>
      </div>

      {/* Audience Size */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Expected Audience Size</label>
        <div className="flex flex-wrap gap-2">
          {AUDIENCE_SIZES.map(a => (
            <button
              key={a}
              type="button"
              onClick={() => onUpdate({ audienceSize: a })}
              className={`py-2 px-4 rounded-full border text-sm font-medium transition-all duration-150 ${
                formData.audienceSize === a
                  ? 'border-accent bg-accent/5 text-accent'
                  : 'border-border bg-surface text-muted hover:border-accent/50'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Has Performed Before */}
      <div className="bg-background rounded-card border border-border p-4">
        <Toggle
          label="Has performed at similar events before"
          value={formData.hasPerformedBefore}
          onChange={v => onUpdate({ hasPerformedBefore: v })}
        />
      </div>

      {/* Additional Notes */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">
          Additional Notes <span className="text-muted font-normal">(Optional)</span>
        </label>
        <textarea
          rows={3}
          className="input-base resize-none"
          placeholder="Anything else you'd like the performer to know…"
          value={formData.additionalNotes || ''}
          onChange={e => onUpdate({ additionalNotes: e.target.value })}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack} className="btn-secondary">← Back</button>
        <button type="button" onClick={onNext} className="btn-primary">Review →</button>
      </div>
    </div>
  )
}
