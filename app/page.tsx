'use client';

import { Navbar } from '@/components/navbar';
import { SidebarLeft } from '@/components/sidebar-left';
import { SidebarRight } from '@/components/sidebar-right';
import { Feed } from '@/components/feed';
import { FloatingTweetButton } from '@/components/floating-tweet-button';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex"
      >
        <div className="hidden lg:block">
          <SidebarLeft />
        </div>
        <Feed />
        <div className="hidden xl:block">
          <SidebarRight />
        </div>
      </motion.div>
      <FloatingTweetButton />
    </div>
  );
}