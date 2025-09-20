'use client'

import Image from 'next/image'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Image
                src="/svgs/icon.svg"
                alt="icon"
                width={20}
                height={20}
                className="h-5 w-5"
              />
            </div>
            <span className="text-xl font-bold">TweetExpo</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}