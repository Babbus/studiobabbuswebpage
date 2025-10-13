"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

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
    <div className="rounded-2xl border border-white/10 p-6 bg-white/[0.02] max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Let&apos;s work together
      </h2>
      <p className="text-center opacity-80 mb-6">
        Whether you have a question, a project, or just want to say hi, my
        inbox is always open.
      </p>
      <div className="flex justify-center mb-6">
        <a
          href="tel:+905444542129"
          className="rounded-full px-6 py-2 bg-teal-500/30 border border-teal-400/50 text-teal-100 shadow-lg shadow-teal-500/20 hover:scale-105 transition-all duration-300"
        >
          Call Me Directly
        </a>
      </div>
      <div className="text-center opacity-60 mb-6">
        <span>or</span>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="website"
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          style={{ display: "none" }}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Name"
            className="bg-transparent border border-white/25 ring-1 ring-white/10 rounded-lg px-3 py-2 outline-none shadow-sm placeholder:text-white/60 focus:border-teal-400/50 focus:ring-2 focus:ring-teal-500/20"
          />
          <input
            name="company"
            placeholder="Company (optional)"
            className="bg-transparent border border-white/25 ring-1 ring-white/10 rounded-lg px-3 py-2 outline-none shadow-sm placeholder:text-white/60 focus:border-teal-400/50 focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="bg-transparent border border-white/25 ring-1 ring-white/10 rounded-lg px-3 py-2 outline-none shadow-sm placeholder:text-white/60 focus:border-teal-400/50 focus:ring-2 focus:ring-teal-500/20"
          />
          <input
            name="budget"
            placeholder="Budget (optional)"
            className="bg-transparent border border-white/25 ring-1 ring-white/10 rounded-lg px-3 py-2 outline-none shadow-sm placeholder:text-white/60 focus:border-teal-400/50 focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            name="timeline"
            placeholder="Timeline (optional)"
            className="bg-transparent border border-white/25 ring-1 ring-white/10 rounded-lg px-3 py-2 outline-none shadow-sm placeholder:text-white/60 focus:border-teal-400/50 focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
        <textarea
          name="message"
          placeholder="Tell me about your project"
          rows={5}
          className="bg-transparent border border-white/25 ring-1 ring-white/10 rounded-lg px-3 py-2 outline-none shadow-sm placeholder:text-white/60 focus:border-teal-400/50 focus:ring-2 focus:ring-teal-500/20 w-full"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-md px-5 py-2 bg-teal-500/30 border border-teal-400/50 text-teal-100 shadow-lg shadow-teal-500/20 hover:scale-105 disabled:opacity-60 transition-all duration-300"
        >
          {status === "sending"
            ? "Sending..."
            : status === "sent"
            ? "Sent ✓"
            : "Send"}
        </button>
      </form>
    </div>
  );
} 