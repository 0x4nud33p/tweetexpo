"use client"

import { motion } from "framer-motion"
import { User, Star, Award, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function UserInfo() {
  return (
    <motion.div
      className="bg-black border border-neon-red rounded-lg p-4 neon-red-box"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <h3 className="text-lg font-bold mb-3 flex items-center">
        <User className="h-5 w-5 mr-2 text-neon-red" />
        Your Profile
      </h3>

      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-red/30 to-neon-blue/30 flex items-center justify-center border border-neon-red/50">
          <span className="text-xl font-bold">JD</span>
        </div>
        <div className="ml-3">
          <div className="font-bold">0x71...3a4f</div>
          <div className="flex items-center">
            <span className="text-neon-red mr-1">Captain</span>
            <Star className="h-3 w-3 text-neon-red fill-neon-red" />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>XP Level</span>
          <span className="font-medium">1,245 XP</span>
        </div>
        <motion.div
          className="h-2 bg-gray-800 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-neon-red to-neon-blue"
            initial={{ width: "0%" }}
            animate={{ width: "70%" }}
            transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Award className="h-5 w-5 text-yellow-500 mr-2" />
          <div>
            <div className="text-sm font-medium">Badges</div>
            <div className="text-xs text-gray-400">4 earned</div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2">
            <span className="text-xs font-bold">7</span>
          </div>
          <div>
            <div className="text-sm font-medium">Vote Streak</div>
            <div className="text-xs text-gray-400">7 days active</div>
          </div>
        </div>
        <motion.div
          className="text-green-500 font-bold"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          +25% XP
        </motion.div>
      </div>
    </motion.div>
  )
}
