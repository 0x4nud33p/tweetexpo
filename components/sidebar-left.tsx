'use client';

import { Home, Compass, Bell, User, Hash, Bookmark, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Home', icon: Home, active: true },
  { name: 'Explore', icon: Compass, active: false },
  { name: 'Notifications', icon: Bell, active: false },
  { name: 'Messages', icon: MessageCircle, active: false },
  { name: 'Bookmarks', icon: Bookmark, active: false },
  { name: 'Profile', icon: User, active: false },
];

export function SidebarLeft() {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="sticky top-16 w-64 h-[calc(100vh-4rem)] p-4 border-r bg-background/50 backdrop-blur"
    >
      <nav className="space-y-2">
        {navigation.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            whileHover={{ x: 4 }}
          >
            <Button
              variant={item.active ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start h-12 rounded-xl transition-all duration-200',
                item.active && 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Button>
          </motion.div>
        ))}
      </nav>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600 text-white font-semibold shadow-lg">
          <Hash className="mr-2 h-5 w-5" />
          New Tweet
        </Button>
      </motion.div>
    </motion.div>
  );
}