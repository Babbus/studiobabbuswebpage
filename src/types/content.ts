export type VideoHost = "youtube" | "vimeo";

export type Reel = {
  id: string;
  title: string;
  year: number;
  roles?: string[];
  host: VideoHost;
  url: string;
  thumbnailUrl?: string;
  description?: string;
};

export type ProjectCategory = "Game" | "Film/TV" | "Animation" | "Music" | "Ads" | "Others";

export type MediaItem = {
  type: "video" | "audio" | "image";
  url: string;
};

export type Credit = {
  name: string;
  role: string;
};

export type ExternalLink = {
  label: string;
  url: string;
};

export type Project = {
  slug: string;
  title: string;
  year: number;
  category: ProjectCategory;
  roles: string[];
  tools?: string[];
  summary?: string;
  description?: string;
  media?: MediaItem[];
  credits?: Credit[];
  links?: ExternalLink[];
  tags?: string[];
};

export type Service = {
  title: string;
  description: string;
};

export type Client = {
  name: string;
  blurb?: string;
  linkUrl?: string;
};

export type Social = {
  label: string;
  url: string;
};

export type SiteMeta = {
  displayName: string;
  alias: string;
  title: string;
  description: string;
  tagline: string;
  email: string;
  location: string;
  timezone: string;
  socials: Social[];
};

export type InstagramPost = {
  id: string;
  url: string;
  imageUrl: string;
  caption: string;
  date: string;
}; 