'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
              SS
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">SoilSpectraX</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              About
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/upload">Start Analysis</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
