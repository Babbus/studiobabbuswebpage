"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "");
    const company = String(formData.get("company") || "");
    const email = String(formData.get("email") || "");
    const budget = String(formData.get("budget") || "");
    const timeline = String(formData.get("timeline") || "");
    const message = String(formData.get("message") || "");
    const website = String(formData.get("website") || ""); // honeypot

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, budget, timeline, message, website }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      throw new Error("Failed to send");
    } catch {
      // Fallback to mailto if server send fails
      window.location.href = `mailto:babbusbatu@gmail.com?subject=${encodeURIComponent(
        `Inquiry from ${name || "(no name)"}`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nBudget: ${budget}\nTimeline: ${timeline}\n\nMessage:\n${message}`
      )}`;
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="website" autoComplete="off" tabIndex={-1} aria-hidden="true" style={{ display: "none" }} />
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="name" placeholder="Name" className="bg-white dark:bg-transparent border-2 border-black/50 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/10 rounded-lg px-3 py-2 outline-none shadow-sm placeholder:text-black/60 dark:placeholder:text-white/60 focus:border-[color:oklch(52%_0.18_270)] focus:ring-2 focus:ring-[color:oklch(62%_0.22_270)/0.3]" />
        <input name="company" placeholder="Company (optional)" className="bg-white dark:bg-transparent border-2 border-black/50 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/10 rounded-lg px-3 py-2 outline-none shadow-sm placeholder:text-black/60 dark:placeholder:text-white/60 focus:border-[color:oklch(52%_0.18_270)] focus:ring-2 focus:ring-[color:oklch(62%_0.22_270)/0.3]" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="email" type="email" placeholder="Email" required className="bg-white dark:bg-transparent border-2 border-black/50 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/10 rounded-lg px-3 py-2 outline-none shadow-sm placeholder:text-black/60 dark:placeholder:text-white/60 focus:border-[color:oklch(52%_0.18_270)] focus:ring-2 focus:ring-[color:oklch(62%_0.22_270)/0.3]" />
        <input name="budget" placeholder="Budget (optional)" className="bg-white dark:bg-transparent border-2 border-black/50 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/10 rounded-lg px-3 py-2 outline-none shadow-sm placeholder:text-black/60 dark:placeholder:text-white/60 focus:border-[color:oklch(52%_0.18_270)] focus:ring-2 focus:ring-[color:oklch(62%_0.22_270)/0.3]" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="timeline" placeholder="Timeline (optional)" className="bg-white dark:bg-transparent border-2 border-black/50 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/10 rounded-lg px-3 py-2 outline-none shadow-sm placeholder:text-black/60 dark:placeholder:text-white/60 focus:border-[color:oklch(52%_0.18_270)] focus:ring-2 focus:ring-[color:oklch(62%_0.22_270)/0.3]" />
      </div>
      <textarea name="message" placeholder="Tell me about your project" rows={5} className="bg-white dark:bg-transparent border-2 border-black/50 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/10 rounded-lg px-3 py-2 outline-none shadow-sm placeholder:text-black/60 dark:placeholder:text-white/60 focus:border-[color:oklch(52%_0.18_270)] focus:ring-2 focus:ring-[color:oklch(62%_0.22_270)/0.3] w-full" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md px-5 py-2 bg-[color:oklch(48%_0.18_270)] text-white hover:bg-[color:oklch(54%_0.2_270)] disabled:opacity-60 border border-white/10 transition-all duration-300"
      >
        {status === "sending" ? "Sending..." : status === "sent" ? "Sent ✓" : "Send"}
      </button>
    </form>
  );
} 