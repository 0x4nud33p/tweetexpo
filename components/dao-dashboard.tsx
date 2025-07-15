"use client"

import { motion } from "framer-motion"
import { ProposalCard } from "@/components/proposal-card"
import { TreasuryPanel } from "@/components/treasury-panel"
import { NftMintWidget } from "@/components/nft-mint-widget"
import { UserInfo } from "@/components/user-info"

// Mock data
const proposals = [
  {
    id: "1",
    title: "Fund Stadium Banner for Champions League Final",
    description: "Create a massive tifo display for our section at the final",
    status: "active",
    votes: 1243,
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    color: "blue",
  },
  {
    id: "2",
    title: "Limited Edition Jersey Drop",
    description: "Fund the creation of 500 limited edition jerseys for members",
    status: "active",
    votes: 892,
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    color: "green",
  },
  {
    id: "3",
    title: "Away Game Watch Party",
    description: "Organize a watch party for the upcoming away derby match",
    status: "pending",
    votes: 456,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    color: "red",
  },
]

export function DaoDashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="px-4 py-8 md:px-8">
      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-6 neon-blue-glow"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        DAO Dashboard
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-4">Active Proposals</h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {proposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <TreasuryPanel />
          <NftMintWidget />
          {/* <UserInfo /> */}
        </motion.div>
      </div>
    </div>
  )
}
