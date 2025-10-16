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
import { getGalleryFromStudioDir } from "@/lib/gallery";

export default function Home() {
  const { photos, videos } = getGalleryFromStudioDir();
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
            <VideoGrid projects={photos} minimal={true} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Videos</h2>
            <VideoGrid projects={videos} minimal={true} />
          </div>
        </div>
      </Section>

      <Section id="about" title="About">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <p className="opacity-80 max-w-[75ch]">{shortBio}</p>
            <ExpandableText moreLabel="More about me" lessLabel="Show less">
              <div className="space-y-4 opacity-80">
                <p>{longBio}</p>
                <div>
                  <div className="font-semibold mb-1">Core Skills</div>
                  <ul className="list-disc list-inside opacity-80">
                    {coreSkills.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold mb-1">Tools</div>
                  <div className="space-y-3 opacity-80">
                    {Object.entries(tools).map(([group, items]) => (
                      <div key={group}>
                        <div className="text-sm font-semibold opacity-90 mb-1">{group}</div>
                        <ul className="list-disc list-inside pl-2">
                          {items.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ExpandableText>
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

      <Section id="contact" title="Contact">
        <div className="grid lg:grid-cols-1 gap-12">
          <ContactForm />
        </div>
      </Section>
    </main>
  );
}
