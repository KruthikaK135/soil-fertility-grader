'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Cloud, CloudRain, Sun, Wind, Droplets, AlertTriangle, Sprout } from 'lucide-react'

interface WeatherData {
  temperature: number
  humidity: number
  rainfall: number
  windSpeed: number
  condition: string
  advice: string[]
}

export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate weather data fetch
    const mockWeather: WeatherData = {
      temperature: 28,
      humidity: 65,
      rainfall: 2.5,
      windSpeed: 12,
      condition: 'Partly Cloudy',
      advice: [
        'Current conditions favor sowing of short-duration crops',
        'Irrigation needed in 3-4 days based on rainfall forecast',
        'Good day for pesticide application - low wind speed',
        'Monitor for fungal disease in high humidity conditions',
      ],
    }
    
    setTimeout(() => {
      setWeather(mockWeather)
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <Card className="p-6 border-border mb-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="h-32 bg-muted rounded-lg animate-pulse" />
      </Card>
    )
  }

  if (!weather) return null

  const getWeatherIcon = () => {
    if (weather.condition.includes('Rain')) return <CloudRain className="w-8 h-8" />
    if (weather.condition.includes('Cloud')) return <Cloud className="w-8 h-8" />
    return <Sun className="w-8 h-8" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <Card className="p-6 border-border bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Current Weather</h3>
          <div className="text-accent">
            {getWeatherIcon()}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Temperature</p>
            <p className="text-2xl font-bold text-primary">{weather.temperature}°C</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Condition</p>
            <p className="text-lg font-semibold text-foreground">{weather.condition}</p>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-secondary" />
            <div>
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="font-semibold text-foreground">{weather.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-secondary" />
            <div>
              <p className="text-xs text-muted-foreground">Wind</p>
              <p className="font-semibold text-foreground">{weather.windSpeed} km/h</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Cloud className="w-3 h-3" />
            Expected Rainfall: {weather.rainfall}mm
          </p>
        </div>
      </Card>

      <Card className="p-6 border-border">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Sprout className="w-5 h-5 text-accent" />
          Weather-Based Recommendations
        </h3>
        
        <ul className="space-y-2">
          {weather.advice.map((tip, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-2 text-sm"
            >
              <span className="text-accent mt-0.5">•</span>
              <span className="text-muted-foreground">{tip}</span>
            </motion.li>
          ))}
        </ul>
      </Card>
    </motion.div>
  )
}
