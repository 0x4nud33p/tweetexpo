"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield, Lock } from "lucide-react"

export function NftMintWidget() {
  return (
    <motion.div
      className="bg-black border border-neon-green rounded-lg p-4 neon-green-box"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <h3 className="text-lg font-bold mb-3 flex items-center">
        <Shield className="h-5 w-5 mr-2 text-neon-green" />
        Access Pass
      </h3>

      <div className="relative mb-4">
        <motion.div
          className="w-full h-32 rounded-lg bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-neon-blue/20"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <div className="absolute inset-0 grid-pattern opacity-30" />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <motion.div
              className="text-xl font-bold text-white neon-green-glow"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              LOCKER PASS
            </motion.div>
            <div className="text-xs text-gray-300 mt-1">Season 2024</div>
            <div className="mt-2 px-3 py-1 bg-black/50 rounded-full text-xs border border-neon-green/50">
              <span className="text-neon-green">Tier 2</span> · Captain
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm font-medium">Price</div>
          <div className="text-lg font-bold">0.05 ETH</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium">Available</div>
          <div className="text-lg font-bold">142 / 500</div>
        </div>
      </div>

      <Button variant="neon-green" className="w-full">
        <Lock className="mr-2 h-4 w-4" />
        Mint Access Pass
      </Button>
    </motion.div>
  )
}
