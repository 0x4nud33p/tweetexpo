'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { MoreHorizontal } from 'lucide-react'

interface TweetData {
  username: string
  handle: string
  profilePic: string
  caption: string
  videoUrl: string
}

interface TweetCardProps {
  tweetData: TweetData
}

export function TweetCard({ tweetData }: TweetCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mx-auto max-w-2xl px-4 pb-16"
    >
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          {/* Tweet Header */}
          <div className="flex items-start space-x-3 p-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={tweetData.profilePic} alt={tweetData.username} />
              <AvatarFallback>{tweetData.username.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-foreground truncate">
                  {tweetData.username}
                </h3>
                <span className="text-muted-foreground truncate">
                  {tweetData.handle}
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground text-sm">2h</span>
              </div>
            </div>
            
            <MoreHorizontal className="h-5 w-5 text-muted-foreground cursor-pointer" />
          </div>

          {/* Tweet Content */}
          <div className="px-4 pb-3">
            <p className="text-foreground leading-normal">
              {tweetData.caption}
            </p>
          </div>

          {/* Video Player */}
          <div className="px-4 pb-4">
            <div className="overflow-hidden rounded-2xl border border-border">
              <video
                controls
                className="w-full aspect-video object-cover bg-black"
                poster="https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800"
              >
                <source src={tweetData.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Tweet Actions */}
          <div className="border-t border-border px-4 py-3">
            <div className="flex items-center justify-between text-muted-foreground">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm">42</span>
                </button>
                
                <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-sm">12</span>
                </button>
                
                <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm">128</span>
                </button>
                
                <button className="hover:text-blue-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}