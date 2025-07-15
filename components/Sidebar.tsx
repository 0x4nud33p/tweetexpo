"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  FileText,
  Wallet,
  User,
  Users,
  Bell,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/client";
import { useRouter } from "next/router";

const menuItems = [
  { icon: Home, label: "locker", active: true },
  { icon: FileText, label: "proposals", active: false },
  { icon: Wallet, label: "treasury", active: false },
  { icon: Users, label: "members", active: false },
  { icon: Bell, label: "notifications", active: false, badge: 3 },
  { icon: User, label: "profile", active: false },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebar = (
    <motion.div
      className={cn(
        "h-screen bg-black border-r border-gray-800 flex flex-col",
        expanded ? "w-64" : "w-16"
      )}
      animate={{ width: expanded ? "16rem" : "4rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              <div className="h-8 w-8 rounded-md bg-neon-blue flex items-center justify-center mr-2">
                <span className="font-bold text-black">LR</span>
              </div>
              <span className="font-orbitron font-bold">LockerRoom</span>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="hidden md:flex"
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 transition-transform",
              !expanded && "rotate-180"
            )}
          />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobile}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-2 px-2">
          {menuItems.map((item, index) => (
            <motion.li key={index} whileHover={{ x: 5 }}>
              <Button
                onClick={() => router.push(`/${item.label}`)}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors relative",
                  pathname === `/${item.label}`
                    ? "bg-neon-blue/10 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 mr-3",
                    pathname === `/${item.label}` && "text-neon-blue"
                  )}
                />

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {item.badge && expanded && (
                  <motion.span
                    className="ml-auto bg-neon-red text-white text-xs font-medium px-2 py-0.5 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  >
                    {item.badge}
                  </motion.span>
                )}

                {item.badge && !expanded && (
                  <motion.span
                    className="absolute top-0 right-0 h-2 w-2 bg-neon-red rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  />
                )}
              </Button>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-gray-800">
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ConnectButton
                client={client}
                appMetadata={{
                  name: "LockerRoom",
                  url: "http://localhost:3000",
                }}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">{sidebar}</div>
      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobile}
          className="fixed top-4 left-4 z-50"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40"
                onClick={toggleMobile}
              />

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25 }}
                className="fixed inset-y-0 left-0 z-50"
              >
                {sidebar}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
