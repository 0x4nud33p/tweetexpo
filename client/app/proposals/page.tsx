"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";

// Mock data for proposals
const allProposals = [
  {
    id: "1",
    title: "Fund Stadium Banner for Champions League Final",
    description:
      "Create a massive tifo display for our section at the final. This will be our biggest display yet and will require coordination with stadium officials.",
    status: "active",
    votes: 1243,
    totalVotes: 2000,
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    color: "blue",
    category: "Events",
    author: "0x71...3a4f",
    fundingGoal: 15000,
    currentFunding: 8500,
  },
  {
    id: "2",
    title: "Limited Edition Jersey Drop",
    description:
      "Fund the creation of 500 limited edition jerseys for members with exclusive DAO branding and member numbers.",
    status: "active",
    votes: 892,
    totalVotes: 1200,
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    color: "green",
    category: "Merchandise",
    author: "0x42...8b9c",
    fundingGoal: 25000,
    currentFunding: 18750,
  },
  {
    id: "3",
    title: "Away Game Watch Party",
    description:
      "Organize a watch party for the upcoming away derby match at the downtown sports bar with food and drinks.",
    status: "pending",
    votes: 456,
    totalVotes: 800,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    color: "red",
    category: "Events",
    author: "0x93...1d2e",
    fundingGoal: 3000,
    currentFunding: 1200,
  },
  {
    id: "4",
    title: "Player Meet & Greet Event",
    description:
      "Arrange a meet and greet session with team players for DAO members and their families.",
    status: "completed",
    votes: 1567,
    totalVotes: 1800,
    endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    color: "blue",
    category: "Events",
    author: "0x15...7f8a",
    fundingGoal: 12000,
    currentFunding: 12000,
  },
  {
    id: "5",
    title: "Season Ticket Group Purchase",
    description:
      "Pool funds to purchase a block of season tickets for DAO members at discounted rates.",
    status: "failed",
    votes: 234,
    totalVotes: 1500,
    endTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    color: "red",
    category: "Tickets",
    author: "0x67...4c5d",
    fundingGoal: 50000,
    currentFunding: 8900,
  },
];

const categories = ["All", "Events", "Merchandise", "Tickets", "Community"];
const statuses = ["All", "Active", "Pending", "Completed", "Failed"];

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProposals = allProposals.filter((proposal) => {
    const matchesCategory =
      selectedCategory === "All" || proposal.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" ||
      proposal.status === selectedStatus.toLowerCase();
    const matchesSearch =
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const stats = {
    total: allProposals.length,
    active: allProposals.filter((p) => p.status === "active").length,
    completed: allProposals.filter((p) => p.status === "completed").length,
    totalFunding: allProposals.reduce((sum, p) => sum + p.currentFunding, 0),
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 neon-blue-glow">
            Proposals
          </h1>
          <p className="text-gray-400">
            Shape the future of your team together
          </p>
        </div>

        <Button variant="neon-green" size="lg" className="mt-4 md:mt-0">
          <Plus className="mr-2 h-5 w-5" />
          Create Proposal
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="bg-black border border-neon-blue rounded-lg p-4 neon-blue-box">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Calendar className="h-8 w-8 text-neon-blue" />
          </div>
        </div>

        <div className="bg-black border border-neon-green rounded-lg p-4 neon-green-box">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active</p>
              <p className="text-2xl font-bold">{stats.active}</p>
            </div>
            <Clock className="h-8 w-8 text-neon-green" />
          </div>
        </div>

        <div className="bg-black border border-neon-blue rounded-lg p-4 neon-blue-box">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Completed</p>
              <p className="text-2xl font-bold">{stats.completed}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-neon-blue" />
          </div>
        </div>

        <div className="bg-black border border-neon-green rounded-lg p-4 neon-green-box">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Funded</p>
              <p className="text-xl font-bold">
                ${stats.totalFunding.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-neon-green" />
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="bg-black border border-gray-800 rounded-lg p-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search proposals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "neon-blue" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {statuses.map((status) => (
              <Button
                key={status}
                variant={selectedStatus === status ? "neon-green" : "ghost"}
                size="sm"
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Proposals Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <AnimatePresence>
          {filteredProposals.map((proposal, index) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <EnhancedProposalCard proposal={proposal} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProposals.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-400 text-lg">
            No proposals found matching your criteria.
          </p>
        </motion.div>
      )}
    </div>
  );
}

// Enhanced Proposal Card with more details
function EnhancedProposalCard({ proposal }: { proposal: any }) {
  const timeLeft = () => {
    const diff = proposal.endTime.getTime() - Date.now();
    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days}d ${hours}h left`;
  };

  const getStatusClass = () => {
    switch (proposal.status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
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

  const fundingPercentage =
    (proposal.currentFunding / proposal.fundingGoal) * 100;

  return (
    <motion.div
      className={`bg-black border rounded-lg overflow-hidden ${getNeonClass()}`}
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full uppercase border ${getStatusClass()}`}
          >
            {proposal.status}
          </span>
          <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
            {proposal.category}
          </span>
        </div>

        <h4 className="text-lg font-bold mb-2 line-clamp-2">
          {proposal.title}
        </h4>
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">
          {proposal.description}
        </p>

        {/* Funding Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Funding Progress</span>
            <span className="font-medium">
              ${proposal.currentFunding.toLocaleString()} / $
              {proposal.fundingGoal.toLocaleString()}
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-blue to-neon-green"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(fundingPercentage, 100)}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {fundingPercentage.toFixed(1)}% funded
          </div>
        </div>

        {/* Voting Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Votes</span>
            <span className="font-medium">
              {proposal.votes} / {proposal.totalVotes}
            </span>
          </div>
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-neon-blue"
              initial={{ width: "0%" }}
              animate={{
                width: `${(proposal.votes / proposal.totalVotes) * 100}%`,
              }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-400">
            <div>By {proposal.author}</div>
            <div className="flex items-center mt-1">
              <Clock className="h-3 w-3 mr-1" />
              {timeLeft()}
            </div>
          </div>

          <Button variant="neon-blue" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
