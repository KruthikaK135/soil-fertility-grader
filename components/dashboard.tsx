'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SoilGauge } from '@/components/soil-gauge'
import { CropRecommendations } from '@/components/crop-recommendations'
import { FertilizerEngine } from '@/components/fertilizer-engine'
import { ImprovementPlanner } from '@/components/improvement-planner'
import { ChatBot } from '@/components/chatbot'
import { Weather } from '@/components/weather'
import { SoilComparison } from '@/components/soil-comparison'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Download, Share2, BarChart3, RefreshCw } from 'lucide-react'

interface SoilAnalysisResult {
  soilType: string
  fertilityScore: number
  scoreColor: string
  moisture: number
  ph: number
  nutrients: {
    nitrogen: number
    phosphorus: number
    potassium: number
  }
  organicMatter: string
  textureClass: string
  deficiencies: string[]
  cropSuitability: { crop: string; suitability: number }[]
  recommendations: string[]
  timestamp: string
}

export function Dashboard() {
  const [result, setResult] = useState<SoilAnalysisResult | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('soilAnalysisResult')
        if (stored) {
          setResult(JSON.parse(stored))
        }
      }
    } catch (err) {
      console.error('Failed to parse result:', err)
      setResult(null)
    }
  }, [])

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/5 flex items-center justify-center px-4">
        <Card className="p-8 text-center border-border max-w-md">
          <h2 className="text-2xl font-bold text-foreground mb-4">No Analysis Data</h2>
          <p className="text-muted-foreground mb-6">
            Please upload a soil image first to view analysis results.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/upload">Upload Image</Link>
          </Button>
        </Card>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <Link href="/" className="text-primary hover:text-primary/80 transition font-medium mb-2 inline-flex items-center gap-2">
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-foreground">Soil Analysis Results</h1>
            <p className="text-muted-foreground mt-2">
              Analysis completed at {new Date(result.timestamp).toLocaleString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link href="/upload">
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">New Analysis</span>
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Gauge and Key Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <SoilGauge score={result.fertilityScore} />
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="p-6 border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Soil Profile</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <MetricCard label="Soil Type" value={result.soilType} />
                  <MetricCard label="Texture" value={result.textureClass} />
                  <MetricCard label="pH Level" value={result.ph.toFixed(1)} />
                  <MetricCard label="Moisture" value={`${result.moisture}%`} />
                  <MetricCard label="Organic Matter" value={result.organicMatter} />
                  <MetricCard label="Nitrogen (N)" value={`${result.nutrients.nitrogen}%`} />
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <div className="flex gap-4 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'crops', label: 'Crop Suitability' },
                { id: 'fertilizer', label: 'Fertilizer' },
                { id: 'improvement', label: 'Improvement' },
                { id: 'comparison', label: 'Compare' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-2 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {activeTab === 'overview' && (
              <>
                <Weather />
                <OverviewTab result={result} />
              </>
            )}
            {activeTab === 'crops' && (
              <CropRecommendations crops={result.cropSuitability} soilType={result.soilType} />
            )}
            {activeTab === 'fertilizer' && (
              <FertilizerEngine soilType={result.soilType} nutrients={result.nutrients} />
            )}
            {activeTab === 'improvement' && (
              <ImprovementPlanner soilType={result.soilType} deficiencies={result.deficiencies} />
            )}
            {activeTab === 'comparison' && (
              <SoilComparison currentSoil={result} />
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Chatbot */}
      <ChatBot />
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-accent/5 border border-border">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-lg font-semibold text-primary">{value}</p>
    </div>
  )
}

function OverviewTab({ result }: { result: SoilAnalysisResult }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Analysis Summary</h3>
        <ul className="space-y-3">
          {result.recommendations.map((rec, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-primary mt-1">✓</span>
              <span className="text-muted-foreground">{rec}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6 border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Deficiencies Detected</h3>
        {result.deficiencies.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {result.deficiencies.map((def, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm">
                {def}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No significant deficiencies detected.</p>
        )}
      </Card>
    </div>
  )
}

function ComparisonTab() {
  return (
    <Card className="p-8 border-border text-center">
      <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">Compare Soil Samples</h3>
      <p className="text-muted-foreground mb-6">
        Upload another soil image to compare with this analysis side-by-side.
      </p>
      <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
        <Link href="/upload">Upload Another Sample</Link>
      </Button>
    </Card>
  )
}
