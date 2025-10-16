"use client";

import type { Project } from "@/types/content";
import ProjectCard from "@/components/ProjectCard";

export default function VideoGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="text-sm opacity-60">
          {projects.length} {projects.length === 1 ? 'video' : 'videos'}
        </span>
      </div>

      <div className="max-h-[1200px] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={project.slug} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg opacity-60">No videos found</p>
        </div>
      )}
    </div>
  );
}
