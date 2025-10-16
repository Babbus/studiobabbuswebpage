import type { Project, ProjectCategory, MediaItem } from "@/types/content";

export const galleryPhotos: Project[] = [
  {
    slug: "studio-photo-1",
    title: "Studio Session",
    year: 2024,
    category: "Others" as ProjectCategory,
    roles: ["Photography"],
    summary: "A snapshot from a studio session.",
    media: [
      { type: "image" as const, url: "/studio/Studio1.png" },
    ],
    tags: ["Studio", "Photography"],
  },
  {
    slug: "studio-photo-2",
    title: "Studio Gear",
    year: 2024,
    category: "Others" as ProjectCategory,
    roles: ["Photography"],
    summary: "A look at some of the gear in the studio.",
    media: [
      { type: "image" as const, url: "/studio/Studio2.png" },
    ],
    tags: ["Studio", "Photography", "Gear"],
  },
  {
    slug: "studio-photo-3",
    title: "Mixing Desk",
    year: 2024,
    category: "Others" as ProjectCategory,
    roles: ["Photography"],
    summary: "The central hub of the studio.",
    media: [
      { type: "image" as const, url: "/studio/Studio3.png" },
    ],
    tags: ["Studio", "Photography", "Mixing"],
  },
  {
    slug: "studio-photo-4",
    title: "Vocal Booth",
    year: 2024,
    category: "Others" as ProjectCategory,
    roles: ["Photography"],
    summary: "The quietest room in the building.",
    media: [
      { type: "image" as const, url: "/studio/Studio4.png" },
    ],
    tags: ["Studio", "Photography", "Vocal Booth"],
  },
].reverse();

export const galleryVideos: Project[] = [
  {
    slug: "studio-video-1",
    title: "Studio Walkthrough",
    year: 2024,
    category: "Others" as ProjectCategory,
    roles: ["Videography"],
    summary: "A quick tour of the studio space.",
    media: [
      { type: "video" as const, url: "/studio/StudioVideo1.mp4" },
    ],
    tags: ["Studio", "Videography", "Tour"],
  },
  {
    slug: "studio-video-2",
    title: "Studio Walkthrough 2",
    year: 2025,
    category: "Others" as ProjectCategory,
    roles: ["Videography"],
    summary: "Follow-up studio tour.",
    media: [
      { type: "video" as const, url: "/studio/StudioVideo2.mp4" },
      // { type: "video" as const, url: "/studio/StudioVideo2.webm" },
      // { type: "video" as const, url: "/studio/StudioVideo2.mov" },
    ],
    tags: ["Studio", "Videography"],
  },
];
