"use client";

import { useMemo, useState } from "react";
import type { ProjectCategory } from "@/types/content";
import { projects } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";

const categories: (ProjectCategory | "All")[] = ["All", "Game", "Film/TV", "Animation", "Music", "Ads", "Others"];

export default function PortfolioWithFilters() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "All">("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-8">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => { setActiveFilter(category); }}
            className={`px-4 py-2 text-sm rounded-full border transition-all duration-300 hover:scale-105 ${
              activeFilter === category
                ? "bg-teal-500/30 border-teal-400/50 text-teal-100 shadow-lg shadow-teal-500/20"
                : "border-white/10 hover:border-teal-400/30 hover:bg-teal-500/10 hover:text-teal-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project count */}
      <div className="text-center">
        <span className="text-sm opacity-60">
          {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          {activeFilter !== "All" && ` in ${activeFilter}`}
        </span>
      </div>

      {/* Projects grid */}
      <div className="max-h-[1200px] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
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

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg opacity-60">No projects found in this category</p>
          <button
            onClick={() => setActiveFilter("All")}
            className="mt-4 px-6 py-2 text-sm rounded-full border border-white/10 hover:border-teal-400/30 hover:bg-teal-500/10 transition-all duration-300"
          >
            View all projects
          </button>
        </div>
      )}
    </div>
  );
} 