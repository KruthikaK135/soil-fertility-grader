'use client'

import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

interface FertilizerEngineProps {
  soilType: string
  nutrients: {
    nitrogen: number
    phosphorus: number
    potassium: number
  }
}

export function FertilizerEngine({ soilType, nutrients }: FertilizerEngineProps) {
  const recommendations = [
    {
      name: 'NPK Ratio',
      value: `${Math.round(nutrients.nitrogen)}-${Math.round(nutrients.phosphorus)}-${Math.round(nutrients.potassium)}`,
      description: 'Recommended nitrogen-phosphorus-potassium ratio',
    },
    {
      name: 'Dosage per Acre',
      value: '50-75 kg',
      description: 'Recommended fertilizer application rate',
    },
    {
      name: 'Application Type',
      value: 'Split Dose',
      description: 'Apply 50% before sowing, 50% at flowering',
    },
    {
      name: 'Organic Alternative',
      value: 'Compost Mix',
      description: 'Mix of farm compost and neem cake',
    },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent" />
          Fertilizer Recommendations
        </h3>
        <p className="text-muted-foreground mb-6">
          Customized for {soilType} soil conditions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-border"
            >
              <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase">
                {rec.name}
              </p>
              <p className="text-2xl font-bold text-primary mb-2">{rec.value}</p>
              <p className="text-sm text-muted-foreground">{rec.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Card className="p-6 border-border bg-accent/5">
        <h4 className="font-semibold text-foreground mb-4">Preventive Treatments</h4>
        <ul className="space-y-2">
          <li className="flex gap-3">
            <span className="text-accent">•</span>
            <span className="text-muted-foreground">Neem oil spray to prevent fungal infections</span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent">•</span>
            <span className="text-muted-foreground">Trichoderma treatment for root health</span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent">•</span>
            <span className="text-muted-foreground">Rhizobium inoculation for nitrogen fixation</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
