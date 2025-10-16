"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { Project } from "@/types/content";
import { getEmbedSrcFromUrl } from "@/lib/video";

export default function MediaModal({ open, project, onClose }: { open: boolean; project?: Project; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !project) return null;

  const mediaImage = project.media?.find((m) => m.type === "image")?.url;
  const mediaVideo = project.media?.find((m) => m.type === "video")?.url;

  const isExternalVideo = !!(mediaVideo && (mediaVideo.includes("youtube") || mediaVideo.includes("youtu.be") || mediaVideo.includes("vimeo")));
  const localVideoUrl = mediaVideo && !isExternalVideo ? mediaVideo : undefined;
  const externalEmbed = mediaVideo && isExternalVideo ? getEmbedSrcFromUrl(mediaVideo) : undefined;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 grid place-items-center" onClick={onClose}>
      <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="absolute -top-10 right-0 text-white/80 hover:text-white text-xl" aria-label="Close" onClick={onClose}>✕</button>

        {/* Media */}
        {mediaImage && (
          <div className="w-full overflow-hidden rounded-xl">
            <Image src={mediaImage} alt={project.title} width={1920} height={1080} className="w-full h-auto object-contain" />
          </div>
        )}

        {localVideoUrl && (
          <div className="w-full overflow-hidden rounded-xl bg-black">
            <video controls playsInline className="w-full h-auto">
              <source 
                src={localVideoUrl} 
                type={localVideoUrl.toLowerCase().endsWith(".mp4") ? "video/mp4" : localVideoUrl.toLowerCase().endsWith(".webm") ? "video/webm" : localVideoUrl.toLowerCase().endsWith(".mov") ? "video/quicktime" : undefined}
              />
            </video>
          </div>
        )}

        {externalEmbed && (
          <div className="w-full overflow-hidden rounded-xl bg-black aspect-video">
            <iframe 
              className="w-full h-full" 
              src={externalEmbed} 
              title={project.title} 
              loading="lazy" 
              allow="autoplay; encrypted-media; picture-in-picture" 
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        )}
      </div>
    </div>
  );
}
