"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";

export default function Nav() {
  return (
    <header className="w-full fixed top-0 left-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-background/70 border-b border-black/10 dark:border-white/10 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-center relative">
        <div className="absolute left-4 flex items-center gap-3">
          <Link href="/" aria-label="Babbus Home" className="inline-flex">
            <Image
              src="/babbus_logo_wave.svg"
              alt="Babbus logo"
              width={28}
              height={28}
              priority
              className="opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </Link>
          <a
            href="https://www.instagram.com/babbusbatu/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="opacity-80 hover:opacity-100 transition-opacity duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
          </a>
        </div>
        <Link href="/" className="font-semibold tracking-tight text-lg text-foreground hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-300">
          Babbus
        </Link>
        <div className="absolute right-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
} 