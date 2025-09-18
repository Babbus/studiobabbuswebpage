"use client";

import { useState } from "react";

export default function ExpandableText({
  previewLines = 0,
  children,
  moreLabel = "More about me",
  lessLabel = "Show less",
}: {
  previewLines?: number;
  children: React.ReactNode;
  moreLabel?: string;
  lessLabel?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  if (previewLines <= 0) {
    return (
      <div>
        {!expanded && (
          <button className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100" onClick={() => setExpanded(true)}>
            {moreLabel}
          </button>
        )}
        {expanded && (
          <div className="mt-3 space-y-4">
            {children}
            <button className="block text-sm underline underline-offset-4 opacity-80 hover:opacity-100 mt-2" onClick={() => setExpanded(false)}>
              {lessLabel}
            </button>
          </div>
        )}
      </div>
    );
  }
  return (
    <div>
      <div className={expanded ? "max-h-none" : `line-clamp-${previewLines}`}>
        {children}
      </div>
      <button className="mt-2 text-sm underline underline-offset-4 opacity-80 hover:opacity-100" onClick={() => setExpanded((v) => !v)}>
        {expanded ? lessLabel : moreLabel}
      </button>
    </div>
  );
} 