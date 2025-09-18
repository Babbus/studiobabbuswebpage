"use client";

import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { preference, resolved, setTheme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  const label = preference === "system" ? `System (${resolved})` : preference;

  return (
    <div className="relative">
      <button
        onClick={() => { toggle(); setOpen(false); }}
        onContextMenu={(e) => { e.preventDefault(); setOpen((v) => !v); }}
        title="Click: toggle light/dark. Right-click: choose theme"
        className="rounded-full border border-black/10 dark:border-white/10 px-3 py-1.5 text-xs hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      >
        {resolved === "dark" ? "🌙" : "☀️"} {label}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-md border border-black/10 dark:border-white/10 bg-white/80 dark:bg-background/95 backdrop-blur p-1 shadow">
          {(["system","light","dark"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => { setTheme(opt); setOpen(false); }}
              className={`w-full text-left text-xs px-2 py-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 ${preference===opt?"font-medium":''}`}
            >
              {opt === "system" ? "System" : opt === "light" ? "Light" : "Dark"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 