"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Wallet, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { StyledWalletButton } from "@/providers/wallet-provider";
import { useEffect, useState } from "react";
import { ProfileSetupModal } from "./profile-setup-modal";

const suggestedUsers = [
  { name: "Solana Labs", handle: "@solana", avatar: "/api/placeholder/40/40" },
  { name: "Phantom", handle: "@phantom", avatar: "/api/placeholder/40/40" },
  {
    name: "Magic Eden",
    handle: "@magiceden",
    avatar: "/api/placeholder/40/40",
  },
];

const trending = [
  { tag: "#Solana", posts: "12.5K" },
  { tag: "#Web3", posts: "8.2K" },
  { tag: "#DeFi", posts: "6.1K" },
  { tag: "#NFTs", posts: "4.8K" },
  { tag: "#Crypto", posts: "15.2K" },
];

export function SidebarRight() {
  const { connected, publicKey } = useWallet();
  const [showProfileSetupForFirstTime, setShowProfileSetupForFirstTime] =
    useState(false);

  useEffect(() => {
    if (connected && publicKey) {
      setShowProfileSetupForFirstTime(true);
    }
  }, [publicKey]);

  return (
    <>
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="sticky top-16 w-80 h-[calc(100vh-4rem)] p-4 space-y-6 overflow-y-auto"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-purple-500/10 to-green-500/10 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                {connected ? (
                  <StyledWalletButton />
                ) : (
                  <StyledWalletButton startIcon={<Wallet className="mr-2 h-4 w-4" />} />
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                Trending
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trending.map((item, index) => (
                <motion.div
                  key={item.tag}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div>
                    <p className="font-medium text-purple-600 dark:text-purple-400">
                      {item.tag}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.posts} posts
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    Trending
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                Who to follow
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestedUsers.map((user, index) => (
                <motion.div
                  key={user.handle}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2`}
                      />
                      <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.handle}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                    >
                      Follow
                    </Button>
                  </motion.div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      <ProfileSetupModal
        isOpen={showProfileSetupForFirstTime}
        onClose={() => setShowProfileSetupForFirstTime(false)}
        walletAddress={publicKey ? publicKey.toString() : ""}
      />
    </>
  );
}
