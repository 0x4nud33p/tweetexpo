import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { SolanaProvider } from "@/providers/wallet-provider";
import { ThemeProvider } from "@/components/theme-provider";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "dTwitter - Decentralized Social Network",
  description: "A decentralized Twitter built on Solana blockchain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className}`}>
        <SolanaProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
        </SolanaProvider>
      </body>
    </html>
  );
}
