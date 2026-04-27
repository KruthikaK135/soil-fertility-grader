'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, Camera, Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { analyzeSoilImage } from '@/lib/soil-analysis'
import { motion } from 'framer-motion'

export function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setSuccess(false)
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please upload an image file')
        return
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB')
        return
      }
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      const input = document.createElement('input')
      input.type = 'file'
      Object.defineProperty(input, 'files', {
        value: e.dataTransfer.files,
      })
      handleFileChange({ target: input } as any)
    }
  }

  const handleAnalyze = async () => {
    if (!file) return

    setLoading(true)
    setError(null)
    try {
      const result = await analyzeSoilImage(file, preview!)
      // Store result in localStorage to avoid URL encoding issues
      if (typeof window !== 'undefined') {
        localStorage.setItem('soilAnalysisResult', JSON.stringify(result))
      }
      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-primary hover:text-primary/80 transition font-medium mb-4 inline-flex items-center gap-2">
            ← Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Upload Soil Image</h1>
          <p className="text-lg text-muted-foreground">
            Take or upload a clear photo of your soil sample for instant analysis
          </p>
        </div>

        {/* Upload Card */}
        <Card className="border-2 border-dashed border-border p-0 mb-6 overflow-hidden">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="p-8 text-center hover:bg-accent/5 transition-colors cursor-pointer"
          >
            {!preview ? (
              <div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Drag and drop your image</h3>
                <p className="text-muted-foreground mb-6">or click to browse your computer</p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className="cursor-pointer inline-block">
                  <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <span>Choose File</span>
                  </Button>
                </label>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="relative w-full max-w-sm mx-auto rounded-lg overflow-hidden border border-border">
                  <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-auto" />
                </div>
                <div className="flex items-center justify-center gap-2 text-accent">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{file.name}</span>
                </div>
                <Button
                  asChild
                  variant="outline"
                  onClick={() => {
                    setFile(null)
                    setPreview(null)
                  }}
                >
                  <span>Choose Different Image</span>
                </Button>
              </motion.div>
            )}
          </div>
        </Card>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20 mb-6"
          >
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Action Buttons */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Soil'
              )}
            </Button>
            <Button
              variant="outline"
              disabled={loading}
              size="lg"
              className="px-8"
            >
              <Camera className="w-4 h-4 mr-2" />
              Take Photo
            </Button>
          </motion.div>
        )}

        {/* Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Good Lighting', desc: 'Use natural daylight for accurate color analysis' },
            { title: 'Clear View', desc: 'Ensure soil fills at least 80% of the image' },
            { title: 'High Quality', desc: 'Use a camera with good resolution for best results' },
          ].map((tip, i) => (
            <Card key={i} className="p-4 border-border">
              <h4 className="font-semibold text-foreground mb-2">✓ {tip.title}</h4>
              <p className="text-sm text-muted-foreground">{tip.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
