"use client";

import { motion } from "framer-motion";
import { Coins, TrendingUp } from "lucide-react";

export default function Page() {
  return (
    <motion.div
      className="bg-black border border-neon-blue rounded-lg p-4 neon-blue-box m-10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-bold mb-3 flex items-center">
        <Coins className="h-5 w-5 mr-2 text-neon-blue" />
        Treasury
      </h3>

      <div className="flex items-baseline mb-2">
        <motion.span
          className="text-3xl font-bold mr-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          245,782
        </motion.span>
        <span className="text-neon-blue font-medium">$CHZ</span>
      </div>

      <div className="flex items-center text-sm text-gray-400">
        <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
        <span className="text-green-500 font-medium">+12.4%</span>
        <span className="ml-1">this week</span>
      </div>

      <motion.div
        className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-neon-blue to-neon-green"
          initial={{ width: "0%" }}
          animate={{ width: "65%" }}
          transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
        />
      </motion.div>

      <div className="flex justify-between text-xs mt-1">
        <span>Goal: 500,000 $CHZ</span>
        <span className="text-neon-green">65% Complete</span>
      </div>
    </motion.div>
  );
}
