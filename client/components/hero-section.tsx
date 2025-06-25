"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PlusCircle, Eye } from "lucide-react"
import CreateProposalModal from "./create-proposol-modal"

export function HeroSection() {

  const [proposalModalOpen, setProposalModalOpen] = React.useState(false)
  const closeProposalModal = () => setProposalModalOpen(false)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="stadium-tunnel-bg relative h-[50vh] min-h-[400px] flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {
        proposalModalOpen && (
          <CreateProposalModal
            isOpen={proposalModalOpen}
            onClose={closeProposalModal}
          />
        )
      }
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 z-0"></div>

      <div className="grid-pattern absolute inset-0 z-0"></div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="z-10 text-center"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-2 neon-blue-glow"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
        >
          Welcome to the LockerRoom
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Run your favorite team like a DAO.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button variant="neon-green" size="lg" onClick={() => setProposalModalOpen(true)}>
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Proposal
          </Button>
          <Button variant="neon-blue" size="lg">
            <Eye className="mr-2 h-5 w-5" />
            View Locker
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon-blue"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      />
    </motion.div>
  )
}
