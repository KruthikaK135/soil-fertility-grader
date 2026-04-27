'use client'

import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Leaf, TrendingUp } from 'lucide-react'

interface CropRecommendationsProps {
  crops: { crop: string; suitability: number }[]
  soilType: string
}

export function CropRecommendations({ crops, soilType }: CropRecommendationsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-accent" />
            Top 10 Recommended Crops
          </h3>
          <p className="text-muted-foreground mb-6">
            Best suited for {soilType} soil type
          </p>

          <div className="space-y-3">
            {crops.slice(0, 10).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 bg-accent/5 rounded-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium text-foreground">{item.crop}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.suitability}%` }}
                      transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
                      className="h-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                  <span className="text-sm font-semibold text-primary w-12 text-right">
                    {item.suitability}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
