"use client";

import { motion } from "framer-motion";
import { Clock, ThumbsUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProposalCardProps {
  proposal: {
    id: string;
    title: string;
    description: string;
    status: string;
    votes: number;
    endTime: Date;
    color: string;
  };
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  const timeLeft = () => {
    const diff = proposal.endTime.getTime() - Date.now();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days}d ${hours}h left`;
  };

  const getStatusClass = () => {
    switch (proposal.status) {
      case "active":
        return "bg-green-500/20 text-green-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "completed":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getNeonClass = () => {
    switch (proposal.color) {
      case "blue":
        return "border-neon-blue neon-blue-box";
      case "green":
        return "border-neon-green neon-green-box";
      case "red":
        return "border-neon-red neon-red-box";
      default:
        return "border-gray-700";
    }
  };

  return (
    <motion.div
      className={`bg-black border rounded-lg overflow-hidden ${getNeonClass()}`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full uppercase ${getStatusClass()}`}
          >
            {proposal.status}
          </span>
          <div className="flex items-center text-sm text-gray-400">
            <Clock className="h-3 w-3 mr-1" />
            {timeLeft()}
          </div>
        </div>

        <h4 className="text-lg font-bold mb-2">{proposal.title}</h4>
        <p className="text-sm text-gray-400 mb-4">{proposal.description}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <ThumbsUp className="h-4 w-4 mr-1 text-neon-blue" />
            <span className="font-medium">
              {proposal.votes.toLocaleString()}
            </span>
            <Users className="h-4 w-4 ml-3 mr-1 text-neon-blue" />
            <span className="font-medium">
              {Math.round(proposal.votes * 1.4).toLocaleString()}
            </span>
          </div>

          <Button variant="neon-blue" size="sm">
            Vote
          </Button>
        </div>
      </div>

      <motion.div
        className="h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent"
        animate={{
          opacity: [0.5, 1, 0.5],
          scaleX: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
