"use client";

import { siteMeta } from "@/content/site";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  return (
    <form
      className="grid gap-4 max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        const subject = encodeURIComponent(`Inquiry from ${data.get("name")}`);
        const body = encodeURIComponent(
          `Name: ${data.get("name")}\nCompany: ${data.get("company")}\nEmail: ${data.get("email")}\nBudget: ${data.get("budget")}\nTimeline: ${data.get("timeline")}\n\nMessage:\n${data.get("message")}`
        );
        window.location.href = `mailto:${siteMeta.email}?subject=${subject}&body=${body}`;
        setStatus("sent");
      }}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="grid gap-1 text-sm">
          <span>Name</span>
          <input name="name" required className="bg-transparent border border-white/15 rounded px-3 py-2" />
        </label>
        <label className="grid gap-1 text-sm">
          <span>Company</span>
          <input name="company" className="bg-transparent border border-white/15 rounded px-3 py-2" />
        </label>
      </div>
      <label className="grid gap-1 text-sm">
        <span>Email</span>
        <input type="email" name="email" required className="bg-transparent border border-white/15 rounded px-3 py-2" />
      </label>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="grid gap-1 text-sm">
          <span>Budget</span>
          <input name="budget" className="bg-transparent border border-white/15 rounded px-3 py-2" placeholder="USD or range" />
        </label>
        <label className="grid gap-1 text-sm">
          <span>Timeline</span>
          <input name="timeline" className="bg-transparent border border-white/15 rounded px-3 py-2" placeholder="e.g., 4–6 weeks" />
        </label>
      </div>
      <label className="grid gap-1 text-sm">
        <span>Message</span>
        <textarea name="message" rows={6} required className="bg-transparent border border-white/15 rounded px-3 py-2" />
      </label>
      <button className="rounded-full border border-white/10 bg-teal-500/20 text-teal-200 hover:bg-teal-500/30 px-5 py-2 text-sm w-fit">
        Send Email
      </button>
      {status === "sent" && <div className="text-xs opacity-70 mt-2">Your email client should open. If not, write to {siteMeta.email}.</div>}
    </form>
  );
} 