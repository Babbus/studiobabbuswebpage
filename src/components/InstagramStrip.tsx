import { instagramPosts } from "@/content/instagram";
import { siteMeta } from "@/content/site";

export default function InstagramStrip() {
  const hasPosts = instagramPosts.length > 0;
  return (
    <div className="rounded-xl border border-white/10 p-4 bg-white/[0.02]">
      {hasPosts ? (
        <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {instagramPosts.map((p) => (
            <li key={p.url}>
              <a href={p.url} target="_blank" className="block aspect-square overflow-hidden rounded-lg border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.caption || "Instagram post"} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-teal-900/40 via-teal-700/20 to-transparent" />
                )}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm opacity-80">Add Instagram posts to showcase recent visuals.</div>
          <a href={siteMeta.socials?.find((s) => s.label === "Instagram")?.url || "#"} target="_blank" className="rounded-full border border-white/10 px-4 py-1.5 text-xs hover:bg-white/5">
            Follow on Instagram
          </a>
        </div>
      )}
    </div>
  );
} 