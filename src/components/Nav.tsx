"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Nav() {
  return (
    <header className="w-full fixed top-0 left-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-black/10 dark:border-white/10 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-center relative">
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