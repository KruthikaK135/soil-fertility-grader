'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4">SoilSpectraX</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered soil analysis for sustainable agriculture.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition">Features</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition">Pricing</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition">API</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition">About</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition">Blog</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition">Privacy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition">Terms</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition">License</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 SoilSpectraX. All rights reserved. Built with AI for sustainable farming.
          </p>
        </div>
      </div>
    </footer>
  )
}
