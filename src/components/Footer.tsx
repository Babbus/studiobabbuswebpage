import { siteMeta } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="opacity-70">© {new Date().getFullYear()} {siteMeta.displayName}. All rights reserved.</div>
        <nav className="flex gap-4 opacity-80">
          {siteMeta.socials?.map((s) => (
            <a key={s.label} href={s.url} target="_blank" className="hover:opacity-100 underline-offset-4 hover:underline">
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
} 