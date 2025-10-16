"use client";

import Section from "@/components/Section";
import PhotoSlideshow from "@/components/PhotoSlideshow";
import VideoGrid from "@/components/VideoGrid";
import { projects } from "@/content/projects";
import { useMemo } from "react";

export default function PortfolioPage() {
  const photoProjects = useMemo(() => projects.filter((p) => p.media?.some((m) => m.type === "image")), []);
  const videoProjects = useMemo(() => projects.filter((p) => p.media?.some((m) => m.type === "video")), []);

  return (
    <div className="pt-20">
      <Section title="Portfolio">
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Photos</h2>
            <PhotoSlideshow projects={photoProjects} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Videos</h2>
            <VideoGrid projects={videoProjects} />
          </div>
        </div>
      </Section>
    </div>
  );
} 