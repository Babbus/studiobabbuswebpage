"use client";

import { useMemo, useState } from "react";
import Section from "@/components/Section";
import { projects } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";
import type { ProjectCategory } from "@/types/content";

const FILTERS = ["All", "Game", "Film/TV", "Others"] as const;

type FilterType = typeof FILTERS[number];

const OTHERS: ProjectCategory[] = ["Ad", "Animation", "Music"];

export default function PortfolioPage() {
  const [filter, setFilter] = useState<FilterType>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    if (filter === "Game") return projects.filter((p) => p.category === "Game");
    if (filter === "Film/TV") return projects.filter((p) => p.category === "Film/TV");
    return projects.filter((p) => OTHERS.includes(p.category));
  }, [filter]);

  return (
    <div className="pt-20">
      <Section title="Portfolio">
        <div className="flex gap-2 flex-wrap mb-6">
          {FILTERS.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`text-xs rounded-full px-3 py-1 border ${filter === c ? "bg-teal-500/20 text-teal-200 border-teal-500/30" : "border-white/10 opacity-80 hover:opacity-100"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
} 