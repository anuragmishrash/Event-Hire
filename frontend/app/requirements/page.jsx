'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getAllRequirements } from '@/lib/api'
import { Calendar, MapPin, Loader2, ArrowLeft } from 'lucide-react'

const CATEGORY_COLORS = {
  planner: { bg: 'bg-violet-100', text: 'text-violet-700', label: 'Event Planner', icon: '🗂' },
  performer: { bg: 'bg-pink-100', text: 'text-pink-700', label: 'Performer', icon: '🎤' },
  crew: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Crew', icon: '👷' },
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  } catch (e) {
    return dateStr
  }
}

export default function RequirementsPage() {
  const [requirements, setRequirements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReqs = async () => {
      try {
        const { data } = await getAllRequirements()
        setRequirements(data.data || [])
      } catch (err) {
        console.error(err)
        setError('Failed to load requirements. Please check if the backend is running.')
      } finally {
        setLoading(false)
      }
    }
    fetchReqs()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 overflow-hidden">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
        <p className="mt-4 text-muted font-medium">Loading requirements...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-red-500 font-medium mb-5">{error}</p>
        <button onClick={() => window.location.reload()} className="btn-secondary">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 mt-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <a href="/post" className="hidden sm:flex w-12 h-12 rounded-full bg-surface/60 backdrop-blur-md items-center justify-center border border-white hover:bg-white transition-all shadow-sm shrink-0">
          <ArrowLeft size={20} className="text-primary" />
        </a>
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-primary leading-tight flex items-center gap-3">
            <a href="/post" className="sm:hidden text-primary shrink-0"><ArrowLeft size={24} /></a>
            All Requirements
          </h1>
          <p className="text-muted text-sm mt-1.5 sm:ml-0 ml-9">
            Browse the latest hiring posts for events.
          </p>
        </div>
      </div>

      {requirements.length === 0 ? (
        <div className="card p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
          <span className="text-5xl mb-5">📭</span>
          <h2 className="font-heading text-2xl font-bold text-primary mb-2">No requirements yet</h2>
          <p className="text-muted text-sm max-w-sm mb-8">There are no open requirements at the moment. Be the first to post one!</p>
          <a href="/post" className="btn-primary flex items-center gap-2">
            Post a Requirement
          </a>
        </div>
      ) : (
        <div className="grid gap-5">
          {requirements.map((req, i) => {
            const cat = CATEGORY_COLORS[req.category] || CATEGORY_COLORS.planner
            
            const displayDate = req.dateType === 'single' 
              ? formatDate(req.eventDate) 
              : `${formatDate(req.startDate)} - ${formatDate(req.endDate)}`

            return (
              <motion.div
                key={req._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 250, damping: 25 }}
                className="card p-5 sm:p-6 hover:shadow-card-hover transition-shadow duration-300 relative group overflow-hidden"
              >
                {/* Subtle highlight gradient on hover */}
                <div className="absolute inset-x-0 -bottom-px h-1 bg-gradient-to-r from-accent to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col sm:flex-row justify-between gap-5 mb-5 border-b border-border/50 pb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cat.bg} ${cat.text}`}>
                        <span>{cat.icon}</span> {cat.label}
                      </span>
                      <span className="text-xs text-muted font-medium bg-background border border-border px-2.5 py-1 rounded-md">
                        {req.eventType}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-primary">{req.eventName}</h3>
                  </div>
                  
                  <div className="flex flex-col gap-2.5 text-sm text-primary sm:text-right shrink-0">
                    <div className="flex items-center sm:justify-end gap-2 text-muted sm:text-primary">
                       <MapPin size={16} className="text-muted" /> {req.location}
                    </div>
                    {displayDate && (
                      <div className="flex items-center sm:justify-end gap-2 text-muted sm:text-primary">
                        <Calendar size={16} className="text-muted" /> {displayDate}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {req.category === 'planner' && (
                     <div className="space-y-3">
                       <p className="text-xs font-semibold text-muted uppercase tracking-wider">Services Needed</p>
                       <div className="flex flex-wrap gap-2">
                         {req.servicesNeeded?.length ? req.servicesNeeded.map(s => (
                           <span key={s} className="text-xs font-medium text-primary bg-surface border border-border px-3 py-1.5 rounded-full shadow-sm">{s}</span>
                         )) : <span className="text-sm text-muted">Not specified</span>}
                       </div>
                     </div>
                  )}
                  {req.category === 'performer' && (
                     <div className="grid sm:grid-cols-2 gap-4">
                       <div>
                         <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Performer Details</p>
                         <p className="text-sm font-medium"><span className="text-muted mr-1">Type:</span> {req.performerType || '--'}</p>
                         <p className="text-sm font-medium"><span className="text-muted mr-1">Duration:</span> {req.performanceDuration || '--'}</p>
                       </div>
                       <div>
                         <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Budget</p>
                         <p className="text-sm font-medium text-primary">{req.budget || '--'}</p>
                       </div>
                     </div>
                  )}
                  {req.category === 'crew' && (
                     <div className="grid sm:grid-cols-2 gap-4">
                       <div>
                         <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Crew Needs</p>
                         <p className="text-sm font-medium line-clamp-1"><span className="text-muted mr-1">Roles:</span> {req.crewRoles?.join(', ') || '--'}</p>
                         <p className="text-sm font-medium"><span className="text-muted mr-1">Total Needed:</span> {req.numberOfCrewNeeded || '--'}</p>
                       </div>
                       <div>
                         <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Shift</p>
                         <p className="text-sm font-medium text-primary">{req.shiftType || '--'}</p>
                       </div>
                     </div>
                  )}
                </div>
                
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
