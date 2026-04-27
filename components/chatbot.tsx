'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { MessageSquare, Send, Mic, Volume2, X, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAgriculturalAnswer } from '@/lib/chatbot'

interface Message {
  id: string
  type: 'user' | 'bot'
  text: string
  timestamp: Date
}

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hello! I\'m your agricultural assistant. Ask me anything about soil, crops, fertilizers, weather, or farming practices.',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('')
          setInput(transcript)
        }
      }
    }
  }, [])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const botResponse = await getAgriculturalAnswer(input)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: botResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])

      if (voiceEnabled) {
        speakText(botResponse)
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleVoiceInput = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <>
      {/* Chatbot Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-40 pulse-glow"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 bg-card border border-border"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent text-white p-4 flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Agricultural Assistant
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground px-4 py-2 rounded-lg flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border space-y-3">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about soil or crops..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={loading || !input.trim()}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleVoiceInput}
                  className={isListening ? 'bg-accent/20 text-accent border-accent' : ''}
                >
                  <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={voiceEnabled ? 'bg-accent/20 text-accent border-accent' : ''}
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
