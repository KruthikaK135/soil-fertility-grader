'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-background via-background to-accent/5">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
          <span className="text-sm font-medium text-accent">AI-Powered Soil Analysis</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Understand Your Soil,
          <br />
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Grow Your Future
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
          SoilSpectraX uses advanced AI and spectral analysis to instantly evaluate soil fertility, predict crop suitability, and provide actionable recommendations for farmers and researchers.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
            <Link href="/upload" className="flex items-center gap-2">
              Start Free Analysis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>

        <div className="relative mt-20 rounded-2xl overflow-hidden border border-border bg-card p-8 shadow-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">98%</div>
              <p className="text-sm text-muted-foreground mt-2">Accuracy Rate</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary">2min</div>
              <p className="text-sm text-muted-foreground mt-2">Analysis Time</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">10k+</div>
              <p className="text-sm text-muted-foreground mt-2">Analyses Done</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
