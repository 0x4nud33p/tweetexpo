'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { TweetCard } from '@/components/tweet-card'
import { fetchTweetData, TweetData } from '@/lib/api'

export default function Home() {
  const [tweetData, setTweetData] = useState<TweetData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async (url: string) => {
    setIsLoading(true)
    try {
      const data = await fetchTweetData(url)
      setTweetData(data)
    } catch (error) {
      console.error('Failed to fetch tweet data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection onGenerate={handleGenerate} isLoading={isLoading} />
        {tweetData && <TweetCard tweetData={tweetData} />}
      </main>
    </div>
  )
}