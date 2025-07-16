"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Image,
  Smile,
  Calendar,
  MapPin,
  X,
  Upload,
  Hash,
  AtSign,
  Globe,
  Lock,
  Users,
  AlertCircle,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NewTweetModalProps {
  children: React.ReactNode;
}

export function NewTweetModal({ children }: NewTweetModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tweetContent, setTweetContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [privacy, setPrivacy] = useState<"public" | "followers" | "private">(
    "public"
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxLength = 280;
  const remainingChars = maxLength - tweetContent.length;
  const progressPercentage = (tweetContent.length / maxLength) * 100;

  const emojis = [
    "😀",
    "😂",
    "🥰",
    "😎",
    "🤔",
    "👍",
    "🔥",
    "💯",
    "🚀",
    "💎",
    "🌙",
    "⭐",
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach((file) => {
      if (file && images.length < 4) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages((prev) => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const insertEmoji = (emoji: string) => {
    setTweetContent((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleTweet = async () => {
    if (!tweetContent.trim() || tweetContent.length > maxLength) return;

    setIsPosting(true);

    // Simulate posting to blockchain
    setTimeout(() => {
      console.log("Tweet posted:", {
        content: tweetContent,
        images,
        privacy,
        timestamp: new Date(),
      });

      setTweetContent("");
      setImages([]);
      setPrivacy("public");
      setIsPosting(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
            >
              <DialogHeader className="p-4 border-b bg-gradient-to-r from-purple-50 to-green-50 dark:from-purple-950/20 dark:to-green-950/20">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl font-semibold flex items-center">
                    <Hash className="w-5 h-5 mr-2 text-purple-500" />
                    Compose Tweet
                  </DialogTitle>
                </div>
              </DialogHeader>

              <div className="p-10 max-h-[70vh] overflow-y-auto">
                <div className="flex space-x-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                  >
                    <Avatar className="h-12 w-12 border-2 border-gradient-to-r from-purple-500 to-green-500">
                      <AvatarImage src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </motion.div>

                  <div className="flex-1 space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Textarea
                        placeholder="What's happening on the blockchain?"
                        value={tweetContent}
                        onChange={(e) => setTweetContent(e.target.value)}
                        className="min-h-[120px] border-0 text-xl placeholder:text-xl resize-none focus-visible:ring-0 p-4 bg-transparent"
                        maxLength={maxLength}
                      />
                    </motion.div>

                    {/* Image Preview */}
                    <AnimatePresence>
                      {images.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden"
                        >
                          {images.map((image, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="relative group"
                            >
                              <img
                                src={image}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-4 h-4 text-white" />
                              </motion.button>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Emoji Picker */}
                    <AnimatePresence>
                      {showEmojiPicker && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="p-3 bg-muted rounded-lg border"
                        >
                          <div className="grid grid-cols-6 gap-2">
                            {emojis.map((emoji, index) => (
                              <motion.button
                                key={emoji}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.02 }}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => insertEmoji(emoji)}
                                className="text-2xl p-2 rounded hover:bg-background transition-colors"
                              >
                                {emoji}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Tweet Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-between pt-4 border-t"
                    >
                      <div className="flex items-center space-x-2">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={images.length >= 4}
                            className="text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950"
                          >
                            <Image className="h-5 w-5" />
                          </Button>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950"
                          >
                            <Smile className="h-5 w-5" />
                          </Button>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                        </motion.div>

                        {images.length > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {images.length}/4 images
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* Character Counter */}
                        <div className="flex items-center space-x-2">
                          <div className="relative w-8 h-8">
                            <Progress
                              value={progressPercentage}
                              className="w-8 h-8 rotate-[-90deg]"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span
                                className={cn(
                                  "text-xs font-medium",
                                  remainingChars < 20
                                    ? "text-orange-500"
                                    : "text-muted-foreground",
                                  remainingChars < 0 ? "text-red-500" : ""
                                )}
                              >
                                {remainingChars < 20 ? remainingChars : ""}
                              </span>
                            </div>
                          </div>

                          {remainingChars < 0 && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center text-red-500"
                            >
                              <AlertCircle className="w-4 h-4 mr-1" />
                              <span className="text-xs">Too long</span>
                            </motion.div>
                          )}
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            onClick={handleTweet}
                            disabled={
                              !tweetContent.trim() ||
                              tweetContent.length > maxLength ||
                              isPosting
                            }
                            className="rounded-full bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600 text-white font-semibold px-6 min-w-[80px]"
                          >
                            {isPosting ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                              />
                            ) : (
                              <>
                                <Hash className="w-4 h-4 mr-1" />
                                Tweet
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
