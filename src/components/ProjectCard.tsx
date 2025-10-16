"use client";

import type { Project } from "@/types/content";
import { getEmbedSrcFromUrl, getAppleMusicEmbed, getAppleEmbedHeight, getSteamAppIdFromUrl, getSteamWidgetUrl } from "@/lib/video";
import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ project, minimal = false }: { project: Project, minimal?: boolean }) {
  const mediaImage = project.media?.find((m) => m.type === "image")?.url;
  const mediaVideo = project.media?.find((m) => m.type === "video")?.url;
  const mediaAudioEmbed = project.media?.find((m) => m.type === "audio")?.url; // allow direct Apple embed URL here

  const externalVideoUrl = mediaVideo && (mediaVideo.includes("youtube") || mediaVideo.includes("youtu.be") || mediaVideo.includes("vimeo"))
    ? mediaVideo
    : project.links?.find((l) => l.url.includes("youtube.com") || l.url.includes("youtu.be") || l.url.includes("vimeo.com"))?.url;

  const localVideoUrl = mediaVideo && !externalVideoUrl ? mediaVideo : undefined;
  const localVideoUrls = (project.media || [])
    .filter((m) => m.type === "video")
    .map((m) => m.url)
    .filter((u) => !!u && !(u.includes("youtube") || u.includes("youtu.be") || u.includes("vimeo")));

  const appleLink = project.links?.find((l) => l.url.includes("music.apple.com"))?.url;
  const steamLink = project.links?.find((l) => l.url.includes("store.steampowered.com/app/"))?.url;

  const embed = externalVideoUrl ? getEmbedSrcFromUrl(externalVideoUrl) : undefined;
  const appleEmbed = mediaAudioEmbed || (appleLink ? getAppleMusicEmbed(appleLink) : undefined);
  const appleHeight = appleEmbed ? getAppleEmbedHeight(appleEmbed) : undefined;
  const steamAppId = steamLink ? getSteamAppIdFromUrl(steamLink) : undefined;

  const getMime = (url: string) => {
    const lower = url.toLowerCase();
    if (lower.endsWith(".mp4")) return "video/mp4";
    if (lower.endsWith(".webm")) return "video/webm";
    if (lower.endsWith(".mov")) return "video/quicktime";
    return undefined;
  };

  return (
    <div className="group rounded-xl overflow-hidden bg-white/70 dark:bg-white/[0.02] border-2 border-black/50 dark:border-white/20 ring-1 ring-black/10 dark:ring-white/10 transition-all duration-300 hover:border-[color:oklch(52%_0.18_270)] dark:hover:border-[color:oklch(62%_0.22_270)] hover:bg-white/80 dark:hover:bg-white/[0.05] hover:scale-[1.02] hover:shadow-xl hover:shadow-[color:oklch(62%_0.22_270)/0.2]">
      {mediaImage && (
        <div className="aspect-video bg-black overflow-hidden">
          <Image
            src={mediaImage}
            alt={project.title}
            width={500}
            height={300}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </div>
      )}
      
      {localVideoUrls.length > 0 && (
        <div className="aspect-video bg-black overflow-hidden">
          <video
            controls
            playsInline
            preload="metadata"
            className="w-full h-full transition-transform duration-300 group-hover:scale-[1.01]"
          >
            {localVideoUrls.map((url) => (
              <source key={url} src={url} type={getMime(url)} />
            ))}
            Your browser can’t play this video. Please try MP4 (H.264) or WebM.
          </video>
        </div>
      )}

      {appleEmbed && (
        <div className="w-full bg-black overflow-hidden">
          <iframe
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            height={appleHeight}
            style={{ width: "100%", overflow: "hidden", background: "transparent" }}
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src={appleEmbed}
            className="transition-transform duration-300 group-hover:scale-[1.01]"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}

      {embed && (
        <div className="aspect-video bg-black overflow-hidden">
          <iframe 
            className="w-full h-full transition-transform duration-300 group-hover:scale-[1.01]" 
            src={embed} 
            title={project.title} 
            loading="lazy" 
            allow="autoplay; encrypted-media; picture-in-picture" 
            allowFullScreen 
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}

      {!minimal && (
        <div className="p-4">
          <div className="text-sm uppercase opacity-60 group-hover:opacity-80 group-hover:text-[color:oklch(36%_0.16_270)] transition-all duration-300">{project.category}</div>
          <h3 className="text-base font-semibold tracking-tight group-hover:text-[color:oklch(36%_0.16_270)] dark:group-hover:text-white transition-colors duration-300">{project.title}</h3>
          <div className="text-xs opacity-60 group-hover:opacity-80 transition-opacity duration-300">{project.year} · {project.roles.join(", ")}</div>
          {project.summary && <p className="text-sm opacity-80 mt-2 group-hover:opacity-90 transition-opacity duration-300">{project.summary}</p>}

          {project.links && project.links.length > 0 && (
            <div className="mt-3 flex gap-3 flex-wrap">
              {project.links.map((l) => (
                <Link 
                  key={l.url} 
                  href={l.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs underline underline-offset-4 hover:no-underline hover:text-[color:oklch(36%_0.16_270)] transition-colors duration-300"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}

          {steamAppId && (
            <div className="mt-4 overflow-hidden rounded-lg">
              <iframe 
                src={getSteamWidgetUrl(steamAppId)} 
                frameBorder="0" 
                width="100%" 
                height="190" 
                title={`${project.title} — Steam`}
                className="transition-transform duration-300 group-hover:scale-[1.01]"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
} 