"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

function getSystemTheme(): Exclude<Theme, "system"> {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Exclude<Theme, "system">) {
  const root = document.documentElement; // <html>
  root.setAttribute("data-theme", theme);
  // Hint to UA for built-in form controls
  (root.style as any).colorScheme = theme;
}

export function useTheme() {
  const [preference, setPreference] = useState<Theme>("system");
  const [resolved, setResolved] = useState<Exclude<Theme, "system">>("dark");

  // Initialize from storage or system
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = (localStorage.getItem("theme") as Theme | null) || "system";
    const sys = getSystemTheme();
    const active = stored === "system" ? sys : stored;
    setPreference(stored);
    setResolved(active);
    applyTheme(active);

    // Watch system changes when in system mode
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if ((localStorage.getItem("theme") as Theme | null) === "system") {
        const next = getSystemTheme();
        setResolved(next);
        applyTheme(next);
      }
    };
    try { mql.addEventListener("change", listener); } catch { mql.addListener(listener); }
    return () => {
      try { mql.removeEventListener("change", listener); } catch { mql.removeListener(listener); }
    };
  }, []);

  const setTheme = (t: Theme) => {
    setPreference(t);
    localStorage.setItem("theme", t);
    const active = t === "system" ? getSystemTheme() : t;
    setResolved(active);
    applyTheme(active);
  };

  const toggle = () => {
    const next: Exclude<Theme, "system"> = resolved === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return { preference, resolved, setTheme, toggle } as const;
} 