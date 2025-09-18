"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Reel } from "@/types/content";
import VideoCard from "@/components/VideoCard";

export default function ReelListInfinite({ reels, pageSize = 6 }: { reels: Reel[]; pageSize?: number }) {
  const [visible, setVisible] = useState(pageSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const hasMore = visible < reels.length;

  useEffect(() => {
    if (!hasMore) return;
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVisible((v) => Math.min(v + pageSize, reels.length));
      }
    }, { rootMargin: "200px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, pageSize, reels.length]);

  const items = useMemo(() => reels.slice(0, visible), [reels, visible]);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((r) => (
        <VideoCard key={r.id} reel={r} />
      ))}
      <div ref={sentinelRef} />
    </div>
  );
} 