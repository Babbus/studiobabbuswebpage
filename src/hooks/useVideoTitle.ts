"use client";

import { useEffect, useState } from "react";

export function useVideoTitle(url: string | undefined, fallback?: string) {
  const [title, setTitle] = useState<string | undefined>(fallback);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    async function run() {
      try {
        const endpoint = `https://noembed.com/embed?url=${encodeURIComponent(url)}`;
        const res = await fetch(endpoint, { cache: "force-cache" });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data?.title) setTitle(String(data.title));
      } catch {}
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [url]);

  return title;
} 