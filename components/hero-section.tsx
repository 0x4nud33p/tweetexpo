'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'

interface HeroSectionProps {
  onGenerate: (url: string) => void
  isLoading: boolean
}

export function HeroSection({ onGenerate, isLoading }: HeroSectionProps) {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onGenerate(url.trim())
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-5xl">
            Export Twitter Post with Video
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Paste a Twitter URL and generate a playable tweet card.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="url"
            placeholder="Paste Twitter URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-12 text-base shadow-sm"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="lg" 
            disabled={!url.trim() || isLoading}
            className="h-12 px-8 text-base shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}