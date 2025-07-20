"use client";

import React, { Children, FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import dynamic from "next/dynamic";
import { Wallet } from "lucide-react";
import "@solana/wallet-adapter-react-ui/styles.css";

interface SolanaProviderProps {
  children: ReactNode;
}

export const WalletButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  {
    ssr: false,
  }
);

export const StyledWalletButton: FC<{
  className?: string;
  startIcon?: React.ReactElement; 
}> = ({ className = "", startIcon }) => {
  return (
    <WalletButton
      startIcon={startIcon === null ? undefined : startIcon}
      className={`
        wallet-adapter-button-trigger
        w-full min-w-full h-12 rounded-xl
        bg-gradient-to-r from-purple-500 to-green-500 
        hover:from-purple-600 hover:to-green-600 
        text-white font-semibold shadow-lg
        border-0 outline-none
        transition-all duration-200
        flex items-center justify-center
        ${className}
      `}
    />
  );
};

export const SolanaProvider: FC<SolanaProviderProps> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <style jsx global>{`
            .wallet-adapter-button-trigger {
              background: linear-gradient(
                to right,
                #8b5cf6,
                #10b981
              ) !important;
              border: none !important;
              border-radius: 0.75rem !important;
              height: 3rem !important;
              width: 100% !important;
              font-weight: 600 !important;
              color: white !important;
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
              transition: all 0.2s !important;
            }

            .wallet-adapter-button-trigger:hover {
              background: linear-gradient(
                to right,
                #7c3aed,
                #059669
              ) !important;
            }

            .wallet-adapter-button-trigger:disabled {
              background: #6b7280 !important;
              cursor: not-allowed !important;
            }

            .wallet-adapter-modal-wrapper {
              background: rgba(0, 0, 0, 0.5) !important;
            }

            .wallet-adapter-modal {
              background: #1f2937 !important;
              border-radius: 1rem !important;
              border: 1px solid #374151 !important;
            }

            .wallet-adapter-modal-title {
              color: white !important;
            }

            .wallet-adapter-modal-list {
              background: #1f2937 !important;
            }

            .wallet-adapter-modal-list-item {
              background: #374151 !important;
              border-radius: 0.5rem !important;
              margin-bottom: 0.5rem !important;
            }

            .wallet-adapter-modal-list-item:hover {
              background: #4b5563 !important;
            }
          `}</style>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
