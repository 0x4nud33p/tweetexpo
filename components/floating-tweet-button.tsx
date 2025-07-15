'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewTweetModal } from '@/components/new-tweet-modal';
import { motion } from 'framer-motion';

export function FloatingTweetButton() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 md:hidden"
    >
      <NewTweetModal>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          <Button
            size="icon"
            className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600 text-white shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-green-500 opacity-30"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </NewTweetModal>
    </motion.div>
  );
}