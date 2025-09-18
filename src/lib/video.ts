import type { Reel } from "@/types/content";

export function getYouTubeId(url: string): string | undefined {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      const list = u.searchParams.get("list");
      if (list) return list;
      const parts = u.pathname.split("/").filter(Boolean);
      // /embed/{id}
      const embedIdx = parts.findIndex((p) => p === "embed");
      if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];
      // /watch/{id}
      if (parts[0] === "watch" && parts[1]) return parts[1];
      // /shorts/{id}
      if (parts[0] === "shorts" && parts[1]) return parts[1];
      // /{id}
      if (parts.length === 1 && /^[a-zA-Z0-9_-]{6,}$/.test(parts[0])) return parts[0];
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace("/", "");
      return id || undefined;
    }
  } catch {}
  return undefined;
}

export function getYouTubeThumbnail(url: string): string | undefined {
  const id = getYouTubeId(url);
  if (!id) return undefined;
  if (id.startsWith("PL")) return "https://i.ytimg.com/vi/default/hqdefault.jpg";
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function getVimeoId(url: string): string | undefined {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("vimeo.com")) return undefined;
    const parts = u.pathname.split("/").filter(Boolean);
    const idPart = parts.pop();
    if (!idPart) return undefined;
    if (/^\d+$/.test(idPart)) return idPart;
  } catch {}
  return undefined;
}

export function getEmbedSrc(reel: Reel): string {
  if (reel.host === "youtube") {
    const id = getYouTubeId(reel.url);
    if (!id) return reel.url;
    const isPlaylist = id.startsWith("PL");
    return isPlaylist
      ? `https://www.youtube.com/embed/videoseries?list=${id}`
      : `https://www.youtube.com/embed/${id}`;
  }
  if (reel.host === "vimeo") {
    const id = getVimeoId(reel.url);
    if (!id) return reel.url;
    return `https://player.vimeo.com/video/${id}`;
  }
  return reel.url;
}

export function getEmbedSrcFromUrl(url: string): string {
  const ytId = getYouTubeId(url);
  if (ytId) {
    const isPlaylist = ytId.startsWith("PL");
    return isPlaylist
      ? `https://www.youtube.com/embed/videoseries?list=${ytId}`
      : `https://www.youtube.com/embed/${ytId}`;
  }
  const vimeoId = getVimeoId(url);
  if (vimeoId) return `https://player.vimeo.com/video/${vimeoId}`;
  return url;
}

export function getAppleMusicEmbed(url: string): string | undefined {
  try {
    const u = new URL(url);
    if (!(u.hostname.includes("music.apple.com") || u.hostname.includes("embed.music.apple.com"))) return undefined;
    const segments = u.pathname.split("/").filter(Boolean);
    if (segments.length > 0) {
      const maybeCountry = segments[0];
      if (/^[a-z]{2}$/i.test(maybeCountry)) {
        segments[0] = "tr";
      } else {
        segments.unshift("tr");
      }
      u.pathname = "/" + segments.join("/");
    } else {
      u.pathname = "/tr";
    }
    u.hostname = "embed.music.apple.com";
    return u.toString();
  } catch {}
  return undefined;
}

export function getAppleEmbedHeight(url: string): number {
  try {
    const u = new URL(url);
    const isSong = u.pathname.includes("/song/");
    return isSong ? 175 : 450;
  } catch {}
  return 175;
}

export function getSteamAppIdFromUrl(url: string): string | undefined {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("store.steampowered.com")) return undefined;
    const parts = u.pathname.split("/").filter(Boolean);
    const appIndex = parts.findIndex((p) => p === "app");
    if (appIndex >= 0 && parts[appIndex + 1]) {
      const candidate = parts[appIndex + 1];
      if (/^\d+$/.test(candidate)) return candidate;
    }
  } catch {}
  return undefined;
}

export function getSteamWidgetUrl(appId: string): string {
  return `https://store.steampowered.com/widget/${appId}/`;
} 