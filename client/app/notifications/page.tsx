"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Vote,
  Coins,
  Users,
  Calendar,
  Trophy,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  MoreHorizontal,
  Trash2,
  Eye,
} from "lucide-react";

// Mock notifications data
const notifications = [
  {
    id: "1",
    type: "vote",
    title: "New Proposal: Stadium Banner Funding",
    message:
      "A new proposal has been created and is now open for voting. Your vote is needed!",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    priority: "high",
    actionUrl: "/proposals/1",
  },
  {
    id: "2",
    type: "treasury",
    title: "Treasury Milestone Reached",
    message:
      "The DAO treasury has reached 250,000 $CHZ! New funding opportunities are now available.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    priority: "medium",
    actionUrl: "/treasury",
  },
  {
    id: "3",
    type: "member",
    title: "New Member Joined",
    message:
      "Welcome @CaptainFan23 to the LockerRoom DAO! They've minted their access pass.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: true,
    priority: "low",
    actionUrl: "/members",
  },
  {
    id: "4",
    type: "event",
    title: "Upcoming Event: Away Game Watch Party",
    message:
      "Don't forget about the watch party tomorrow at 8 PM. RSVP if you haven't already!",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: true,
    priority: "medium",
    actionUrl: "/events/3",
  },
  {
    id: "5",
    type: "achievement",
    title: "Achievement Unlocked: Voting Streak",
    message:
      "Congratulations! You've maintained a 7-day voting streak. Keep it up!",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    priority: "low",
    actionUrl: "/profile",
  },
  {
    id: "6",
    type: "proposal",
    title: "Proposal Deadline Approaching",
    message:
      "The 'Limited Edition Jersey Drop' proposal ends in 2 days. Make sure to cast your vote!",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: false,
    priority: "high",
    actionUrl: "/proposals/2",
  },
  {
    id: "7",
    type: "system",
    title: "System Maintenance Complete",
    message:
      "Scheduled maintenance has been completed. All systems are now fully operational.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    priority: "low",
    actionUrl: null,
  },
];

const notificationTypes = [
  { key: "all", label: "All", icon: Bell },
  { key: "vote", label: "Voting", icon: Vote },
  { key: "treasury", label: "Treasury", icon: Coins },
  { key: "member", label: "Members", icon: Users },
  { key: "event", label: "Events", icon: Calendar },
  { key: "achievement", label: "Achievements", icon: Trophy },
  { key: "proposal", label: "Proposals", icon: AlertCircle },
  { key: "system", label: "System", icon: CheckCircle },
];

export default function Page() {
  const [selectedType, setSelectedType] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );

  const filteredNotifications = notifications.filter((notification) => {
    const matchesType =
      selectedType === "all" || notification.type === selectedType;
    const matchesRead = !showUnreadOnly || !notification.read;
    return matchesType && matchesRead;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    const typeConfig = notificationTypes.find((t) => t.key === type);
    return typeConfig?.icon || Bell;
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === "high") return "border-neon-red neon-red-box";
    if (type === "vote" || type === "proposal")
      return "border-neon-blue neon-blue-box";
    if (type === "treasury" || type === "achievement")
      return "border-neon-green neon-green-box";
    return "border-gray-700";
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const markAsRead = (id: string) => {
    // Implementation would update the notification status
    console.log(`Marking notification ${id} as read`);
  };

  const markAllAsRead = () => {
    // Implementation would mark all notifications as read
    console.log("Marking all notifications as read");
  };

  const deleteNotification = (id: string) => {
    // Implementation would delete the notification
    console.log(`Deleting notification ${id}`);
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
            <Bell className="mr-3 h-8 w-8" />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-3 bg-neon-red text-white text-sm font-medium px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-gray-400">Stay updated with DAO activities</p>
        </div>

        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="neon-blue" size="sm" onClick={markAllAsRead}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <Button
            variant={showUnreadOnly ? "neon-green" : "ghost"}
            size="sm"
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Unread Only
          </Button>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        className="flex flex-wrap gap-2 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {notificationTypes.map((type) => {
          const Icon = type.icon;
          const count = notifications.filter(
            (n) => type.key === "all" || n.type === type.key
          ).length;

          return (
            <Button
              key={type.key}
              variant={selectedType === type.key ? "neon-blue" : "ghost"}
              size="sm"
              onClick={() => setSelectedType(type.key)}
              className="flex items-center"
            >
              <Icon className="mr-2 h-4 w-4" />
              {type.label}
              <span className="ml-2 text-xs bg-gray-700 px-1.5 py-0.5 rounded-full">
                {count}
              </span>
            </Button>
          );
        })}
      </motion.div>

      {/* Notifications List */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence>
          {filteredNotifications.map((notification, index) => {
            const Icon = getNotificationIcon(notification.type);

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`bg-black border rounded-lg p-4 ${getNotificationColor(
                  notification.type,
                  notification.priority
                )} ${!notification.read ? "bg-gray-900/50" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div
                      className={`p-2 rounded-full ${
                        notification.priority === "high"
                          ? "bg-neon-red/20"
                          : notification.type === "vote" ||
                            notification.type === "proposal"
                          ? "bg-neon-blue/20"
                          : notification.type === "treasury" ||
                            notification.type === "achievement"
                          ? "bg-neon-green/20"
                          : "bg-gray-700/20"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          notification.priority === "high"
                            ? "text-neon-red"
                            : notification.type === "vote" ||
                              notification.type === "proposal"
                            ? "text-neon-blue"
                            : notification.type === "treasury" ||
                              notification.type === "achievement"
                            ? "text-neon-green"
                            : "text-gray-400"
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3
                          className={`font-semibold ${
                            !notification.read ? "text-white" : "text-gray-300"
                          }`}
                        >
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                        )}
                        {notification.priority === "high" && (
                          <span className="text-xs bg-neon-red/20 text-neon-red px-2 py-0.5 rounded-full">
                            HIGH
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-400 mb-2">
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTimestamp(notification.timestamp)}
                        </div>

                        <div className="flex items-center space-x-2">
                          {notification.actionUrl && (
                            <Button variant="neon-blue" size="sm">
                              <Eye className="mr-1 h-3 w-3" />
                              View
                            </Button>
                          )}

                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredNotifications.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Bell className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No notifications found.</p>
          <p className="text-gray-500 text-sm">You're all caught up!</p>
        </motion.div>
      )}
    </div>
  );
}
