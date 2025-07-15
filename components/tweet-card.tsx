'use client';

import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

interface TweetCardProps {
  tweet: {
    id: string;
    author: {
      name: string;
      handle: string;
      avatar: string;
      wallet: string;
    };
    content: string;
    timestamp: Date;
    likes: number;
    replies: number;
    retweets: number;
    liked?: boolean;
    retweeted?: boolean;
  };
  index: number;
}

export function TweetCard({ tweet, index }: TweetCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      <Card className="border-0 border-b rounded-none hover:bg-muted/30 transition-colors cursor-pointer">
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={tweet.author.avatar} />
                <AvatarFallback>{tweet.author.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold truncate">{tweet.author.name}</span>
                <span className="text-muted-foreground text-sm">@{tweet.author.handle}</span>
                <span className="text-muted-foreground text-xs">
                  {tweet.author.wallet.slice(0, 4)}...{tweet.author.wallet.slice(-4)}
                </span>
                <span className="text-muted-foreground text-sm">·</span>
                <span className="text-muted-foreground text-sm">
                  {formatDistanceToNow(tweet.timestamp, { addSuffix: true })}
                </span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="ml-auto"
                >
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
              
              <p className="mb-3 leading-relaxed">{tweet.content}</p>
              
              <div className="flex items-center justify-between max-w-md">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {tweet.replies}
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-muted-foreground hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-950 ${
                      tweet.retweeted ? 'text-green-500' : ''
                    }`}
                  >
                    <Repeat2 className="h-4 w-4 mr-1" />
                    {tweet.retweets}
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 ${
                      tweet.liked ? 'text-red-500' : ''
                    }`}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${tweet.liked ? 'fill-current' : ''}`} />
                    {tweet.likes}
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950">
                    <Share className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}