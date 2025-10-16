import fs from "fs";
import path from "path";
import type { Project, ProjectCategory } from "@/types/content";

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);
const VIDEO_EXTS = new Set([".mp4", ".webm", ".mov", ".m4v"]);

function toTitleCase(name: string): string {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function makeProjectFromFile(fileName: string, isImage: boolean, year: number): Project {
  const base = path.parse(fileName).name;
  const slug = `studio-${isImage ? "photo" : "video"}-${base.toLowerCase()}`;
  const title = toTitleCase(base);
  const url = `/studio/${fileName}`;
  return {
    slug,
    title,
    year,
    category: "Others" as ProjectCategory,
    roles: [isImage ? "Photography" : "Videography"],
    summary: undefined,
    media: [
      { type: isImage ? "image" : "video", url },
    ],
    tags: ["Studio"],
  };
}

export function getGalleryFromStudioDir(): { photos: Project[]; videos: Project[] } {
  const studioDir = path.join(process.cwd(), "public", "studio");
  let entries: string[] = [];
  try {
    entries = fs.readdirSync(studioDir);
  } catch {
    return { photos: [], videos: [] };
  }

  const withTimes = entries.map((file) => {
    let time = 0;
    try { time = fs.statSync(path.join(studioDir, file)).mtimeMs; } catch {}
    return { file, time };
  });

  // Newest first
  withTimes.sort((a, b) => b.time - a.time);

  const currentYear = new Date().getFullYear();
  const photos: Project[] = [];
  const videos: Project[] = [];

  for (const { file } of withTimes) {
    const ext = path.extname(file).toLowerCase();
    if (IMAGE_EXTS.has(ext)) {
      photos.push(makeProjectFromFile(file, true, currentYear));
    } else if (VIDEO_EXTS.has(ext)) {
      videos.push(makeProjectFromFile(file, false, currentYear));
    }
  }

  return { photos, videos };
}
