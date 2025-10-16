"use client";

import Section from "@/components/Section";
import PortfolioWithFilters from "@/components/PortfolioWithFilters";

export default function PortfolioPage() {
  return (
    <div className="pt-20">
      <Section title="Portfolio">
        <PortfolioWithFilters />
      </Section>
    </div>
  );
} 