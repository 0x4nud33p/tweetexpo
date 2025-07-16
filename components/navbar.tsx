"use client";

import { Search, Bell, Settings, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2"
        >
          <Hash className="text-white font-bold text-sm p-0" />
          <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent">
            dTwitter
          </span>
        </motion.div>

        {/* Search bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search dTwitter..."
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-purple-500"
            />
          </div>
        </div>

        {/* Right-side icons */}
        <div className="flex items-center space-x-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </motion.div>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
