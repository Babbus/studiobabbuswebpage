"use client";

import { siteMeta } from "@/content/site";
import { featuredReels } from "@/content/reels";
import { getEmbedSrc, getYouTubeThumbnail } from "@/lib/video";
import { useMemo, useState } from "react";

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  const featured = useMemo(() => {
    // Prefer the first featured reel
    return featuredReels[0];
  }, []);

  const featuredSrc = featured ? getEmbedSrc(featured) : undefined;
  const featuredThumb = featured ? (featured.thumbnailUrl || (featured.host === "youtube" ? getYouTubeThumbnail(featured.url) : undefined)) : undefined;

  return (
    <section className="pt-24 sm:pt-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 grid gap-8 sm:grid-cols-2 items-center relative z-10">
        <div className="space-y-5 animate-fade-in-up">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground drop-shadow-[0_1px_0_rgba(0,0,0,0.12)]">
            {siteMeta.displayName} — {siteMeta.alias}
          </h1>
          <p className="text-base/7 sm:text-lg opacity-80 max-w-[60ch] transition-opacity duration-300 hover:opacity-100">
            {siteMeta.tagline}
          </p>
          <div className="flex gap-3">
            <a 
              href="#portfolio" 
              className="rounded-full border border-black/10 dark:border-white/10 bg-[color:oklch(86%_0.06_270)] dark:bg-[color:oklch(48%_0.18_270)] text-[color:oklch(36%_0.16_270)] dark:text-white hover:bg-[color:oklch(82%_0.08_270)] dark:hover:bg-[color:oklch(54%_0.2_270)] hover:border-[color:oklch(52%_0.18_270)] dark:hover:border-[color:oklch(62%_0.22_270)] px-5 py-2 text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              See portfolio
            </a>
          </div>
        </div>
        <div className="group aspect-video rounded-2xl bg-gradient-to-br from-[color:oklch(80%_0.05_270)] via-[color:oklch(92%_0.02_270)] to-transparent dark:from-[color:oklch(36%_0.12_270)] dark:via-[color:oklch(28%_0.08_270)] dark:to-transparent border border-black/10 dark:border-white/10 p-2 transition-all duration-500 hover:border-[color:oklch(52%_0.18_270)] dark:hover:border-[color:oklch(62%_0.22_270)] hover:shadow-2xl hover:shadow-[color:oklch(62%_0.22_270)/0.2] animate-fade-in-up relative overflow-hidden grid place-items-center" style={{ animationDelay: '0.3s' }}>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Showreel Coming Soon</h2>
            <p className="opacity-80">A new reel is in the works. Check back soon!</p>
          </div>
        </div>
      </div>
    </section>
  );
} 