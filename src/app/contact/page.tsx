"use client";

import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Section title="Contact">
        <div className="text-xs opacity-70 mb-3">Note: A contact section also appears on the homepage.</div>
        <p className="opacity-80 mb-6 max-w-[65ch]">
          Open for freelance sound design, music production, and game audio integration projects. Available for remote collaboration worldwide.
        </p>
        <ContactForm />
      </Section>
    </div>
  );
} 