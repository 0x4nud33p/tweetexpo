"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Upload, Check, AlertCircle, User, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { checkUsernameAvailable } from "@/lib/solana";
import { useConnection } from "@solana/wallet-adapter-react";
import { uploadProfileToIPFS } from "@/lib/ipfs";
import { createUserProfile } from "@/lib/program";

interface ProfileSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

export function ProfileSetupModal({
  isOpen,
  onClose,
  walletAddress,
}: ProfileSetupModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    profilePicture: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    bio: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null
  );
  const { connection } = useConnection();

  const handleUsernameChange = async (value: string) => {
    setFormData((prev) => ({ ...prev, username: value }));
    setErrors((prev) => ({ ...prev, username: "" }));

    if (value.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    // Simulate username availability check
    setTimeout(() => {
      const unavailableUsernames = ["admin", "solana", "phantom", "magiceden"];
      setUsernameAvailable(!unavailableUsernames.includes(value.toLowerCase()));
    }, 500);
    // const available = await checkUsernameAvailable(value, connection);
    // setUsernameAvailable(available);
  };

  const handleBioChange = (value: string) => {
    if (value.length <= 160) {
      setFormData((prev) => ({ ...prev, bio: value }));
      setErrors((prev) => ({ ...prev, bio: "" }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = { username: "", bio: "" };
    let isValid = true;

    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    } else if (usernameAvailable === false) {
      newErrors.username = "Username is not available";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (!walletAddress || !connection) return;

    setIsLoading(true);

    try {
      const base64Data = formData.profilePicture.split(",")[1];
      const imageFile = new File(
        [Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0))],
        "profile.jpg",
        {
          type: "image/jpeg",
        }
      );

      // Upload to IPFS
      const cidUrl = await uploadProfileToIPFS({
        name: formData.username,
        bio: formData.bio,
        image: imageFile,
      });

      await createUserProfile(
        cidUrl,
        formData.username,
        walletAddress,
        connection
      );

      onClose();
    } catch (err) {
      console.error("Failed to create profile:", err);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: step === 1 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: step === 1 ? 20 : -20 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader className="p-6 border-b bg-gradient-to-r from-purple-50 to-green-50 dark:from-purple-950/20 dark:to-green-950/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-green-400 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-semibold">
                    {step === 1
                      ? "Create Your Profile"
                      : "Complete Your Profile"}
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Step {step} of 2 • Connected to {walletAddress.slice(0, 4)}
                    ...{walletAddress.slice(-4)}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="p-6">
              {step === 1 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">
                      Username *
                    </Label>
                    <div className="relative">
                      <Input
                        id="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        className={cn(
                          "pr-10",
                          errors.username &&
                            "border-red-500 focus-visible:ring-red-500",
                          usernameAvailable === true &&
                            "border-green-500 focus-visible:ring-green-500"
                        )}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {formData.username.length >= 3 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            {usernameAvailable === true && (
                              <Check className="w-4 h-4 text-green-500" />
                            )}
                            {usernameAvailable === false && (
                              <AlertCircle className="w-4 h-4 text-red-500" />
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                    {errors.username && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500"
                      >
                        {errors.username}
                      </motion.p>
                    )}
                    {usernameAvailable === true && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-green-500"
                      >
                        Username is available!
                      </motion.p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-medium">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      value={formData.bio}
                      onChange={(e) => handleBioChange(e.target.value)}
                      className="min-h-[100px] resize-none"
                      maxLength={160}
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        Keep it short and sweet
                      </p>
                      <p
                        className={cn(
                          "text-xs",
                          formData.bio.length > 140
                            ? "text-orange-500"
                            : "text-muted-foreground"
                        )}
                      >
                        {formData.bio.length}/160
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="px-6"
                    >
                      Skip for now
                    </Button>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleNext}
                        disabled={
                          !formData.username ||
                          formData.username.length < 3 ||
                          usernameAvailable === false
                        }
                        className="px-6 bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600"
                      >
                        Next
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-4">
                    <div className="relative inline-block">
                      <Avatar className="w-24 h-24 border-4 border-gradient-to-r from-purple-500 to-green-500">
                        <AvatarImage src={formData.profilePicture} />
                        <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-900 dark:to-green-900">
                          {formData.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <motion.label
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        htmlFor="profile-upload"
                        className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                      >
                        <Upload className="w-4 h-4 text-white" />
                      </motion.label>
                      <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        @{formData.username}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formData.bio || "No bio yet"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Wallet className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium">
                        Wallet Address
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">
                      {walletAddress}
                    </p>
                  </div>

                  <div className="flex justify-between space-x-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="px-6"
                    >
                      Back
                    </Button>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-6 bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600"
                      >
                        {isLoading ? (
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
                          "Create Profile"
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
