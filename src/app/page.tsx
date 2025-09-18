import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ReelCarousel from "@/components/ReelCarousel";
import PortfolioWithFilters from "@/components/PortfolioWithFilters";
import InstagramProfile from "@/components/InstagramProfile";
import ContactForm from "@/components/ContactForm";
import ExpandableText from "@/components/ExpandableText";
import { reels } from "@/content/reels";
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
          <ReelCarousel reels={reels} />
        </div>
      </Section>
      <Section id="portfolio" title="Portfolio">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <PortfolioWithFilters />
        </div>
      </Section>
      <Section id="about" title="About">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <p className="opacity-80 max-w-[75ch]">{shortBio}</p>
            <ExpandableText moreLabel="More about me" lessLabel="Show less">
              <p className="max-w-[80ch] opacity-90 whitespace-pre-line">{longBio}</p>
            </ExpandableText>
          </div>
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <InstagramProfile />
            <div className="audio-wave p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] hover:border-teal-500/30 dark:hover:border-teal-400/30 transition-all duration-300">
              <div className="text-sm opacity-80">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-teal-600 dark:text-teal-400">🎵</span>
                  <span>Currently working on game audio</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-teal-600 dark:text-teal-400">🎧</span>
                  <span>Available for collaborations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section id="contact" title="Contact">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <p className="opacity-80 mb-6 max-w-[65ch]">
              Open for freelance sound design, music production, and game audio integration projects. Available for remote collaboration worldwide.
            </p>
            <ContactForm />
          </div>
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <InstagramProfile />
          </div>
        </div>
      </Section>
    </div>
  );
}
