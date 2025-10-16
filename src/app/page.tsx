import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ReelCarousel from "@/components/ReelCarousel";
import ContactForm from "@/components/ContactForm";
import ExpandableText from "@/components/ExpandableText";
import Image from "next/image";
import Link from "next/link";
import { featuredReels } from "@/content/reels";
import { shortBio, longBio, coreSkills, tools } from "@/content/about";

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

      <Section title="Portfolio">
        <div className="text-center">
          <p className="mb-4">
            You can find my full portfolio of work on the portfolio page.
          </p>
          <Link
            href="/portfolio"
            className="group rounded-full border border-black/10 dark:border-white/10 px-4 py-2 text-sm disabled:opacity-40 hover:bg-[color:oklch(86%_0.06_270)] dark:hover:bg-[color:oklch(48%_0.18_270)] hover:border-[color:oklch(52%_0.18_270)] dark:hover:border-[color:oklch(62%_0.22_270)] hover:text-[color:oklch(36%_0.16_270)] dark:hover:text-white transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:hover:bg-transparent"
          >
            View Full Portfolio
          </Link>
        </div>
      </Section>

      <Section id="about" title="About">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Image
              src="/profile.png"
              alt="Batuhan Yıldız"
              width={500}
              height={500}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="lg:col-span-2 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
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
      <Section id="studio" title="Gallery">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <Image
            src="/studio/Studio1.png"
            alt="Studio Image 1"
            width={800}
            height={600}
            className="rounded-lg object-cover"
          />
          <Image
            src="/studio/Studio2.png"
            alt="Studio Image 2"
            width={800}
            height={600}
            className="rounded-lg object-cover"
          />
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
