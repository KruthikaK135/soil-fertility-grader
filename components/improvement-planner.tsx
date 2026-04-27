'use client'

import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'

interface ImprovementPlannerProps {
  soilType: string
  deficiencies: string[]
}

export function ImprovementPlanner({ soilType, deficiencies }: ImprovementPlannerProps) {
  const plans = {
    '7day': [
      { day: 'Day 1-2', task: 'Clear soil debris and weeds', priority: 'High' },
      { day: 'Day 3-4', task: 'Apply surface mulch (5cm layer)', priority: 'High' },
      { day: 'Day 5-6', task: 'Water thoroughly to reach 30cm depth', priority: 'Medium' },
      { day: 'Day 7', task: 'Apply organic compost layer', priority: 'Medium' },
    ],
    '30day': [
      { day: 'Week 1', task: 'Prepare field and remove weeds', priority: 'High' },
      { day: 'Week 2', task: 'Add 10 tons/acre of farmyard manure', priority: 'High' },
      { day: 'Week 3', task: 'Incorporate lime/gypsum based on pH', priority: 'Medium' },
      { day: 'Week 4', task: 'Final soil preparation and leveling', priority: 'Medium' },
    ],
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="7day" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted">
          <TabsTrigger value="7day">7-Day Quick Fix</TabsTrigger>
          <TabsTrigger value="30day">30-Day Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="7day" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {plans['7day'].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    item.priority === 'High' ? 'text-destructive' : 'text-secondary'
                  }`} />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{item.day}</p>
                    <p className="text-sm text-muted-foreground">{item.task}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="30day" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {plans['30day'].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    item.priority === 'High' ? 'text-destructive' : 'text-secondary'
                  }`} />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{item.day}</p>
                    <p className="text-sm text-muted-foreground">{item.task}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      {deficiencies.length > 0 && (
        <Card className="p-6 border-border bg-destructive/5">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            Address These Deficiencies
          </h4>
          <ul className="space-y-2">
            {deficiencies.map((def, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                {def}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
