"use client";

import { useMemo, useState } from "react";
import type { Reel } from "@/types/content";
import VideoCard from "@/components/VideoCard";

export default function ReelCarousel({ reels }: { reels: Reel[] }) {
  const pageSize = 3;
  const pageCount = Math.ceil(reels.length / pageSize);
  const [page, setPage] = useState(0);
  const items = useMemo(() => reels.slice(page * pageSize, page * pageSize + pageSize), [reels, page]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <button
          className="group rounded-full border border-white/10 px-4 py-2 text-sm disabled:opacity-40 hover:bg-teal-500/20 hover:border-teal-400/30 hover:text-teal-200 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:hover:bg-transparent"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          <span className="group-hover:animate-pulse">◀ Prev</span>
        </button>
        <div className="text-xs opacity-70 bg-white/5 px-3 py-1 rounded-full border border-white/10">{page + 1} / {pageCount}</div>
        <button
          className="group rounded-full border border-white/10 px-4 py-2 text-sm disabled:opacity-40 hover:bg-teal-500/20 hover:border-teal-400/30 hover:text-teal-200 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:hover:bg-transparent"
          onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          disabled={page >= pageCount - 1}
        >
          <span className="group-hover:animate-pulse">Next ▶</span>
        </button>
      </div>

      <div className="overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
          {items.map((r, index) => (
            <div 
              key={r.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <VideoCard reel={r} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 