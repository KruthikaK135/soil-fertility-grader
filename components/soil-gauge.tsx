'use client'

import { motion } from 'framer-motion'

interface SoilGaugeProps {
  score: number
}

export function SoilGauge({ score }: SoilGaugeProps) {
  const getColor = (score: number) => {
    if (score < 40) return { text: 'text-red-600', bg: 'from-red-500 to-red-600', label: 'Poor' }
    if (score < 70) return { text: 'text-yellow-600', bg: 'from-yellow-500 to-yellow-600', label: 'Moderate' }
    if (score < 90) return { text: 'text-green-600', bg: 'from-green-500 to-green-600', label: 'Good' }
    return { text: 'text-blue-600', bg: 'from-blue-500 to-blue-600', label: 'Excellent' }
  }

  const color = getColor(score)
  const rotation = (score / 100) * 180 - 90

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Fertility Score</h2>
      
      <div className="relative w-48 h-32 mx-auto mb-6">
        <svg viewBox="0 0 200 120" className="w-full">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          
          {/* Gradient arc based on score */}
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(239, 68, 68)" />
              <stop offset="33%" stopColor="rgb(234, 179, 8)" />
              <stop offset="66%" stopColor="rgb(34, 197, 94)" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" />
            </linearGradient>
          </defs>

          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            strokeDasharray={`${(score / 100) * 251.2} 251.2`}
            className="transition-all duration-1000"
          />

          {/* Center circle */}
          <circle cx="100" cy="100" r="12" fill="currentColor" className="text-primary" />
        </svg>

        {/* Pointer */}
        <motion.div
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-1 h-16 bg-gradient-to-b from-primary to-transparent rounded-full origin-bottom" />
        </motion.div>
      </div>

      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={`text-5xl font-bold ${color.text} mb-2`}
        >
          {score}
        </motion.div>
        <div className={`text-lg font-semibold ${color.text}`}>{color.label}</div>
      </div>
    </div>
  )
}
