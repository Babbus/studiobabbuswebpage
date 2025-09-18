"use client";

import { useMemo, useState } from "react";
import type { Reel } from "@/types/content";
import { getEmbedSrc, getYouTubeThumbnail } from "@/lib/video";
import { useVideoTitle } from "@/hooks/useVideoTitle";

export default function VideoCard({ reel }: { reel: Reel }) {
  const [open, setOpen] = useState(false);
  const thumb = useMemo(() => {
    return reel.thumbnailUrl || (reel.host === "youtube" ? getYouTubeThumbnail(reel.url) : undefined);
  }, [reel]);
  const displayTitle = useVideoTitle(reel.url, reel.title);

  return (
    <div className="group rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] transition-all duration-300 hover:border-[color:oklch(52%_0.18_270)] dark:hover:border-[color:oklch(62%_0.22_270)] hover:bg-white/80 dark:hover:bg-white/[0.05] hover:scale-[1.02] hover:shadow-xl hover:shadow-[color:oklch(62%_0.22_270)/0.2]">
      <button className="block w-full relative overflow-hidden" onClick={() => setOpen(true)} aria-label={`Play ${displayTitle || "video"}`}>
        <div className="aspect-video bg-black/5 dark:bg-black/60 grid place-items-center relative overflow-hidden">
          {thumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={thumb} alt="Thumbnail" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          ) : (
            <span className="text-sm opacity-70">Open video</span>
          )}
          <span className="absolute inset-0 grid place-items-center bg-black/5 dark:bg-black/20 group-hover:bg-black/10 dark:group-hover:bg-black/40 transition-all duration-300">
            <span className="w-12 h-12 rounded-full bg-[color:oklch(62%_0.22_270)] text-white grid place-items-center shadow-lg group-hover:scale-125 hover:shadow-xl">▶</span>
          </span>
        </div>
      </button>
      <div className="p-3">
        <div className="text-sm font-medium leading-tight truncate transition-colors duration-300 group-hover:text-[color:oklch(36%_0.16_270)] dark:group-hover:text-white" title={displayTitle}>{displayTitle}</div>
        {reel.year && <div className="text-xs opacity-60 group-hover:opacity-80 transition-opacity duration-300">{reel.year}</div>}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4 animate-fade-in" onClick={() => setOpen(false)}>
          <div className="w-full max-w-3xl aspect-video bg-black rounded-xl overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <iframe
              className="w-full h-full"
              src={getEmbedSrc(reel)}
              title={displayTitle || reel.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
} 