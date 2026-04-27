'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Upload, Plus, X } from 'lucide-react'
import { analyzeSoilImage } from '@/lib/soil-analysis'
import { RadarChart } from '@/components/radar-chart'

interface SoilData {
  name: string
  soilType: string
  fertilityScore: number
  moisture: number
  ph: number
  organicMatter: string
  preview?: string
}

export function SoilComparison({ currentSoil }: { currentSoil: any }) {
  const [soils, setSoils] = useState<SoilData[]>([
    {
      name: 'Current Sample',
      soilType: currentSoil.soilType,
      fertilityScore: currentSoil.fertilityScore,
      moisture: currentSoil.moisture,
      ph: currentSoil.ph,
      organicMatter: currentSoil.organicMatter,
    },
  ])
  const [uploading, setUploading] = useState(false)

  const handleUploadSample = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const preview = event.target?.result as string
        const result = await analyzeSoilImage(file, preview)
        
        setSoils((prev) => [
          ...prev,
          {
            name: `Sample ${prev.length}`,
            soilType: result.soilType,
            fertilityScore: result.fertilityScore,
            moisture: result.moisture,
            ph: result.ph,
            organicMatter: result.organicMatter,
            preview,
          },
        ])
      }
      reader.readAsDataURL(file)
    } catch (err) {
      console.error('Upload failed:', err)
    } finally {
      setUploading(false)
    }
  }

  const removeSoil = (index: number) => {
    if (index === 0) return // Can't remove current sample
    setSoils((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {/* Add Sample */}
      {soils.length < 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 border-border border-dashed">
            <label className="cursor-pointer block">
              <div className="flex items-center justify-center gap-3 py-8">
                <Upload className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Add Another Soil Sample</p>
                  <p className="text-sm text-muted-foreground">Compare up to 3 samples</p>
                </div>
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleUploadSample}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </Card>
        </motion.div>
      )}

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {soils.map((soil, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 border-border relative">
              {index !== 0 && (
                <button
                  onClick={() => removeSoil(index)}
                  className="absolute top-2 right-2 p-1 hover:bg-destructive/20 rounded transition"
                >
                  <X className="w-4 h-4 text-destructive" />
                </button>
              )}

              <h4 className="font-semibold text-foreground mb-4">{soil.name}</h4>

              {soil.preview && (
                <div className="mb-4 rounded-lg overflow-hidden border border-border h-32">
                  <img src={soil.preview || "/placeholder.svg"} alt={soil.name} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Soil Type</span>
                  <span className="font-semibold text-primary">{soil.soilType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fertility Score</span>
                  <span className="font-semibold text-primary">{soil.fertilityScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Moisture</span>
                  <span className="font-semibold text-secondary">{soil.moisture}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">pH Level</span>
                  <span className="font-semibold text-secondary">{soil.ph.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Organic Matter</span>
                  <span className="font-semibold text-accent">{soil.organicMatter}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Radar Comparison Chart */}
      {soils.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 border-border">
            <h3 className="text-lg font-bold text-foreground mb-6">Detailed Comparison</h3>
            <RadarChart soils={soils} />
          </Card>
        </motion.div>
      )}

      {/* Comparison Summary */}
      {soils.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Key Differences</h3>
            
            <div className="space-y-3">
              {(() => {
                const best = soils.reduce((prev, current) =>
                  current.fertilityScore > prev.fertilityScore ? current : prev
                )
                const worst = soils.reduce((prev, current) =>
                  current.fertilityScore < prev.fertilityScore ? current : prev
                )

                return (
                  <>
                    <div className="p-3 bg-accent/10 rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">{best.name}</span> has the highest fertility score ({best.fertilityScore}/100)
                      </p>
                    </div>
                    {worst.name !== best.name && (
                      <div className="p-3 bg-destructive/10 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">{worst.name}</span> requires more soil amendments ({worst.fertilityScore}/100)
                        </p>
                      </div>
                    )}
                    <div className="p-3 bg-primary/10 rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground">
                        Average fertility score: <span className="font-semibold text-foreground">
                          {Math.round(soils.reduce((sum, s) => sum + s.fertilityScore, 0) / soils.length)}
                        </span>/100
                      </p>
                    </div>
                  </>
                )
              })()}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
