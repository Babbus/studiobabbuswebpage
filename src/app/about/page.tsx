"use client";

import { useState } from "react";
import Section from "@/components/Section";
import ExpandableText from "@/components/ExpandableText";
import ContactModal from "@/components/ContactModal";
import InstagramStrip from "@/components/InstagramStrip";
import { shortBio, longBio } from "@/content/about";
import { services } from "@/content/services";
import { clients } from "@/content/clients";
import { siteMeta } from "@/content/site";

export default function AboutPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  return (
    <div className="pt-20">
      <Section title="About">
        <div className="text-xs opacity-70 mb-3">Note: About and Contact also appear on the homepage sections.</div>
        <div className="grid gap-6">
          <p className="opacity-80 max-w-[75ch]">{shortBio}</p>
          <ExpandableText moreLabel="More about me" lessLabel="Show less">
            <p className="max-w-[80ch] opacity-90 whitespace-pre-line">{longBio}</p>
          </ExpandableText>
          <div className="text-sm">
            Instagram: <a className="underline underline-offset-4" href={siteMeta.socials?.find((s) => s.label === "Instagram")?.url} target="_blank">{siteMeta.socials?.find((s) => s.label === "Instagram")?.url}</a>
          </div>
        </div>
      </Section>

      <Section title="Services">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <li key={s.title}>
              <button
                onClick={() => {
                  setSelectedService(s.title);
                  setContactOpen(true);
                }}
                className="w-full text-left rounded-xl border border-white/10 p-4 bg-white/[0.02] hover:bg-white/[0.05]"
              >
                <div className="font-medium mb-1">{s.title}</div>
                <p className="text-sm opacity-80">{s.description}</p>
                <div className="mt-3 text-xs underline underline-offset-4 opacity-80">Contact about {s.title}</div>
              </button>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="From Instagram">
        <InstagramStrip />
      </Section>

      <Section title="Clients">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((c) => (
            <li key={c.name} className="rounded-xl border border-white/10 p-4 bg-white/[0.02]">
              {c.linkUrl ? (
                <a href={c.linkUrl} target="_blank" className="font-medium underline underline-offset-4">{c.name}</a>
              ) : (
                <div className="font-medium">{c.name}</div>
              )}
              {c.blurb && <div className="text-sm opacity-70">{c.blurb}</div>}
            </li>
          ))}
        </ul>
      </Section>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} serviceTitle={selectedService} />
    </div>
  );
} 