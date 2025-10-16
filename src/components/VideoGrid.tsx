"use client";

import { useState } from "react";
import type { Project } from "@/types/content";
import ProjectCard from "@/components/ProjectCard";
import MediaModal from "@/components/MediaModal";

export default function VideoGrid({ projects, minimal = false }: { projects: Project[], minimal?: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Project | undefined>(undefined);

  return (
    <div className="space-y-8">
      <div className="max-h-[1200px] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => { setActive(project); setOpen(true); }}
              className="text-left animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard project={project} minimal={minimal} />
            </button>
          ))}
        </div>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg opacity-60">No items found</p>
        </div>
      )}

      <MediaModal open={open} project={active} onClose={() => setOpen(false)} />
    </div>
  );
}
