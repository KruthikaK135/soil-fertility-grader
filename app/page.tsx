import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}
