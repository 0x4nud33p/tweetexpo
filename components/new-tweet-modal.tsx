'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Image, Smile, Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewTweetModalProps {
  children: React.ReactNode;
}

export function NewTweetModal({ children }: NewTweetModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tweetContent, setTweetContent] = useState('');

  const handleTweet = () => {
    // Handle tweet submission
    console.log('Tweet:', tweetContent);
    setTweetContent('');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader className="p-4 border-b">
                <DialogTitle className="text-xl font-semibold">Compose Tweet</DialogTitle>
              </DialogHeader>
              
              <div className="p-4">
                <div className="flex space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Textarea
                        placeholder="What's happening?"
                        value={tweetContent}
                        onChange={(e) => setTweetContent(e.target.value)}
                        className="min-h-[120px] border-0 text-xl placeholder:text-xl resize-none focus-visible:ring-0 p-0"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-between mt-4"
                    >
                      <div className="flex items-center space-x-2">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button variant="ghost" size="icon" className="text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950">
                            <Image className="h-5 w-5" />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button variant="ghost" size="icon" className="text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950">
                            <Smile className="h-5 w-5" />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button variant="ghost" size="icon" className="text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950">
                            <Calendar className="h-5 w-5" />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button variant="ghost" size="icon" className="text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950">
                            <MapPin className="h-5 w-5" />
                          </Button>
                        </motion.div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm ${tweetContent.length > 280 ? 'text-red-500' : 'text-muted-foreground'}`}>
                          {280 - tweetContent.length}
                        </span>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            onClick={handleTweet}
                            disabled={!tweetContent.trim() || tweetContent.length > 280}
                            className="rounded-full bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600 text-white font-semibold px-6"
                          >
                            Tweet
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}