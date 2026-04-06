'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import StepIndicator from '@/components/StepIndicator'
import SuccessScreen from '@/components/SuccessScreen'
import Step1EventBasics from '@/components/steps/Step1EventBasics'
import Step2PlannerFields from '@/components/steps/Step2PlannerFields'
import Step3PlannerExtra from '@/components/steps/Step3PlannerExtra'
import Step2PerformerFields from '@/components/steps/Step2PerformerFields'
import Step3PerformerExtra from '@/components/steps/Step3PerformerExtra'
import Step2CrewFields from '@/components/steps/Step2CrewFields'
import Step3CrewExtra from '@/components/steps/Step3CrewExtra'
import Step4Review from '@/components/steps/Step4Review'

const slideVariants = {
  enterFromRight: { x: 60, opacity: 0 },
  enterFromLeft: { x: -60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: -60, opacity: 0 },
  exitToRight: { x: 60, opacity: 0 },
}

export default function PostPage() {
  const [formData, setFormData] = useState({})
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = back

  const updateForm = (fields) => setFormData(prev => ({ ...prev, ...fields }))

  const goNext = () => {
    setDirection(1)
    setCurrentStep(s => s + 1)
  }

  const goBack = () => {
    setDirection(-1)
    setCurrentStep(s => s - 1)
  }

  const handleReset = () => {
    setFormData({})
    setCurrentStep(1)
    setIsSubmitted(false)
    setDirection(1)
  }

  const getStep2Component = () => {
    const props = { formData, onUpdate: updateForm, onNext: goNext, onBack: goBack }
    if (formData.category === 'planner') return <Step2PlannerFields {...props} />
    if (formData.category === 'performer') return <Step2PerformerFields {...props} />
    if (formData.category === 'crew') return <Step2CrewFields {...props} />
    return null
  }

  const getStep3Component = () => {
    const props = { formData, onUpdate: updateForm, onNext: goNext, onBack: goBack }
    if (formData.category === 'planner') return <Step3PlannerExtra {...props} />
    if (formData.category === 'performer') return <Step3PerformerExtra {...props} />
    if (formData.category === 'crew') return <Step3CrewExtra {...props} />
    return null
  }

  const stepComponents = {
    1: <Step1EventBasics formData={formData} onUpdate={updateForm} onNext={goNext} />,
    2: getStep2Component(),
    3: getStep3Component(),
    4: (
      <Step4Review
        formData={formData}
        onBack={goBack}
        onSubmitSuccess={() => setIsSubmitted(true)}
      />
    ),
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <SuccessScreen formData={formData} onReset={handleReset} />
      </motion.div>
    )
  }

  return (
    <div className="space-y-0">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-primary leading-tight">
          Post a Requirement
        </h1>
        <p className="text-muted text-sm mt-1.5">
          Fill in the details to find the right talent for your event.
        </p>
      </div>

      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} />

      {/* Step Card */}
      <div className="card p-6 sm:p-8 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial={direction > 0 ? 'enterFromRight' : 'enterFromLeft'}
            animate="center"
            exit={direction > 0 ? 'exitToLeft' : 'exitToRight'}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {stepComponents[currentStep]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step indicator text for mobile */}
      <p className="text-center text-xs text-muted mt-4 sm:hidden">
        Step {currentStep} of 4
      </p>
    </div>
  )
}
