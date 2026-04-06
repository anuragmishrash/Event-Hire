'use client'

import { useState } from 'react'
import { Loader2, Edit3 } from 'lucide-react'
import toast from 'react-hot-toast'
import { submitRequirement } from '@/lib/api'

function Section({ title, children }) {
  return (
    <div className="space-y-3">
      <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted border-b border-border pb-2">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function Row({ label, value }) {
  if (!value && value !== false && value !== 0) return null
  const display = Array.isArray(value) ? value.join(', ') : String(value)
  if (!display) return null
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-muted min-w-[140px]">{label}</span>
      <span className="text-primary font-medium text-right">{display}</span>
    </div>
  )
}

export default function Step4Review({ formData, onBack, onSubmitSuccess }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await submitRequirement(formData.category, formData)
      toast.success('Requirement posted successfully!')
      onSubmitSuccess()
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const catLabel = { planner: 'Event Planner', performer: 'Performer', crew: 'Crew' }[formData.category]
  const dateDisplay = formData.dateType === 'single'
    ? formData.eventDate
    : `${formData.startDate} → ${formData.endDate}`

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-primary">Review & Submit</h2>
        <p className="text-muted text-sm mt-1">Double-check everything before posting your requirement.</p>
      </div>

      {/* Summary Card */}
      <div className="card p-6 space-y-6">
        {/* Category badge */}
        <div className="flex items-center gap-2">
          <span className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full">
            {catLabel}
          </span>
        </div>

        <Section title="Event Details">
          <Row label="Event Name" value={formData.eventName} />
          <Row label="Event Type" value={formData.eventType} />
          <Row label="Date" value={dateDisplay} />
          <Row label="Location" value={formData.location} />
          <Row label="Venue" value={formData.venue} />
        </Section>

        {/* Planner-specific */}
        {formData.category === 'planner' && (
          <Section title="Requirements">
            <Row label="Services Needed" value={formData.servicesNeeded} />
            <Row label="Estimated Budget" value={formData.estimatedBudget} />
            <Row label="Guest Count" value={formData.guestCount} />
            <Row label="Experience Level" value={formData.experienceLevel} />
            <Row label="Special Requirements" value={formData.specialRequirements} />
            <Row label="Preferred Languages" value={formData.preferredLanguages} />
            <Row label="Remote OK" value={formData.remoteOk ? 'Yes' : 'No'} />
            <Row label="Urgency" value={formData.urgency} />
          </Section>
        )}

        {/* Performer-specific */}
        {formData.category === 'performer' && (
          <Section title="Requirements">
            <Row label="Performer Type" value={formData.performerType} />
            <Row label="Genre / Style" value={formData.genre} />
            <Row label="Duration" value={formData.performanceDuration} />
            <Row label="Number of Performers" value={formData.numberOfPerformers} />
            <Row label="Budget" value={formData.budget} />
            <Row label="Technical Requirements" value={formData.technicalRequirements} />
            <Row label="Languages" value={formData.languages} />
            <Row label="Audience Size" value={formData.audienceSize} />
            <Row label="Has Performed Before" value={formData.hasPerformedBefore ? 'Yes' : 'No'} />
            <Row label="Additional Notes" value={formData.additionalNotes} />
          </Section>
        )}

        {/* Crew-specific */}
        {formData.category === 'crew' && (
          <Section title="Requirements">
            <Row label="Crew Roles" value={formData.crewRoles} />
            <Row label="Number of Crew" value={formData.numberOfCrewNeeded} />
            <Row label="Shift Type" value={formData.shiftType} />
            <Row label="Shift Hours" value={formData.shiftHours} />
            <Row label="Pay Type" value={formData.payType} />
            <Row label="Estimated Pay" value={formData.estimatedPay} />
            <Row label="Uniform Required" value={formData.uniformRequired ? 'Yes' : 'No'} />
            <Row label="Uniform Details" value={formData.uniformDetails} />
            <Row label="Experience Required" value={formData.experienceRequired ? 'Yes' : 'No'} />
            <Row label="Physical Requirements" value={formData.physicalRequirements} />
            <Row label="Additional Instructions" value={formData.additionalInstructions} />
          </Section>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary flex items-center justify-center gap-2"
        >
          <Edit3 size={14} />
          Edit Details
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="btn-primary flex items-center justify-center gap-2 flex-1 sm:flex-none sm:min-w-[200px]"
        >
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Submitting…
            </>
          ) : (
            'Submit Requirement ✓'
          )}
        </button>
      </div>
    </div>
  )
}
