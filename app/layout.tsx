import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from "next/font/google";
import { ThemeProvider } from '@/components/theme-provider'

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: 'TweetExport - Export Twitter Posts with Video',
  description: 'Generate playable tweet cards from Twitter URLs with embedded videos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} bg-background text-foreground antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}