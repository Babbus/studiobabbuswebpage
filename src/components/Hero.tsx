"use client";

import { siteMeta } from "@/content/site";
import { reels } from "@/content/reels";
import { getEmbedSrc, getYouTubeThumbnail } from "@/lib/video";
import { useMemo, useState } from "react";

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  const featured = useMemo(() => {
    // Try to find a reel with id 'showreel' else first YouTube reel
    const exact = reels.find((r) => r.id === "showreel");
    const pick = exact || reels.find((r) => r.host === "youtube") || reels[0];
    return pick;
  }, []);

  const featuredSrc = featured ? getEmbedSrc(featured) : undefined;
  const featuredThumb = featured ? (featured.thumbnailUrl || (featured.host === "youtube" ? getYouTubeThumbnail(featured.url) : undefined)) : undefined;

  return (
    <section className="pt-24 sm:pt-28 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-teal-300 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-teal-200 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 grid gap-8 sm:grid-cols-2 items-center relative z-10">
        <div className="space-y-5 animate-fade-in-up">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground drop-shadow-[0_1px_0_rgba(0,0,0,0.12)] dark:drop-shadow-none dark:bg-gradient-to-r dark:from-white dark:via-teal-100 dark:to-white dark:bg-clip-text dark:text-transparent animate-gradient">
            {siteMeta.displayName} — {siteMeta.alias}
          </h1>
          <p className="text-base/7 sm:text-lg opacity-80 max-w-[60ch] transition-opacity duration-300 hover:opacity-100">
            {siteMeta.tagline}
          </p>
          <div className="flex gap-3">
            <button
              className="group rounded-full border border-black/10 dark:border-white/10 bg-teal-600/10 dark:bg-teal-500/20 text-teal-700 dark:text-teal-200 hover:bg-teal-600/20 dark:hover:bg-teal-500/40 hover:border-teal-500/30 dark:hover:border-teal-400/30 px-5 py-2 text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/20"
              onClick={() => setShowVideo(!showVideo)}
            >
              <span className="group-hover:animate-pulse">
                {showVideo ? 'Hide Showreel' : 'Play Showreel'}
              </span>
            </button>
            <a 
              href="#portfolio" 
              className="rounded-full border border-black/10 dark:border-white/10 px-5 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              See portfolio
            </a>
          </div>
        </div>
        <div className="group aspect-video rounded-2xl bg-gradient-to-br from-teal-700/10 via-teal-600/5 to-transparent dark:from-teal-900/40 dark:via-teal-700/20 dark:to-transparent border border-black/10 dark:border-white/10 p-2 transition-all duration-500 hover:border-teal-500/30 dark:hover:border-teal-400/30 hover:shadow-2xl hover:shadow-teal-500/10 animate-fade-in-up relative overflow-hidden" style={{ animationDelay: '0.3s' }}>
          {showVideo && featuredSrc ? (
            <div className="w-full h-full rounded-xl overflow-hidden bg-black">
              <iframe
                className="w-full h-full"
                src={featuredSrc + "?autoplay=1"}
                title="Showreel"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="w-full h-full rounded-xl bg-black/10 dark:bg-black/40 grid place-items-center transition-all duration-300 group-hover:bg-black/20 dark:group-hover:bg-black/60 relative overflow-hidden">
              {featuredThumb && (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={featuredThumb} 
                  alt="Showreel thumbnail" 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-50 group-hover:opacity-30 transition-opacity duration-300"
                />
              )}
              <button
                className="w-16 h-16 rounded-full bg-teal-500/90 dark:bg-teal-400/90 text-black grid place-items-center shadow-lg hover:scale-110 hover:bg-teal-400 transition-all duration-300 hover:shadow-xl hover:shadow-teal-400/30 relative z-10"
                onClick={() => setShowVideo(true)}
                aria-label="Play showreel"
              >
                ▶
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 