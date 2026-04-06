'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, RotateCcw } from 'lucide-react'

const CATEGORY_COLORS = {
  planner: { bg: 'bg-violet-100', text: 'text-violet-700', label: 'Event Planner' },
  performer: { bg: 'bg-pink-100', text: 'text-pink-700', label: 'Performer' },
  crew: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Crew' },
}

export default function SuccessScreen({ formData, onReset }) {
  const cat = CATEGORY_COLORS[formData.category] || CATEGORY_COLORS.planner

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="card p-10 flex flex-col items-center text-center gap-6"
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 400, damping: 20 }}
        >
          <CheckCircle size={44} className="text-success" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <div className="space-y-2">
        <h1 className="font-heading font-bold text-3xl text-primary">Requirement Posted!</h1>
        <p className="text-muted text-sm max-w-sm mx-auto">
          Your hiring requirement has been successfully submitted. We'll get back to you soon.
        </p>
      </div>

      {/* Category badge */}
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${cat.bg} ${cat.text}`}>
        Posted under: {cat.label}
      </span>

      {/* Event info */}
      <div className="w-full bg-background border border-border rounded-card p-5 space-y-3">
        <div className="flex items-start justify-between text-sm">
          <span className="text-muted font-medium">Event Name</span>
          <span className="text-primary font-semibold text-right max-w-[60%]">{formData.eventName}</span>
        </div>
        <div className="border-t border-border" />
        <div className="flex items-start justify-between text-sm">
          <span className="text-muted font-medium">Location</span>
          <span className="text-primary font-semibold">{formData.location}</span>
        </div>
        {formData.eventType && (
          <>
            <div className="border-t border-border" />
            <div className="flex items-start justify-between text-sm">
              <span className="text-muted font-medium">Event Type</span>
              <span className="text-primary font-semibold">{formData.eventType}</span>
            </div>
          </>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          onClick={onReset}
          className="btn-secondary flex items-center justify-center gap-2 flex-1"
        >
          <RotateCcw size={15} />
          Post Another Requirement
        </button>
        <a
          href="/requirements"
          className="btn-primary flex items-center justify-center gap-2 flex-1"
        >
          View All Requirements
          <ArrowRight size={15} />
        </a>
      </div>
    </motion.div>
  )
}
