'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Event Basics' },
  { id: 2, label: 'Requirements' },
  { id: 3, label: 'Details' },
  { id: 4, label: 'Review' },
]

export default function StepIndicator({ currentStep }) {
  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-border z-0" />

        {/* Active progress line */}
        <motion.div
          className="absolute top-4 left-0 h-0.5 bg-accent z-0 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: (currentStep - 1) / (STEPS.length - 1) }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{ width: '100%' }}
        />

        {STEPS.map((step) => {
          const isCompleted = currentStep > step.id
          const isActive = currentStep === step.id

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isCompleted || isActive ? '#6C47FF' : '#FFFFFF',
                  borderColor: isCompleted || isActive ? '#6C47FF' : '#E5E4E0',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-sm"
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <Check size={14} className="text-white" strokeWidth={3} />
                  </motion.div>
                ) : (
                  <span
                    className={`text-xs font-bold ${
                      isActive ? 'text-white' : 'text-muted'
                    }`}
                  >
                    {step.id}
                  </span>
                )}
              </motion.div>

              <span
                className={`text-xs font-medium hidden sm:block transition-colors duration-200 ${
                  isActive ? 'text-accent' : isCompleted ? 'text-primary' : 'text-muted'
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
