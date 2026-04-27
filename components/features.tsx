'use client'

import { Card } from '@/components/ui/card'
import { Droplets, TrendingUp, Leaf, Zap, MessageSquare, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: Droplets,
    title: 'Soil Moisture Analysis',
    description: 'Predict moisture levels based on visual cues like cracks, shade, and surface shine.',
  },
  {
    icon: TrendingUp,
    title: 'Fertility Score',
    description: 'Get an AI-powered fertility score (0-100) with color-coded risk assessment.',
  },
  {
    icon: Leaf,
    title: 'Crop Suitability',
    description: 'Discover the top 10 crops best suited for your soil type and conditions.',
  },
  {
    icon: Zap,
    title: 'Fertilizer Recommendations',
    description: 'Get exact NPK ratios and dosage recommendations tailored to your soil.',
  },
  {
    icon: MessageSquare,
    title: 'AI Agricultural Chatbot',
    description: 'Ask any question about soil health, crops, and farming with voice support.',
  },
  {
    icon: BarChart3,
    title: 'Soil Comparison',
    description: 'Compare multiple soil samples side-by-side with detailed radar charts.',
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive soil analysis tools designed for farmers, researchers, and agricultural professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="p-6 border border-border hover:border-accent/50 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
