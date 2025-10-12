import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ReelCarousel from "@/components/ReelCarousel";
import PortfolioWithFilters from "@/components/PortfolioWithFilters";
import ContactForm from "@/components/ContactForm";
import ExpandableText from "@/components/ExpandableText";
import { featuredReels } from "@/content/reels";
import { shortBio, longBio } from "@/content/about";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Enhanced background overlay with shimmer effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 shimmer opacity-10 dark:opacity-30" />
      </div>
      
      <Hero />
      <Section id="reels" title="Featured Reels">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <ReelCarousel reels={featuredReels} intervalMs={6000} pageSize={3} />
        </div>
      </Section>
      <Section id="portfolio" title="Portfolio">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <PortfolioWithFilters />
        </div>
      </Section>
      <Section id="about" title="About">
        <div className="grid lg:grid-cols-1 gap-8">
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <p className="opacity-80 max-w-[75ch]">{shortBio}</p>
            <ExpandableText moreLabel="More about me" lessLabel="Show less">
              <p className="max-w-[80ch] opacity-90 whitespace-pre-line">{longBio}</p>
            </ExpandableText>
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
    </div>
  );
}
