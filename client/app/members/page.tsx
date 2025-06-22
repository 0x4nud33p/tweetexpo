"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Users,
  Crown,
  Star,
  Shield,
  Search,
  UserPlus,
  Calendar,
  TrendingUp,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react";

// Mock members data
const members = [
  {
    id: "1",
    address: "0x71c7656ec7ab88b098defb751b7401b5f6d8976f",
    displayName: "CaptainFan",
    role: "Captain",
    tier: "Legendary",
    joinDate: new Date("2023-01-15"),
    votingPower: 1250,
    proposalsCreated: 8,
    votescast: 45,
    xp: 12450,
    badges: [
      "Early Adopter",
      "Proposal Master",
      "Vote Streak",
      "Community Builder",
    ],
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
    lastActive: new Date(),
    contributions: 25000,
  },
  {
    id: "2",
    address: "0x42c7656ec7ab88b098defb751b7401b5f6d8976a",
    displayName: "TeamSpirit",
    role: "Member",
    tier: "Gold",
    joinDate: new Date("2023-02-20"),
    votingPower: 850,
    proposalsCreated: 3,
    votescast: 32,
    xp: 8750,
    badges: ["Consistent Voter", "Event Organizer"],
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    contributions: 15000,
  },
  {
    id: "3",
    address: "0x93c7656ec7ab88b098defb751b7401b5f6d8976b",
    displayName: "StadiumRoar",
    role: "Member",
    tier: "Silver",
    joinDate: new Date("2023-03-10"),
    votingPower: 620,
    proposalsCreated: 1,
    votescast: 28,
    xp: 6200,
    badges: ["Active Participant"],
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
    lastActive: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    contributions: 8500,
  },
  {
    id: "4",
    address: "0x15c7656ec7ab88b098defb751b7401b5f6d8976c",
    displayName: "FanForLife",
    role: "Rookie",
    tier: "Bronze",
    joinDate: new Date("2023-11-05"),
    votingPower: 150,
    proposalsCreated: 0,
    votescast: 8,
    xp: 1500,
    badges: ["New Member"],
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
    lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    contributions: 500,
  },
  {
    id: "5",
    address: "0x67c7656ec7ab88b098defb751b7401b5f6d8976d",
    displayName: "UltrasLeader",
    role: "Captain",
    tier: "Legendary",
    joinDate: new Date("2023-01-08"),
    votingPower: 1450,
    proposalsCreated: 12,
    votescast: 52,
    xp: 14500,
    badges: [
      "Founding Member",
      "Proposal Master",
      "Vote Streak",
      "Community Builder",
      "Event Organizer",
    ],
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
    lastActive: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    contributions: 35000,
  },
];

const roles = ["All", "Captain", "Member", "Rookie"];
const tiers = ["All", "Legendary", "Gold", "Silver", "Bronze"];

export default function Page() {
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedTier, setSelectedTier] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("xp"); // xp, votingPower, joinDate

  const filteredMembers = members
    .filter((member) => {
      const matchesRole =
        selectedRole === "All" || member.role === selectedRole;
      const matchesTier =
        selectedTier === "All" || member.tier === selectedTier;
      const matchesSearch =
        member.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.address.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesRole && matchesTier && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "xp":
          return b.xp - a.xp;
        case "votingPower":
          return b.votingPower - a.votingPower;
        case "joinDate":
          return a.joinDate.getTime() - b.joinDate.getTime();
        default:
          return 0;
      }
    });

  const stats = {
    total: members.length,
    captains: members.filter((m) => m.role === "Captain").length,
    online: members.filter((m) => m.isOnline).length,
    totalContributions: members.reduce((sum, m) => sum + m.contributions, 0),
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Captain":
        return Crown;
      case "Member":
        return Star;
      case "Rookie":
        return Shield;
      default:
        return Users;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Captain":
        return "text-neon-red";
      case "Member":
        return "text-neon-blue";
      case "Rookie":
        return "text-neon-green";
      default:
        return "text-gray-400";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Legendary":
        return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case "Gold":
        return "bg-gradient-to-r from-yellow-300 to-yellow-500";
      case "Silver":
        return "bg-gradient-to-r from-gray-300 to-gray-500";
      case "Bronze":
        return "bg-gradient-to-r from-orange-400 to-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatJoinDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getLastActiveText = (lastActive: Date, isOnline: boolean) => {
    if (isOnline) return "Online now";

    const diff = Date.now() - lastActive.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2 neon-blue-glow flex items-center">
            <Users className="mr-3 h-8 w-8" />
            Members
          </h1>
          <p className="text-gray-400">The heart of our DAO community</p>
        </div>

        <Button variant="neon-green" size="lg" className="mt-4 md:mt-0">
          <UserPlus className="mr-2 h-5 w-5" />
          Invite Members
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
              <p className="text-sm text-gray-400">Total Members</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Users className="h-8 w-8 text-neon-blue" />
          </div>
        </div>

        <div className="bg-black border border-neon-red rounded-lg p-4 neon-red-box">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Captains</p>
              <p className="text-2xl font-bold">{stats.captains}</p>
            </div>
            <Crown className="h-8 w-8 text-neon-red" />
          </div>
        </div>

        <div className="bg-black border border-neon-green rounded-lg p-4 neon-green-box">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Online Now</p>
              <p className="text-2xl font-bold">{stats.online}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-neon-green flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-black"></div>
            </div>
          </div>
        </div>

        <div className="bg-black border border-neon-blue rounded-lg p-4 neon-blue-box">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Contributions</p>
              <p className="text-xl font-bold">
                ${stats.totalContributions.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-neon-blue" />
          </div>
        </div>
      </motion.div>

      {/* Filters and Search */}
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
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
            />
          </div>

          {/* Role Filter */}
          <div className="flex gap-2">
            {roles.map((role) => (
              <Button
                key={role}
                variant={selectedRole === role ? "neon-blue" : "ghost"}
                size="sm"
                onClick={() => setSelectedRole(role)}
              >
                {role}
              </Button>
            ))}
          </div>

          {/* Tier Filter */}
          <div className="flex gap-2">
            {tiers.map((tier) => (
              <Button
                key={tier}
                variant={selectedTier === tier ? "neon-green" : "ghost"}
                size="sm"
                onClick={() => setSelectedTier(tier)}
              >
                {tier}
              </Button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:border-neon-blue"
          >
            <option value="xp">Sort by XP</option>
            <option value="votingPower">Sort by Voting Power</option>
            <option value="joinDate">Sort by Join Date</option>
          </select>
        </div>
      </motion.div>

      {/* Members Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <AnimatePresence>
          {filteredMembers.map((member, index) => {
            const RoleIcon = getRoleIcon(member.role);

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-black border border-gray-700 rounded-lg p-4 hover:border-neon-blue transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.displayName}
                        className="w-12 h-12 rounded-full border-2 border-gray-600"
                      />
                      {member.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-neon-green rounded-full border-2 border-black"></div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        {member.displayName}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {formatAddress(member.address)}
                      </p>
                    </div>
                  </div>

                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Role and Tier */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <RoleIcon
                      className={`h-5 w-5 ${getRoleColor(member.role)}`}
                    />
                    <span
                      className={`font-medium ${getRoleColor(member.role)}`}
                    >
                      {member.role}
                    </span>
                  </div>

                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getTierColor(
                      member.tier
                    )}`}
                  >
                    {member.tier}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">XP</p>
                    <p className="font-bold">{member.xp.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Voting Power</p>
                    <p className="font-bold">{member.votingPower}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Proposals</p>
                    <p className="font-bold">{member.proposalsCreated}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Votes Cast</p>
                    <p className="font-bold">{member.votescast}</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-2">
                    Badges ({member.badges.length})
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {member.badges.slice(0, 3).map((badge, i) => (
                      <span
                        key={i}
                        className="text-xs bg-neon-blue/20 text-neon-blue px-2 py-1 rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                    {member.badges.length > 3 && (
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                        +{member.badges.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-800">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Joined {formatJoinDate(member.joinDate)}
                  </div>
                  <div>
                    {getLastActiveText(member.lastActive, member.isOnline)}
                  </div>
                </div>

                {/* Action Button */}
                <Button variant="neon-blue" size="sm" className="w-full mt-3">
                  <ExternalLink className="mr-2 h-3 w-3" />
                  View Profile
                </Button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredMembers.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">
            No members found matching your criteria.
          </p>
        </motion.div>
      )}
    </div>
  );
}
