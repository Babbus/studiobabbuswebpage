import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ReelCarousel from "@/components/ReelCarousel";
import PortfolioWithFilters from "@/components/PortfolioWithFilters";
import ContactForm from "@/components/ContactForm";
import ExpandableText from "@/components/ExpandableText";
import Image from "next/image";
import VideoGrid from "@/components/VideoGrid";

import { featuredReels } from "@/content/reels";
import { shortBio, longBio, coreSkills, tools } from "@/content/about";
import { services } from "@/content/services";
import { clients } from "@/content/clients";
import { galleryPhotos, galleryVideos } from "@/content/gallery";

export default function Home() {
  return (
    <main>
      <Hero />

      <Section id="reels" title="Featured Reels">
        <div className="animate-fade-in-up">
          <ReelCarousel reels={featuredReels} />
        </div>
      </Section>

      <Section id="portfolio" title="Portfolio">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <PortfolioWithFilters />
        </div>
      </Section>
      
      <Section id="gallery" title="Gallery">
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Photos</h2>
            <VideoGrid projects={galleryPhotos} minimal={true} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Videos</h2>
            <VideoGrid projects={galleryVideos} minimal={true} />
          </div>
        </div>
      </Section>

      <Section id="about" title="About">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <p className="opacity-80 max-w-[75ch]">{shortBio}</p>
            <ExpandableText moreLabel="More about me" lessLabel="Show less">
              <p className="max-w-[80ch] opacity-90 whitespace-pre-line">{longBio}</p>
            </ExpandableText>
            <div>
              <h3 className="text-lg font-semibold mb-2">Primary Roles</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">Sound Designer</span>
                <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">Game Audio Developer</span>
                <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">Music Producer</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Image
              src="/profile.png"
              alt="Batuhan Yıldız"
              width={500}
              height={500}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </Section>
      <Section id="skills" title="Skills">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="rounded-xl border border-white/10 p-6 bg-white/[0.02] mb-6">
            <h3 className="text-xl font-semibold mb-4">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {coreSkills.map((skill) => (
                <span key={skill} className="bg-teal-500/20 text-teal-100 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-xl font-semibold mb-4">Tools & Technologies</h3>
            <div className="space-y-4">
              {Object.entries(tools).map(([category, toolList]) => (
                <div key={category}>
                  <h4 className="font-semibold mb-2 text-white/80">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {toolList.map((tool) => (
                      <span key={tool} className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section id="contact" title="Contact">
        <div className="grid lg:grid-cols-1 gap-12">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <p className="opacity-80 mb-6 max-w-[65ch]">
              Open for freelance sound design, music production, and game audio integration projects. Available for remote collaboration worldwide.
            </p>
            <ContactForm />
          </div>
        </div>
      </Section>
    </main>
  );
}
